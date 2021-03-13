import React from "react";
import useStyles from "./styles";
import GB from "./flags/GB.png";
import PL from "./flags/PL.png";

const Flag = ({ country }) => {
  const classes = useStyles();

  const imgSrc = country === "GB" ? GB : PL;

  return <img src={imgSrc} alt={`${country} flag`} className={classes.flag} />;
};

export default Flag;
