import { useTheme } from "./hooks/useTheme";
import Routers from "./routes";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  useTheme();

  return (
    <>
      <Routers />
      <SpeedInsights />
    </>
  );
}

export default App;
