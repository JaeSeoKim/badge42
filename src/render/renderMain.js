import getImageToBase64 from "../util/getImageToBase64";
import renderHeader from "./renderHeader";
import renderLogo from "./renderLogo";

export default async (user_data) => {
  const background_color = user_data.color ? user_data.color : "#00BABC";

  const name = user_data.first_name + " " + user_data.last_name;

  const logo = await getImageToBase64(user_data.image_url);

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
      font: 600 20px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #fff;
    }

    .logo {

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
      fill="${background_color}"
      stroke-opacity="1"
    />
    ${renderLogo(background_color, logo)}
    ${renderHeader(user_data.login)}
    </svg>
  `;
};
