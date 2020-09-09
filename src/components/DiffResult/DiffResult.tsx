import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import NumberFormat from "react-number-format";

import classes from "./DiffResult.module.scss";
import {
  DiffTableResultContent,
  DiffTableRawContent,
} from "../../models/DiffResult.model";
import { DISPLAY_NAMES_RUS } from "./display-names";

export function DiffResult(props: DiffTableResultContent) {
  return (
    <div className={classes.resultsContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{DISPLAY_NAMES_RUS.ORDER_PAYMENT_NUMBER}</TableCell>
              <TableCell>{DISPLAY_NAMES_RUS.PEYMENT_FOR_PERIOD}</TableCell>
              <TableCell>
                {DISPLAY_NAMES_RUS.BASIC_DEBT_PERIOD_PAYMENT}
              </TableCell>
              <TableCell>
                {DISPLAY_NAMES_RUS.PERCENTAGE_PERIOD_PAYMENT}
              </TableCell>
              <TableCell>{DISPLAY_NAMES_RUS.TOTAL_PERIOD_PAYMENT}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row: DiffTableRawContent, index: number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  {row.paymentPeriod.month}, {row.paymentPeriod.year}
                </TableCell>
                <TableCell>
                  {
                    <NumberFormat
                      value={row.amountOfDebt}
                      thousandSeparator={" "}
                      decimalScale={2}
                      displayType={"text"}
                      style={{ fontWeight: "bold" }}
                    />
                  }
                </TableCell>
                <TableCell>
                  {
                    <NumberFormat
                      value={row.amountOfPercentage}
                      thousandSeparator={" "}
                      decimalScale={2}
                      displayType={"text"}
                      style={{ fontWeight: "bold" }}
                    />
                  }
                </TableCell>
                <TableCell>
                  {
                    <NumberFormat
                      value={row.paymentAmount}
                      thousandSeparator={" "}
                      decimalScale={2}
                      displayType={"text"}
                      style={{ fontWeight: "bold" }}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
