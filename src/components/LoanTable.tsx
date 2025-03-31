import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

interface Loan {
  id: string;
  loanType: string;
  borrower: string;
  amount: number;
  region: string;
}

interface LoanTableProps {
  loans: Loan[];
}

const LoanTable: React.FC<LoanTableProps> = ({ loans }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Loan Type</TableCell>
            <TableCell>Borrower</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Region</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.loanType}</TableCell>
              <TableCell>{loan.borrower}</TableCell>
              <TableCell>{loan.amount}</TableCell>
              <TableCell>{loan.region}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default LoanTable;