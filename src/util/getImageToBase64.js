import Axios from "axios";

const base64encode = (res) => {
  return `data:${res.headers["content-type"]};base64,${Buffer.from(
    String.fromCharCode(...new Uint8Array(res.data)),
    "binary"
  ).toString("base64")}`;
};

export default async (url) => {
  const response = await Axios.get(url, {
    responseType: "arraybuffer",
  });

  return base64encode(response);
};
