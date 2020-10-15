export default (cursus_name) => {
  return `
  <g
    data-testid="card-title"
    transform="translate(400, 35)"
  >
    <g transform="translate(0, 0)">
    <text
      x="0"
      y="0"
      class="cursus"
      data-testid="header"
    >${cursus_name}!</text>
    </g>
  </g>
  `;
};
