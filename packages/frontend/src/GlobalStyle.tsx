import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700,900&subset=japanese');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 13px;
    line-height: 1.67;
    background: #fff;
    color: #666;
  }

  #root {
    position:relative;
    z-index: 0;
  }

  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: local('Material Icons'), local('MaterialIcons-Regular');
  }

  a {
    text-decoration: none;
  }

  input {
    line-height: 1.3;
    font-size: 16px;
  }

  textarea {
    line-height: 1.6;
    font-size: 16px;
  }

  code {
    background: #eee;
    padding: 2px 6px;
    border-radius: 4px;
    color: deeppink;
  }
`
