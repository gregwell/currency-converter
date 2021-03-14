import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../constants/colors";

export default makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
    fontWeight: 400,
  },

  label: {
    marginLeft: theme.spacing(0.5),
    fontSize: "15px",
  },

  textField: {
    margin: theme.spacing(0.25),
    background: colors.textFieldBackground,
  },

  notchedOutline: {
    borderColor: colors.textFieldOutline,
  },

  flagAdornment: {
    marginTop: theme.spacing(0.5),
  },

  input: {
    fontSize: "15px",
    width: "calc(180px + 10vw)",
  },

  currencyCodeAdornment: {
    color: colors.currencyCodeText,
    fontSize: 12,
    fontWeight: "bold",
  },
}));
