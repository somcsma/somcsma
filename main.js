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

export const pantrySchedule = [
    {position: 0, date: "2025-12-17", time: "10:30 AM", day: "Wednesday"},
    {position: 1, date: "2025-12-18", time: "9:30 AM", day: "Thursday"},
    {position: 2, date: "2025-12-19", time: "12:00 PM", day:"Friday"},
    {position: 3, date: "2025-12-24", time: "CLOSED", day: "Wednesday"},
    {position: 4, date: "2025-12-25", time: "CLOSED", day: "Thursday"},
    {position: 5, date: "2025-12-26", time: "12:00 PM", day:"Friday"},
    {position: 6, date: "2025-12-31", time: "10:30 AM", day: "Wednesday"},
    {position: 7, date: "2026-01-01", time: "CLOSED", day: "Thursday"},
    {position: 8, date: "2026-01-02", time: "12:00 PM", day:"Friday"},]

