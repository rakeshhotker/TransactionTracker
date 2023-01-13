import React, { useEffect, useState } from "react";
import BackendCaller from "../API/BackendCaller";
import Multiselect from "multiselect-react-dropdown";
function Transactioncrud({ username, transactions }) {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [splitters, setSplitters] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        let response = await BackendCaller.get("getAllUsers");
        setUsers(response.data.Users);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  //   function preprocess(temp) {
  //     let temp1 = [];
  //     temp.map((x) => console.log(x));
  //     setSplitters(temp1);
  //   }
  function handleSelect(data) {
    setSplitters(data);
    // preprocess(splitters);
  }
  function handleRemove(data) {
    setSplitters(data);
    // preprocess(splitters);
  }
  async function splitAmount(transactionid) {
    console.log(transactionid);
    let amountperuser = parseInt(amount / splitters.length);
    try {
      for (let ower in splitters) {
        let response = await BackendCaller.post(
          `storeMoneyOwedByUser/${splitters[ower]["username"]}/${amountperuser}/${transactionid}`
        );
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit() {
    try {
      let response = await BackendCaller.post(
        `createTransaction/${username}/${amount}/${category}`,
        {
          splitters: splitters,
        }
      );
      splitAmount(response.data.tid);
      console.log(response.data.tid);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="text-3xl text-center">Create Transaction</div>
      <div className="flex justify-around mt-2">
        <label className="text-2xl">Enter Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border-2 border-black outline-none"
        />
        <label className="text-2xl">Enter category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-black outline-none"
        />
      </div>
      <div className="flex justify-start mt-8">
        <label className="mr-4 text-2xl">Choose Users to split with:</label>
        <div className="w-1/2 h-8">
          <Multiselect
            options={users}
            displayValue={"username"}
            onSelect={handleSelect}
            onRemove={handleRemove}
            className="border-2 border-black outline-none"
          />
        </div>
      </div>
      <div className="absolute mt-4 ml-4">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Create Transaction
        </button>
      </div>
    </>
  );
}

export default Transactioncrud;
