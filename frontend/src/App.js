import Sidebar from "./components/Sidebar";
import TransactionCards from "./components/TransactionCards";
import Transactioncrud from "./components/Transactioncrud";
import { useState, useEffect } from "react";
import BackendCaller from "./API/BackendCaller";
function App() {
  const [transactions, setTransactions] = useState([]);
  let username = "selena";
  useEffect(() => {
    async function getData() {
      try {
        let response = await BackendCaller.get(
          `getTransactionOfUser/${username}`
        );
        setTransactions(response.data.Transactions);
        console.log(transactions);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [username]);
  return (
    <>
      <div className="flex">
        <div className="w-1/3">
          <Sidebar transactions={transactions} username={username} />
        </div>
        <div className="flex flex-col justify-center w-2/3 h-screen">
          <div className="h-1/3">
            <Transactioncrud username={username} transactions={transactions} />
          </div>
          <div className="overflow-y-scroll h-2/3">
            <TransactionCards
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
