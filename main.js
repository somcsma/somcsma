document.addEventListener('DOMContentLoaded', () => {
    const resourceButtons = document.querySelectorAll(".filter-button");
    const cards = document.querySelectorAll('.card');

    resourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            resourceButtons.forEach(button => {
                button.classList.remove('button-clicked');
            })
            button.classList.add('button-clicked');
            console.log("button clicked");
            const selectedCategory = button.dataset.filter;
            console.log(selectedCategory);

            cards.forEach(card => {
                if(selectedCategory == 'all' || card.dataset.filter === selectedCategory){
                    card.classList.remove('hidden');
                    console.log("displaying...");
                } else {
                    card.classList.add('hidden');
                    console.log("hiding...");
                }
            })
        })
    })
})

console.log("is working");