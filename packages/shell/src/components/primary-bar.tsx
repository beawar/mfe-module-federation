import { NavLink } from "react-router-dom";
import { useAppStore } from "../stores/app-store";
import * as styles from "./primary-bar.module.css";

export const PrimaryBar = () => {
  const modules = useAppStore((state) => state.modules);

  return (
    <nav className={styles.primaryBar}>
      {modules.map((module) => {
        return (
          module.route &&
          module.primaryBar && (
            <NavLink to={`/${module.route}`} key={module.id}>
              {<module.primaryBar />}
            </NavLink>
          )
        );
      })}
    </nav>
  );
};
