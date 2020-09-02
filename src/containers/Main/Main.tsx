import React from "react";

import classes from "./Main.module.scss";
import { ConstForm } from "../../components";
import { DISPLAY_NAMES_RUS } from "./display-names";

export const Main = () => (
  <div className={classes.main}>
    {DISPLAY_NAMES_RUS.APP_NAME}
    <ConstForm />
  </div>
);
