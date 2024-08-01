import { useEffect } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { registerModule } from "shell";
import { APP_ID } from "./constants";

const AppView = () => {
  return (
    <div>
      <h1>App 2</h1>
      <h2>App 2 view</h2>
    </div>
  );
};

export const App = () => {
  useEffect(() => {
    registerModule({
      id: APP_ID,
      route: APP_ID,
      name: "App 1",
      description: "App 1 description",
      primaryBar: HiAcademicCap,
      appView: AppView,
    });
  }, []);
};

export default App;
