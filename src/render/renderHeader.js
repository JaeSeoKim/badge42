export default (name) => {
  return `
  <g
    data-testid="card-title"
    transform="translate(55, 35)"
  >
    <g transform="translate(0, 0)">
    <text
      x="0"
      y="0"
      class="header"
      data-testid="header"
    >${name}'s 42 Stats</text>
    </g>
  </g>
  `
}