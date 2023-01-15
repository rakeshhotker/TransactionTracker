import React, { useEffect, useRef, useState } from "react";
import BackendCaller from "../API/BackendCaller";

function Sidebar({ transactions, username, flag }) {
  const [owedList, setOwedList] = useState([]);
  const [owersList, setOwerslist] = useState([]);
  var [totalspent, setTotalSpent] = useState(0);
  var [totalmoneyOwedtoUser, setTotalOwed] = useState(0);

  // var totalspent = 0;
  // var totalmoneyOwedtoUser = 0;
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
      setTotalOwed(0);
      setTotalSpent(0);
      let moneyotherowe = [];
      let finalowersList = [];
      for (let i in transactions) {
        totalspent += parseInt(transactions[i]["amount"]);
        // console.log(totalspent, "totalspent");
        let k = transactions[i]["splitters"];
        for (let j in k) {
          moneyotherowe.push(k[j]);
        }
      }
      setTotalSpent(totalspent);
      moneyotherowe = [...new Set(moneyotherowe)];
      console.log(moneyotherowe);
      try {
        for (let ower in moneyotherowe) {
          let response = await BackendCaller.get(
            `getMoneyOwedByUser/${moneyotherowe[ower]}`
          );
          let tempList = response.data.owedList;
          console.log(tempList, moneyotherowe[ower]);
          for (let obj in tempList) {
            let data = {};
            if (tempList[obj]["transaction_done_by"] === username) {
              data["owedby"] = moneyotherowe[ower];
              let amountowed = parseInt(tempList[obj]["amount_you_owe"]);
              data["amountowed"] = amountowed;
              totalmoneyOwedtoUser += amountowed;
              // console.log(totalmoneyOwedtoUser);
              finalowersList.push(data);
            }
          }
          setTotalOwed(totalmoneyOwedtoUser);
        }
        console.log(finalowersList);
        setOwerslist(finalowersList);
      } catch (error) {
        console.log(error);
      }
    }
    getmoneyUsersOwe();
    getData();
  }, [transactions, flag]);
  console.log(totalspent);
  console.log(totalmoneyOwedtoUser);
  return (
    <>
      <div className="h-1/3">
        <h1 className="text-3xl text-center">Money You Owe</h1>
        <div className="flex justify-around mt-2">
          <label>Transaction Done by</label>
          <label>Amount you Owe</label>
        </div>
        <div className="h-40 mt-5 overflow-y-scroll">
          {owedList.map((transaction) => {
            return (
              <div className="flex justify-around">
                <div className="text-start">
                  {transaction.transaction_done_by}
                </div>
                <div className="text-start">{transaction.amount_you_owe}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10 h-1/3">
        <h1 className="text-3xl text-center">Money Owed</h1>
        <div className="flex justify-around mt-2">
          <label>OwedBy</label>
          <label>Amount</label>
        </div>
        <div className="h-40 mt-5 overflow-y-scroll">
          {owersList.map((transaction) => {
            return (
              <div className="flex justify-around">
                <div>{transaction.owedby}</div>
                <div>{transaction.amountowed}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 text-center h-1/3">
        <div className="text-2xl">Total Spent</div>
        <div className="flex items-center justify-center w-20 h-20 bg-blue-300 rounded-full">
          <p>{totalspent - totalmoneyOwedtoUser}</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
