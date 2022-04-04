import collection from "lodash-es/collection";
import prisma from "../db";
import { Coalition, get42User, get42UserCoalition, User } from "./api/42api";

export type Extends42Data = User & {
  synced_at: number;
  coalitions: Coalition[];
};

export const EXPIRE_TIME = 12 * 60 * 60;

export class UserNotFound extends Error {
  constructor() {
    super();
    this.name = "UserNotFound";
    this.message = "User Not Found. invaild id or email...";
  }
}

const getUser = async (where: { id: string } | { email: string }) =>
  await prisma.user.findUnique({
    where,
    include: {
      accounts: true,
    },
  });

export type UserType = Awaited<ReturnType<typeof getUser>> & {
  extended42Data: Extends42Data;
};

export const updateUserExtends42Data: (
  where: { id: string } | { email: string }
) => Promise<UserType> = async (where) => {
  let user = (await getUser(where)) as unknown as UserType;

  if (!user) throw new UserNotFound();

  const accounts = collection.keyBy(user.accounts, "provider");
  if (!accounts["42-school"]) return user;

  // if (process.env.NODE_ENV === "production") {
  const ExpiresDate = new Date();
  ExpiresDate.setSeconds(ExpiresDate.getSeconds() + EXPIRE_TIME);
  if (
    user.extended42Data &&
    (new Date(user.extended42Data.anonymize_date).valueOf() <= Date.now() ||
      user.extended42Data.synced_at + EXPIRE_TIME * 1000 > Date.now())
  ) {
    return user;
    // }
  }
  const ftSchoolAccountId = accounts["42-school"].providerAccountId;

  const [{ data: extended42Data }, { data: coalitions }] = await Promise.all([
    get42User(ftSchoolAccountId),
    get42UserCoalition(ftSchoolAccountId),
  ]);

  user = (await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      extended42Data: {
        ...extended42Data,
        coalitions,
        synced_at: Date.now(),
      },
    },
    include: {
      accounts: true,
    },
  })) as unknown as UserType;

  return user;
};
