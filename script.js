 function  selectCategory(element){
        document.querySelectorAll('.category').forEach(cat => {
            cat.classList.remove('selected')
        })

        element.classList.add('selected');
    }

    document.getElementById('float-btn').addEventListener('click', () => {
        alert('new expense clicked')
    })