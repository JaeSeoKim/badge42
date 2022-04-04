import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    errorFormat: "minimal",
  });
} else {
  prisma = new PrismaClient({
    log: ["query"],
    errorFormat: "pretty",
  });
}

export default prisma;
