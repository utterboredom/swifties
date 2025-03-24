import { ThemeProvider } from "styled-components";
import "./App.css";
import ContentSwitcher from "./components/ContentSwitcher";

function App() {
  return (
    <ThemeProvider theme={{}}>
      <ContentSwitcher />
    </ThemeProvider>
  );
}

export default App;
