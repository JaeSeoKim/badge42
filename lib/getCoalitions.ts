import { Coalition } from "./api/42api";
import collection from "lodash-es/collection";

const getCoalitions = (
  id: string,
  _coalitions: Coalition[],
  baseUrl: string = ""
) => {
  const collections = {
    ...collection.keyBy(_coalitions, "id"),
    piscine: {
      image_url: `${baseUrl}/assets/logo/piscine.svg`,
      cover_url: `${baseUrl}/assets/cover/default.jpg`,
      color: "#00babc",
    },
    undefined: {
      image_url: `${baseUrl}/assets/logo/unknown.svg`,
      cover_url: `${baseUrl}/assets/cover/default.jpg`,
      color: "#00babc",
    },
  };

  return collections[id];
};

export default getCoalitions;
