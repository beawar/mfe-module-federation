import { HiMiniShoppingCart } from "react-icons/hi2";
import { APP_ID } from "./constants";
import { BsAirplane } from "react-icons/bs";

export const AppView1 = () => {
  return (
    <div>
      <h1>App 1</h1>
      <h2>App view 1</h2>
    </div>
  );
};

export const AppView2 = () => {
  return (
    <div>
      <h1>App 1-2</h1>
      <h2>App view 1-2</h2>
    </div>
  );
};

export const apps = [
  {
    id: APP_ID,
    route: APP_ID,
    name: "App 1",
    description: "App 1 description",
    primaryBar: HiMiniShoppingCart,
    appView: AppView1,
  },
  {
    id: `${APP_ID}-2`,
    route: `${APP_ID}-2`,
    name: "App 1-2",
    description: "App 1-2 description",
    primaryBar: BsAirplane,
    appView: AppView2,
  },
];
