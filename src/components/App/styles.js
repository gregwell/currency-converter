import { makeStyles } from "@material-ui/core/styles";

import { colors } from "../../constants/colors";

export default makeStyles((theme) => ({
  app: {
    color: colors.text,
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
