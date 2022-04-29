import React from "react";

import classes from "./Card.module.scss";
const Card = (props) => {
  return (
    <div className={classes.content}>
      <div className={classes.card}>{props.children}</div>
    </div>
  );
};

export default Card;
