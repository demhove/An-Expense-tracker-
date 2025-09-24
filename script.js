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

expenseForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    console.log("Title:", title);
    console.log('Amount:', amount);
    console.log('Category:', category);
});

