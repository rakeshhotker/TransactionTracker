import React, { useEffect, useRef, useState } from "react";
import BackendCaller from "../API/BackendCaller";

function Sidebar({ transactions, username }) {
  const [owedList, setOwedList] = useState([]);
  const [owersList, setOwerslist] = useState([]);
  // var [totalspent, setTotalSpent] = useState(0);
  // var [totalmoneyOwedtoUser, setTotalOwed] = useState(0);

  var totalspent = 0;
  var totalmoneyOwedtoUser = 0;
  let moneyotherowe = [];
  let finalowersList = [];
  useEffect(() => {
    async function getData() {
      try {
        let response = await BackendCaller.get(
          `getMoneyOwedByUser/${username}`
        );
        console.log(response.data.owedList);
        setOwedList(response.data.owedList);
      } catch (error) {
        console.log(error);
      }
    }
    async function getmoneyUsersOwe() {
      for (let i in transactions) {
        totalspent += parseInt(transactions[i]["amount"]);
        console.log(totalspent, "totalspent");
        let k = transactions[i]["splitters"];
        for (let j in k) {
          moneyotherowe.push(k[j]);
        }
      }
      // setTotalSpent(totalspent);
      moneyotherowe = [...new Set(moneyotherowe)];
      async function getowedData() {
        try {
          for (let i in moneyotherowe) {
            let response = await BackendCaller.get(
              `getMoneyOwedByUser/${moneyotherowe[i]}`
            );
            let tempList = response.data.owedList;
            for (let i in tempList) {
              let data = {};
              if (tempList[i]["transaction_done_by"] === username) {
                data["owedby"] = moneyotherowe[i];
                let amountowed = parseInt(tempList[i]["amount_you_owe"]);
                data["amountowed"] = amountowed;
                totalmoneyOwedtoUser += amountowed;
                console.log(totalmoneyOwedtoUser);
                finalowersList.push(data);
              }
            }
            // setTotalOwed(totalmoneyOwedtoUser);
          }
          console.log(finalowersList);
          setOwerslist(finalowersList);
        } catch (error) {
          console.log(error);
        }
      }
      getowedData();
    }
    getmoneyUsersOwe();
    getData();
  }, [transactions]);
  console.log(totalspent);
  return (
    <>
      <h1 className="text-3xl text-center">Money You Owe</h1>
      <div className="flex justify-between mt-2">
        <label>Transaction Done by</label>
        <label>Amount you Owe</label>
      </div>
      <div className="mt-5">
        {owedList.map((transaction) => {
          return (
            <div className="flex justify-between">
              <div>{transaction.transaction_done_by}</div>
              <div>{transaction.amount_you_owe}</div>
            </div>
          );
        })}
      </div>
      <h1 className="text-3xl text-center">Money Owed</h1>
      <div className="flex justify-between mt-2">
        <label>OwedBy</label>
        <label>Amount</label>
      </div>
      <div className="mt-5">
        {owersList.map((transaction) => {
          return (
            <div className="flex justify-between">
              <div>{transaction.owedby}</div>
              <div>{transaction.amountowed}</div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="text-2xl">Total Spent</div>
        <div className="flex items-center justify-center w-20 h-20 bg-blue-300 rounded-full">
          <p>{totalspent - totalmoneyOwedtoUser}</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
