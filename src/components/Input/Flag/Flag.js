import React from "react";
import PropTypes from "prop-types";

import useStyles from "./styles";
import GB from "./flags/GB.png";
import PL from "./flags/PL.png";
import { countryShorts } from "../../../constants/inputConstants";

const Flag = ({ country }) => {
  const classes = useStyles();

  const imgSrc = country === countryShorts.GB ? GB : PL;

  return <img src={imgSrc} alt={`${country} flag`} className={classes.flag} />;
};

Flag.propTypes = {
  country: PropTypes.string,
};

export default Flag;
