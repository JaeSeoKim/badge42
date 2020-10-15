export default (blackhole_remain) => {
  return `
  <g
    data-testid="card-title"
    transform="translate(35, 150)"
  >
    <g transform="translate(0, 0)">
    <text
      x="0"
      y="0"
      class="cursus"
      data-testid="header"
    >
    Black Hole absorption
      ${blackhole_remain} days left
    Black Hole absorption
    </text>
    </g>
  </g>
  `;
};
