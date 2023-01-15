import React from "react";
import BackendCaller from "../API/BackendCaller";

function TransactionCard({ transaction, flag, setFlag }) {
  async function handleDelete(e, tid) {
    e.preventDefault();
    try {
      let response = await BackendCaller.post(`deleteTransaction/${tid}`);
      console.log("deleted", response);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-around w-48 h-64 mt-2 border-2">
        <div className="flex items-center justify-center w-20 h-20 bg-blue-400 rounded-full">
          <p>{transaction.amount}</p>
        </div>
        <div>
          <div className="flex justify-between">
            <button className="px-4 py-2 text-white bg-blue-400 rounded-full font-md hover:bg-green-700">
              Update
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-400 rounded-full font-md hover:bg-red-700"
              onClick={(e) => handleDelete(e, transaction.id)}
            >
              Delete
            </button>
          </div>
          <div>
            <span className="text-xl">Category:</span>&nbsp;
            <span className="text-md">{transaction.category}</span>
          </div>
          <div className="h-20">
            <div className="text-md">Splitted with:</div>
            <div className="flex flex-col h-16 overflow-y-scroll">
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
