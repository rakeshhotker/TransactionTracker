import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Transactioncrud from "./components/Transactioncrud";
function App() {
  let username = "selena";
  const [transactions, setTransactions] = useState([]);
  return (
    <>
      <div className="flex">
        <div className="w-1/3">
          <Sidebar
            username={username}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        </div>
        <div className="flex flex-col justify-center w-2/3 h-screen">
          <div>
            <Transactioncrud
              username={username}
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
