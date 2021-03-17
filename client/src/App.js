import Tile from "./Components/Game/Tile";
import { pink } from "@material-ui/core/colors";

export default function App() {
  return <Tile tileColor={pink[500]} number={3} />;
}
