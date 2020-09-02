import React from "react";

import "./Main.scss";
import { ConstForm } from "../ConstForm";
import { DISPLAY_NAMES_RUS } from "./display-names";

export function Main() {
  return (
    <div className="main">
      {DISPLAY_NAMES_RUS.APP_NAME}
      <ConstForm />
    </div>
  );
}
