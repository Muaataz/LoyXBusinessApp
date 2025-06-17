export interface Theme {
  colors: {
    primary: string;
    background: string;
    light_grey_background: string;
    border_color: string;
    black: string;
    darker_gray: string;
    primaryBlack: string;
    lightBlack: string;
    greyBlack: string;
    disableText: string;
    dark_grey_background: string;
  };
  spacing: (factor: number) => number;
}
