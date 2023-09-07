export const size = {
  mobile: 375,
  tablet: 745,
  desktop: 1440,
};

export const media = {
  mobile: `screen and (min-width: ${size.mobile}px)`,
  tablet: `screen and (min-width: ${size.tablet}px)`,
  desktop: `screen and (min-width: ${size.desktop}px)`,
  mobTab: `screen and (min-width: ${size.mobile}px) and (max-width: ${size.tablet - 1}px)`,
  tabDesk: `screen and (min-width: ${size.tablet}px) and (max-width: ${size.desktop - 1}px)`,
  retina: `and (-webkit-min-device-pixel-ratio: 2) `,
};
