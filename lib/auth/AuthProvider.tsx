import axios from "axios";
import collection from "lodash-es/collection";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { UserType } from "../updateUserExtends42Data";

export const AuthContext = React.createContext<
  | {
      status: "loading" | "unauthenticated";
      data: null;
    }
  | {
      status: "authenticated" | "link42accountrequired" | "loading";
      data: UserType;
    }
>({
  data: null,
  status: "loading",
});

export type AuthProviderProps = {};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [auth, setAuth] = useState<
    | {
        status: "loading" | "unauthenticated";
        data: null;
      }
    | {
        status: "authenticated" | "link42accountrequired" | "loading";
        data: UserType;
      }
  >({
    data: null,
    status: "loading",
  });

  const getMe = useCallback(async () => {
    try {
      setAuth((prev) => ({
        ...prev,
        status: "loading",
      }));
      const { data } = await axios.get<UserType>("/api/v2/me");

      const accounts = collection.keyBy(data.accounts, "provider");
      if (!accounts["42-school"]) {
        setAuth({
          data: data,
          status: "link42accountrequired",
        });
      } else {
        setAuth({
          data: data,
          status: "authenticated",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error?.response.status) {
          case 401:
          default:
            setAuth({
              data: null,
              status: "unauthenticated",
            });
        }
      } else {
        signOut();
        setAuth({
          data: null,
          status: "unauthenticated",
        });
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      getMe();
    }
  }, [session?.user?.email, getMe]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const withAuth = (
  Component: React.ComponentType,
  option?: {
    required42account?: boolean;
  }
) => {
  const WrapComponent = () => {
    useSession({ required: true });
    const router = useRouter();
    const { status } = useContext(AuthContext);

    useEffect(() => {
      if (status === "unauthenticated") {
        signOut();
        signIn();
      } else if (
        option?.required42account &&
        status === "link42accountrequired"
      ) {
        router.push("/me");
      }
    }, [status, router]);

    if (
      status === "loading" ||
      status === "unauthenticated" ||
      (option?.required42account && status === "link42accountrequired")
    ) {
      return (
        <div className="flex justify-center items-center min-h-screen min-h-screen-ios">
          <Loading />
        </div>
      );
    }

    return <Component />;
  };

  return WrapComponent;
};
