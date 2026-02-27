const container = document.querySelector("#events-container");
const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const sortingFilter = document.querySelector("#sorting-filter");
let myLineup = [];

const favButton = document.createElement("button");
favButton.classList.add("favourite-button");
favButton.textContent = "My Favourites";
document.body.prepend(favButton);

favButton.addEventListener("click", function(){
    renderEvents(myLineup);
})



function createCategoryFilter() {
    let categories = [];

    categoryFilter.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Category";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    categoryFilter.appendChild(defaultOption);

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All";
    categoryFilter.appendChild(allOption);

    for (let i = 0; i < events.length; i++) {
        if (!categories.includes(events[i].category)) {
            categories.push(events[i].category);

            const option = document.createElement("option");
            option.value = events[i].category;
            option.textContent = events[i].category;

            categoryFilter.appendChild(option);
        }
    }
}

function createSortingFilter() {

    sortingFilter.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select sorting option";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    const byDay = document.createElement("option");
    byDay.value = "day";
    byDay.textContent = "Sort by Day";

    const byRegistrations = document.createElement("option");
    byRegistrations.value = "registrations";
    byRegistrations.textContent = "Sort by registration numbers";

    sortingFilter.appendChild(byDay);
    sortingFilter.appendChild(byRegistrations);
    sortingFilter.appendChild(defaultOption);
}

function renderEvents(eventsArray){

    container.innerHTML = "";

    if (eventsArray.length === 0) {
        const notFoundMsg = document.createElement("h2");
        notFoundMsg.classList.add("not-found-msg");
        notFoundMsg.textContent = "Sorry couldn't find any event :(";
        container.appendChild(notFoundMsg);
        return;
    }

    for(let i = 0; i < eventsArray.length; i++){
        const event = eventsArray[i];

        const card = document.createElement("div");
        card.classList.add("event-card");

        
        const bookmarkBtn = document.createElement("img");
        bookmarkBtn.classList.add("bookmark-button");
        bookmarkBtn.src = "Bookmark - unchecked.png";
        let marked = 0;

        bookmarkBtn.addEventListener("click", function(){

            const index = myLineup.indexOf(event);

            if (index === -1) {
                bookmarkBtn.src = "Bookmark - checked.png";
                myLineup.push(event);
            } else {
                bookmarkBtn.src = "Bookmark - unchecked.png";
                myLineup.splice(index, 1);
            }

        })


        const title = document.createElement("h2");
        title.textContent = event.name;

        const category = document.createElement("p");
        category.textContent = event.category;

        const time = document.createElement("p");
        time.textContent = "Time: "+ event.time;

        const venue= document.createElement("p");
        venue.textContent = "Venue: "+ event.venue;

        const day = document.createElement("p");
        day.textContent = "Day: "+ event.day;

        const registrations = document.createElement("p");
        registrations.textContent = "Registrations: "+ event.registrations;

        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(time);
        card.appendChild(venue);
        card.appendChild(day);
        card.appendChild(registrations);
        card.appendChild(bookmarkBtn);

        container.appendChild(card);
   }

}

function applyFiltersAndSort() {

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value.toLowerCase();
    const selectedSort = sortingFilter.value;

    let filteredEvents = events.filter(function(eventItem) {

        const matchesCategory =
            selectedCategory === "all" ||
            eventItem.category.toLowerCase() === selectedCategory;

        const matchesSearch =
            eventItem.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    if (selectedSort === "day") {
        filteredEvents.sort((a, b) => a.day - b.day);
    }

    if (selectedSort === "registrations") {
        filteredEvents.sort((a, b) => b.registrations - a.registrations);
    }

    renderEvents(filteredEvents);
}

sortingFilter.addEventListener("change", applyFiltersAndSort);
categoryFilter.addEventListener("change", applyFiltersAndSort);
searchInput.addEventListener("input", applyFiltersAndSort);


createSortingFilter();
createCategoryFilter();
renderEvents(events);






