import { createRoot } from "react-dom/client";
import { AppView1 } from "./app";

// Render your React component instead
const element = document.getElementById("root");
if (element) {
  const root = createRoot(element);
  root.render(<AppView1 />);
}
