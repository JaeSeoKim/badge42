// import { PrismaClient } from "@prisma/client";

// import {
//   get42Achievements,
//   get42Campus,
//   get42Coalitions,
//   get42Cursus,
//   get42Languages,
//   get42Skills,
// } from "../lib/api/42api";

// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: "stdout",
//       level: "query",
//     },
//   ],
//   errorFormat: "minimal",
// });

// async function main() {
//   const updateSkills = async () => {
//     console.log("[Skills] - start");
//     const { data } = await get42Skills();
//     console.log("[Skills] - fetched");

//     await prisma.skill.createMany({
//       data: data.map((skill) => ({
//         id: skill.id,
//         name: skill.name,
//       })),
//       skipDuplicates: true,
//     });
//     console.log("[Skills] - seeded");
//   };

//   const updateLanguages = async () => {
//     console.log("[Languages] - start");
//     const { data } = await get42Languages();
//     console.log("[Languages] - fetched");

//     await prisma.language.createMany({
//       data: data.map((language) => ({
//         id: language.id,
//         identifier: language.identifier,
//         name: language.name,
//       })),
//       skipDuplicates: true,
//     });
//     console.log("[Languages] - seeded");
//   };

//   const updateCampus = async () => {
//     console.log("[Campus] - start");
//     const { data } = await get42Campus();
//     console.log("[Campus] - fetched");

//     await prisma.campus.createMany({
//       data: data.map((campus) => ({
//         id: campus.id,
//         active: campus.active,
//         address: campus.address,
//         city: campus.city,
//         country: campus.country,
//         email_extension: campus.email_extension,
//         facebook: campus.facebook,
//         language_id: campus.language.id,
//         name: campus.name,
//         time_zone: campus.time_zone,
//         twitter: campus.twitter,
//         vogsphere_id: campus.vogsphere_id,
//         website: campus.website,
//         zip: campus.zip,
//       })),
//       skipDuplicates: true,
//     });
//     console.log("[Campus] - seeded");
//   };

//   const updateCursus = async () => {
//     console.log("[Cursus] - start");
//     const { data } = await get42Cursus();
//     console.log("[Cursus] - fetched");

//     await prisma.cursus.createMany({
//       data: data.map((cursus) => ({
//         id: cursus.id,
//         name: cursus.name,
//         slug: cursus.slug,
//         created_at: cursus.created_at,
//       })),
//       skipDuplicates: true,
//     });
//     console.log("[Cursus] - seeded");
//   };

//   const updateAchievements = async () => {
//     console.log(`[Achievements] - start`);
//     const { data } = await get42Achievements();
//     console.log(`[Achievements] - fetched`);

//     await prisma.achievement.createMany({
//       data: data.map((achievement) => ({
//         id: achievement.id,
//         description: achievement.description,
//         image: achievement.image,
//         kind: achievement.kind,
//         name: achievement.name,
//         tier: achievement.tier,
//         visible: achievement.visible,
//         parent_name: achievement.parent ? achievement.parent.name : null,
//       })),
//       skipDuplicates: true,
//     });
//     console.log(`[Achievements] - seeded`);
//   };

//   const updateCoalitions = async (index: number = 1) => {
//     console.log(`[Coalitions][${index}] - start`);
//     const { data, headers } = await get42Coalitions({
//       "page[number]": index,
//     });
//     console.log(`[Coalitions][${index}] - fetched`);

//     await prisma.coalition.createMany({
//       data: data.map((coalition) => ({
//         id: coalition.id,
//         name: coalition.name,
//         slug: coalition.slug,
//         color: coalition.color,
//         image_url: coalition.image_url,
//         cover_url: coalition.cover_url,
//       })),
//       skipDuplicates: true,
//     });
//     console.log(`[Coalitions][${index}] - seeded`);

//     if (
//       Math.round(
//         parseInt(headers["x-total"]) / parseInt(headers["x-per-page"])
//       ) > index
//     ) {
//       await updateCoalitions(index + 1);
//     }
//   };

//   return await Promise.all([
//     updateSkills(),
//     updateLanguages(),
//     updateCampus(),
//     updateCursus(),
//     updateAchievements(),
//     updateCoalitions(),
//   ]);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export {};
