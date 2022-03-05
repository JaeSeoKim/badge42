import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    errorFormat: "minimal",
  });
} else {
  globalThis["prisma"] =
    globalThis["prisma"] ||
    new PrismaClient({
      log: ["query"],
      errorFormat: "pretty",
    });
  prisma = globalThis["prisma"];
}

export default prisma;
