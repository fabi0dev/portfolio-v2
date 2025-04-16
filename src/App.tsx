import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import Routers from "./routes";
import { sevlaControl } from "./services/sevlaControl";

function App() {
  useTheme();

  useEffect(() => {
    sevlaControl.registerAnalytics();
  }, []);

  return <Routers />;
}

export default App;
