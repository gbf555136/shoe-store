import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * , p{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Serif TC', serif;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background-color: #f5f5f5;
    //hide scroll bar
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }`;

export default GlobalStyle;
