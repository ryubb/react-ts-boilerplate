import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const theme = {
  colors: {
    main: "red",
    accent: "blue",
    baseThinGray: "gray",
    link: "black",
  },
  layout: {
    headerHeight: "68px",
    spBreakPoint: "480",
  },
};

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* reset CSS */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: ${theme.colors.link};
    text-decoration: none;
  }
  body {
    font-family: 'Roboto','Noto Sans JP','ヒラギノ角ゴシック Pro','Hiragino Kaku Gothic Pro','Arial','メイリオ','Meiryo','Osaka','ＭＳ Ｐゴシック','MS PGothic',sans-serif;
    background-color: ${theme.colors.baseThinGray};
  }
`;

export default GlobalStyle;
