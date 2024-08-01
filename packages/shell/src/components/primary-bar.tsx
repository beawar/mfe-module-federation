import { NavLink } from "react-router-dom";
import { type Module } from "../stores/app-store";
import * as styles from "./primary-bar.module.css";

export const PrimaryBar = ({ modules }: { modules: Module[] }) => {
  return (
    <nav className={styles.primaryBar}>
      PrimaryBar
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
