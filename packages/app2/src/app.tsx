import { APP_ID } from "./constants";
import { BsAmazon } from "react-icons/bs";

export const AppView = () => {
  return (
    <div>
      <h1>App 2</h1>
      <h2>App 2 view</h2>
    </div>
  );
};

export const apps = [
  {
    id: APP_ID,
    route: APP_ID,
    name: "App 2",
    description: "App 2 description",
    primaryBar: BsAmazon,
    appView: AppView,
  },
];
