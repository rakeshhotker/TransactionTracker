import React, { useEffect, useState } from "react";
import BackendCaller from "../API/BackendCaller";
import TransactionCard from "./TransactionCard";

function TransactionCards({ transactions, setTransactions }) {
  return (
    <>
      <div className="text-3xl text-center">Transactions Done</div>
      <div className="grid grid-cols-3 grid-rows-1 mt-2 overflow-y-scroll gap-x-1 gap-y-2">
        {transactions.map((transaction) => {
          return <TransactionCard transaction={transaction} />;
        })}
      </div>
    </>
  );
}

export default TransactionCards;
