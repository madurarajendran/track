// Section switching
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Expense tracking
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalSpent = document.getElementById('totalSpent');

function updateExpenses() {
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach((exp, index) => {
        total += exp.amount;
        expenseList.innerHTML += `<li>${exp.desc}: $${exp.amount} (${exp.category}) <button onclick="deleteExpense(${index})">Delete</button></li>`;
    });
    totalSpent.textContent = total;
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('expenseDesc').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    expenses.push({ desc, amount, category });
    updateExpenses();
    expenseForm.reset();
});

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenses();
}

// Journal
let journalEntries = JSON.parse(localStorage.getItem('journal')) || [];
const journalForm = document.getElementById('journalForm');
const journalEntriesDiv = document.getElementById('journalEntries');
const entryCount = document.getElementById('entryCount');

function updateJournal() {
    journalEntriesDiv.innerHTML = '';
    journalEntries.forEach((entry, index) => {
        journalEntriesDiv.innerHTML += `<div style="background: white; margin: 10px 0; padding: 10px; border-radius: 5px;"><strong>${entry.date}:</strong> ${entry.text} <button onclick="deleteEntry(${index})">Delete</button></div>`;
    });
    entryCount.textContent = journalEntries.length;
    localStorage.setItem('journal', JSON.stringify(journalEntries));
}

journalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('journalEntry').value;
    const date = new Date().toLocaleDateString();
    journalEntries.push({ date, text });
    updateJournal();
    journalForm.reset();
});

function deleteEntry(index) {
    journalEntries.splice(index, 1);
    updateJournal();
}

// Initialize
updateExpenses();
updateJournal();
showSection('dashboard');