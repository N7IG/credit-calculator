import React from "react";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import classes from "./Header.module.scss";

export const Header = () => (
  <section className={classes.header}>
    <div className={classes.dollarIcon}>
      <AttachMoneyIcon />
    </div>
    <h1>Кредитный калькулятор</h1>
  </section>
);
