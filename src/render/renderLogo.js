export default (color, logo) => {
  return `
  <g
    data-testid="card-logo"
    transform="translate(10, 1)"
  >
    <svg
      width="34px"
      height="52px"
      class="logo"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 68 104"
        style="enable-background: new 0 0 68 104; fill: rgba(32, 32, 38, 0.35);"
        xml:space="preserve"
      >
        <g>
          <g transform="translate(-96.000000, -60.000000)">
            <g transform="translate(96.000000, 60.000000)">
              <polygon points="0,0 0,80.5 34.3,104 68,80.5 68,0"/>
            </g>
          </g>
        </g>
      </svg>
      <g
        transform="translate(2, 12)"
      >
        <image style="--color_fill: ${color};" x="0" y="0" width="30" height="30" href="${logo}" />
      </g>
    </svg>
  </g>
  `;
};
