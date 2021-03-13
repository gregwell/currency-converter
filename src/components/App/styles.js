import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  app: {
    color: "#25303B",
    height: "250px",
  },
  currencyInfoContainer: {
    margin: theme.spacing(2.5),
    width: "calc(180px + 10vw)",
  },
  bold: {
    fontWeight: 500,
  },
}));
