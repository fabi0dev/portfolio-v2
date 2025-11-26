import { useTheme } from "./hooks/useTheme";
import Routers from "./routes";

function App() {
  useTheme();

  return <Routers />;
}

export default App;
