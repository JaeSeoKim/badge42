import { PrismaClient } from "@prisma/client";
import PQueue from "p-queue";

import fs from "fs/promises";
import sharp from "sharp";
import axios from "axios";
import path from "path";
import { END_POINT_42API } from "../lib/api/42api";

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const queue = new PQueue({ concurrency: 16 });

const imageProcess = async (
  url: string,
  path: string,
  isSharp: boolean = false
) => {
  console.log(`start - ${url}`);

  try {
    const { data } = await queue.add(() =>
      axios.get(encodeURI(url), {
        responseType: isSharp ? "arraybuffer" : undefined,
      })
    );

    if (isSharp) {
      const imageBuffer = await sharp(data).jpeg({ mozjpeg: true }).toBuffer();
      fs.writeFile(path, imageBuffer);
    } else {
      fs.writeFile(path, data);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response.status === 404) {
      console.log(`skip(404) - ${url}`);
    } else {
      Promise.reject(error);
    }
  }
};

const main = async () => {
  // const coalitions = await prisma.coalition.findMany();
  // const achievements = await prisma.achievement.findMany();
  // await Promise.all([
  //   ...coalitions.map(async (coalition) => {
  //     await imageProcess(
  //       coalition.image_url,
  //       path.join(process.cwd(), `public/assets/logo/${coalition.id}.svg`)
  //     );
  //     coalition.cover_url &&
  //       (await imageProcess(
  //         coalition.cover_url,
  //         path.join(process.cwd(), `public/assets/cover/${coalition.id}.jpg`),
  //         true
  //       ));
  //   }),
  //   ...achievements.map(async (achievement) => {
  //     if (achievement.image) {
  //       await imageProcess(
  //         `${END_POINT_42API}${achievement.image}`,
  //         path.join(
  //           process.cwd(),
  //           `public/assets/achievement/${achievement.id}.svg`
  //         )
  //       );
  //     }
  //   }),
  // ]);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
