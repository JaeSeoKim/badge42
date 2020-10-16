import getImageToBase64 from "../util/getImageToBase64";
import getRemainDay from "../util/getRemainDay";
import renderBlackhole from "./renderBlackhole";
import renderCursus from "./renderCursus";
import renderHeader from "./renderHeader";
import renderLogo from "./renderLogo";

export default async (user_data) => {
  console.log(user_data);

  const color = user_data.color
    ? user_data.color.substring(0, 1) == "#"
      ? user_data.color
      : "#" + user_data.color
    : "#00BABC";

  const logo = await getImageToBase64(user_data.image_url);

  // TODO: end_at이 null이 아닌 경우 언제 종료 했는지 보여주어야 함.
  const blackhole_remain = getRemainDay(user_data.blackholed_at);

  return `
    <svg
      width="495"
      height="195"
      viewBox="0 0 495 195"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    <style>
    .bg {
      width: 100%;
      object-fit: fill;
    }

    .header {
      font: 600 18px 'Arial', 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #fff;
    }

    .logo {

    }

    .cursus {
      font: 600 14px 'Arial', 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #fff;
    }

    </style>

    <rect
      data-testid="card-bg"
      x="0.5"
      y="0.5"
      rx="4.5"
      height="99%"
      stroke="#E4E2E2"
      width="494"
      fill="${color}"
      stroke-opacity="1"
    />
    ${renderLogo(color, logo)}
    ${renderHeader(user_data.login, user_data.capus.name)}
    ${renderCursus(user_data.cursus_name)}
    ${renderBlackhole(blackhole_remain)}
    </svg>
  `;
};
