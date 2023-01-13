import React from "react";

function TransactionCard({ transaction }) {
  return (
    <>
      <div className="flex flex-col items-center justify-around w-48 h-64 mt-2 border-2">
        <div className="flex items-center justify-center w-20 h-20 bg-blue-300 rounded-full">
          <p>{transaction.amount}</p>
        </div>
        <div>
          <div>
            <span className="text-xl">Category:</span>&nbsp;
            <span className="text-md">{transaction.category}</span>
          </div>
          <div className="h-20">
            <div className="text-md">Splitted with:</div>
            <div className="flex flex-col overflow-y-scroll">
              {transaction.splitters.length > 0 ? (
                transaction.splitters.map((splitter) => {
                  return <div>{splitter}</div>;
                })
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionCard;
