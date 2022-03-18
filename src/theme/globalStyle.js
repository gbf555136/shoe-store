import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * , p{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Serif TC', serif;
    font-family: 'Roboto', sans-serif;
  }
  a {
    color:black;
    text-decoration: none;
  }
  body {
    background-color: #f5f5f5;
    //hide scroll bar
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  //hide input arrow
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  `;

export default GlobalStyle;
