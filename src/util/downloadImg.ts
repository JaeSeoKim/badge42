import Axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import { get42API, get42UserCoalitionData } from "../api/api42";

dotenv.config();

const downloadImg = async () => {
  let result = {};
  try {
    result = JSON.parse(fs.readFileSync("src/coalitions.json").toString());
  } catch (error) {}

  for (let i = 1; i <= 150; i++) {
    let data: get42UserCoalitionData;
    if (!result[i]) {
      try {
        data = await get42API(`/v2/coalitions/${i}`);
        console.log("try...", i, data);
        if (data.image_url)
          fs.writeFileSync(
            `src/img/logo/${data.id}.svg`,
            (await Axios.get(encodeURI(data.image_url))).data
          );
        if (data.cover_url)
          fs.writeFileSync(
            `src/img/cover/${data.id}.jpg`,
            (
              await Axios.get(encodeURI(data.cover_url), {
                responseType: "arraybuffer",
              })
            ).data
          );
        result[data.id] = data;
      } catch (error) {
        console.log("fail..", i);
      }
    }
  }
  fs.writeFileSync("src/coalitions.json", JSON.stringify(result));
};

downloadImg();
