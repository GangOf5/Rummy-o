import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import Card from "@material-ui/core/Card";
import { tile } from "../../Shared/ColorTheme";
import { Typography } from "@material-ui/core";

export default function Tile({ number, tileColor }) {
  return (
    <Card
      style={{
        backgroundColor: tile.background,
        color: tileColor,
        height: "3rem",
        width: "1rem",
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      {number > 0 ? (
        <Typography variant="h5" component="div">
          {number}
        </Typography>
      ) : (
        <InsertEmoticon fontSize="large" />
      )}
    </Card>
  );
}
