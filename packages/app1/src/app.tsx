import { HiMiniShoppingCart } from "react-icons/hi2";
import { APP_ID } from "./constants";
import { registerModule } from "shell";
import { useEffect } from "react";

const AppView = () => {
  return (
    <div>
      <h1>App 1</h1>
      <h2>App view</h2>
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
      primaryBar: HiMiniShoppingCart,
      appView: AppView,
    });
  }, []);
};

export default App;
