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

export function DiffResult(props: any) {
  return (
    <div className={classes.resultsContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№ Платежа</TableCell>
              <TableCell>Оплата за период</TableCell>
              <TableCell>Основной долг</TableCell>
              <TableCell>Начисленные проценты</TableCell>
              <TableCell>Сумма платежа</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row: any, index: number) => (
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
