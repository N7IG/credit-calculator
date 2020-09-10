import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import NumberFormat from "react-number-format";

import classes from "./DiffResult.module.scss";
import {
  DiffTableResultContent,
  DiffTableRawContent,
} from "../../models/DiffResult.model";
import { DISPLAY_NAMES_RUS } from "./display-names";

export function DiffResult(props: DiffTableResultContent) {
  return (
    <div>
      <div className={classes.basicResultContainer}>
        <div>
          {DISPLAY_NAMES_RUS.FIRST_PAYMENT}:{" "}
          <span>
            <NumberFormat
              value={props.data[1].paymentAmount}
              thousandSeparator={" "}
              decimalScale={2}
              displayType={"text"}
              style={{ fontWeight: "bold" }}
            />
          </span>
        </div>
        <div>
          {DISPLAY_NAMES_RUS.OVERPAYMENT}:{" "}
          <span>
            <NumberFormat
              value={props.data.reduce((acc, curr) => {
                return acc + curr.amountOfPercentage;
              }, 0)}
              thousandSeparator={" "}
              decimalScale={2}
              displayType={"text"}
              style={{ fontWeight: "bold" }}
            />
          </span>
        </div>
      </div>
      <Accordion square={true} className={classes.resultDetails}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
          aria-controls="payment-details"
          id="payment-details"
        >
          <div>{DISPLAY_NAMES_RUS.DETAILS}</div>
        </AccordionSummary>
        <AccordionDetails className={classes.paymentDetailsExpanded}>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>{DISPLAY_NAMES_RUS.PAYMENT_FOR_PERIOD}</b>
                  </TableCell>
                  <TableCell>
                    <b>{DISPLAY_NAMES_RUS.TOTAL_PERIOD_PAYMENT}</b>
                  </TableCell>
                  <TableCell>
                    <b>{DISPLAY_NAMES_RUS.PERCENTAGE_PERIOD_PAYMENT}</b>
                  </TableCell>
                  <TableCell>
                    <b>{DISPLAY_NAMES_RUS.BASIC_DEBT_PERIOD_PAYMENT}</b>
                  </TableCell>
                  <TableCell>
                    <b>{DISPLAY_NAMES_RUS.PAYMENT_LEFT}</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((row: DiffTableRawContent, index: number) => (
                  <TableRow key={index} hover={true}>
                    <TableCell component="th" scope="row">
                      {index
                        ? index + " " + DISPLAY_NAMES_RUS.PAYMENT
                        : DISPLAY_NAMES_RUS.PAYMENT_ISSUE}
                      <br />
                      <small>
                        {row.paymentPeriod.month}, {row.paymentPeriod.year}
                      </small>
                    </TableCell>
                    <TableCell>
                      {
                        <NumberFormat
                          value={row.paymentAmount}
                          thousandSeparator={" "}
                          decimalScale={2}
                          displayType={"text"}
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
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <NumberFormat
                          value={row.amountOfDebt}
                          thousandSeparator={" "}
                          decimalScale={2}
                          displayType={"text"}
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <NumberFormat
                          value={row.leftDebtAmount}
                          thousandSeparator={" "}
                          decimalScale={2}
                          displayType={"text"}
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow className={classes.tableRowFooter}>
                <TableCell>
                  <b>{DISPLAY_NAMES_RUS.SUMMARIZE}</b>
                </TableCell>

                <TableCell>
                  {
                    <b>
                      <NumberFormat
                        value={props.data.reduce((acc, curr) => {
                          return acc + curr.paymentAmount;
                        }, 0)}
                        thousandSeparator={" "}
                        decimalScale={2}
                        displayType={"text"}
                        style={{ fontWeight: "bold" }}
                      />
                    </b>
                  }
                </TableCell>
                <TableCell>
                  {
                    <b>
                      <NumberFormat
                        value={props.data.reduce((acc, curr) => {
                          return acc + curr.amountOfPercentage;
                        }, 0)}
                        thousandSeparator={" "}
                        decimalScale={2}
                        displayType={"text"}
                        style={{ fontWeight: "bold" }}
                      />
                    </b>
                  }
                </TableCell>
                <TableCell>
                  {
                    <b>
                      <NumberFormat
                        value={props.data.reduce((acc, curr) => {
                          return acc + curr.amountOfDebt;
                        }, 0)}
                        thousandSeparator={" "}
                        decimalScale={2}
                        displayType={"text"}
                        style={{ fontWeight: "bold" }}
                      />
                    </b>
                  }
                </TableCell>
                <TableCell>
                  {
                    <b>
                      <NumberFormat
                        value={props.data.slice(-1)[0].leftDebtAmount}
                        thousandSeparator={" "}
                        decimalScale={2}
                        displayType={"text"}
                        style={{ fontWeight: "bold" }}
                      />
                    </b>
                  }
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
