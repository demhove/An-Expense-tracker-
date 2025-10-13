  let income = 0;
  let expenses = 0;
  let cashBalance = 1400;
  const STORAGE_KEY = 'expense_tracker_data_v1';

  let transactions = JSON.parse(localStorage.getItem('expense_tracker_data_v1')) || [];

  function saveTransactions() {
    localStorage.setItem('expense_tracker_data_v1', JSON.stringify(transactions))
  }

  
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}


  function updateDashboard(){
    const income = transactions
    .filter((tx => tx.type === 'income'))
    .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const cashBalance = income - expenses;
    document.getElementById("income").textContent = `₦${income.toLocaleString()}`;
    document.getElementById("expenses").textContent = `₦${expenses.toLocaleString()}`;
    document.getElementById("balance").textContent = `₦${cashBalance.toLocaleString()}`;
  }; 
  updateDashboard();

  

 
 function  selectCategory(element){
        document.querySelectorAll('.category').forEach(cat => {
            cat.classList.remove('selected')
        })

        element.classList.add('selected');
    }




    const addBtn = document.getElementById('add-btn');
     const modal = document.getElementById('expense-modal');
     const closeBtn = document.getElementById('close-modal');


addBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});


closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
  

const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

function addTransactionToList(tx){
  const li = document.createElement('li');
  li.className = 'expense-item';
  li.innerHTML = li.innerHTML.trimStart();
  li.innerHTML =`
    <span class="expense-title" style ="text-align: start">${tx.title}</span>
    <span class="expense-category">${tx.category}</span>
    <span class="expense-amount" style="color:${tx.type === 'income' ? '#38a169' : '#e63946'};">
      ${tx.type === 'income' ? '+' : '-'}₦${tx.amount.toLocaleString()}
    </span>
    <button class="delete-btn" data-id="${tx.id}">✕</button>
  `;
  document.getElementById("expense-list").prepend(li);

  const sign = tx.type === 'income' ? '+' : '-';
    const colorStyle = tx.type === 'income' ? 'style="color:#2a9d8f"' : 'style="color:#e63946"';

    const categoryLabel = tx.category || tx.type;

   li.innerHTML = `
        <div class="expense-title">${escapeHtml(tx.title)}</div>
        <div class="expense-category" style="font-size:12px;color:#666">${escapeHtml(categoryLabel)}</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <div class="expense-amount" ${colorStyle} style="font-weight:700">${sign}₦${tx.amount}</div>
      <button class="delete-btn" data-id="${tx.id}" aria-label="Delete" title="Delete">✕</button>
    </div>
        `;
expenseList.appendChild(li);

const delBtn = li.querySelector('.delete-btn');
delBtn.addEventListener('click', () => {
  transactions = transactions.filter(t => t.id !== tx.id);
  saveTransactions();
  renderTransactions();
  updateDashboard();
})
};


 expenseForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const type = document.getElementById('type').value;
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    
     
     e.target.reset();
     document.getElementById('expense-modal').style.display = 'none';

    const li = document.createElement('li');
    li.classList.add('expense-item');

    if(category.toLowerCase() === 'income'){
       income += amount;
        cashBalance += amount;

        li.innerHTML= `
        <span class = "espense-title">${title}</span>
        <span class = "expense-category">${category}</span>
        <span class = "expense-amount style = "color:green"  income">+₦${amount}</span>
        `;
    }else{
      expenses += amount;
      cashBalance -= amount;

      li.innerHTML = `
         <span class="expense-title">${title}</span>
            <span class="expense-category">${category}</span>
            <span class="expense-amount" style = "color:red">-₦${amount}</span>
        `;
    }
    
const categorySelect = document.getElementById("category");

categorySelect.addEventListener("change", () => {
  categorySelect.classList.remove("income", "expense");
  if (categorySelect.value.toLowerCase() === "income") {
    categorySelect.classList.add("income");
  } else if (categorySelect.value.toLowerCase() === "expense") {
    categorySelect.classList.add("expense");
  }
});

   
const tx = {
  id: Date.now(),
  title,
  category,
  amount,
  type: category.toLowerCase() === "income" ? "income" : "expense",
};

transactions.push(tx);
saveTransactions();
renderTransactions();
updateDashboard();

    expenseForm.reset();
    modal.style.display = 'none';

 });

 function renderTransactions() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = ''; 

  const sorted = [...transactions].sort((a, b) => b.id - a.id);
  for (const tx of sorted) addTransactionToList(tx);
}

document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      transactions = JSON.parse(stored);
      console.log("Restored transactions:", transactions);
    } catch (err) {
      console.error("Error parsing saved data:", err);
      transactions = [];
    }
  } else {
    console.log("No saved transactions found");
  }

  renderTransactions();
  updateDashboard();
});

