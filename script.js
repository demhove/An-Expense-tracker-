  let income = 0;
  let expenses = 0;
  let cashBalance = 1400;

  function updateDashboard() {
    document.getElementById("income").textContent = `₦${income}`;
    document.getElementById("expenses").textContent = `₦${expenses}`;
    document.getElementById("balance").textContent = `₦${cashBalance}`;
  }; 
  updateDashboard();


 
 function  selectCategory(element){
        document.querySelectorAll('.category').forEach(cat => {
            cat.classList.remove('selected')
        })

        element.classList.add('selected');
    }

    document.getElementById('add-btn').addEventListener('click', () => {
             alert('Add new expense clicked!');
});



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

console.log("Expense list element:", expenseList);



 expenseForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);


    const li = document.createElement('li');
    li.classList.add('expense-item');

    if(category.toLowerCase() === 'income'){
       income += amount;
        cashBalance += amount;

        li.innerHTML = `
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
    

    expenseList.appendChild(li);
        updateDashboard();


    expenseForm.reset();
    modal.style.display = 'none';

 });

 

 
