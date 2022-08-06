// SELECT elements
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const chartEl = document.querySelector(".chart");

const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

//VARIABLES
let ENTRY_LIST = [];
let balance = 0;
let income = 0;
let outcome = 0;

//EVENT Listeners
//show/hide tabs in dashboard
expenseBtn.addEventListener("click", function () {
  show(expenseEl);
  hide([incomeEl, allEl]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
});
incomeBtn.addEventListener("click", function () {
  show(incomeEl);
  hide([expenseEl, allEl]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
});
allBtn.addEventListener("click", function () {
  show(allEl);
  hide([incomeEl, expenseEl]);
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);
});

//Add Entry

addIncome.addEventListener("click", function () {
  // IF ONE OF THE INPUTS IS EMPTY => EXIT
  if (!incomeTitle.value || !incomeAmount.value) return;

  // SAVE THE ENTRY TO ENTRY_LIST
  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: parseInt(incomeAmount.value),
  };
  ENTRY_LIST.push(income);

  updateUI();
  clearInput([incomeTitle, incomeAmount]);
});

addExpense.addEventListener("click", function () {
  // IF ONE OF THE INPUTS IS EMPTY => EXIT
  if (!expenseTitle.value || !expenseAmount.value) return;

  // SAVE THE ENTRY TO ENTRY_LIST
  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: parseInt(expenseAmount.value),
  };
  ENTRY_LIST.push(expense);

  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

//FUNCTIONS
//show/hide tabs in dashboard
function active(element) {
  element.classList.add("active");
}
function show(element) {
  element.classList.remove("hide");
}
function hide(elementsArray) {
  elementsArray.forEach((element) => {
    element.classList.add("hide");
  });
}
function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}

//Add Entry
function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

//Calculate Balance, Income & Outcome

function calculateTotal(type, list) {
  let sum = 0;

  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });

  return sum;
}

function calculateBalance(income, outcome) {
  return income - outcome;
}

income = calculateTotal("income", ENTRY_LIST);
outcome = calculateTotal("expense", ENTRY_LIST);
balance = Math.abs(calculateBalance(income, outcome));

//show entry
function showEntry(list, type, title, amount, id) {
  const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;

  const position = "afterbegin";

  list.insertAdjacentHTML(position, entry);
}
