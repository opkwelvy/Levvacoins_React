import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/defaulTheme";
import { GlobalStyle } from "./styles/global";


function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        Opa lele
        <GlobalStyle></GlobalStyle>
      </div>
    </ThemeProvider>
  );
}

export default App
