let searchInputE = document.getElementById("searchInput");
let searchResultsE = document.getElementById("searchResults");
let messageE = document.getElementById("message");
let spinnerE = document.getElementById("spinner");
let containerE = document.querySelector(".container");

function displayMessage(message, isError = false) {
    messageE.textContent = message;
    messageE.style.color = isError ? 'red' : 'green';
    containerE.style.backgroundColor = isError ? '#FFD6D6' : '#C6F6D5';
}

function displayResults(search_results) {
    searchResultsE.innerHTML = '';
    if (search_results.length === 0) {
        displayMessage('No results found', true);
    } else {
        displayMessage('Search results:');
        for (let result of search_results) {
            let bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            let image = document.createElement('img');
            image.src = result.imageLink;
            let author = document.createElement('p');
            author.textContent = result.author;
            bookDiv.appendChild(image);
            bookDiv.appendChild(author);
            searchResultsE.appendChild(bookDiv);
        }
    }
}

searchInputE.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerE.classList.remove("d-none");
        searchResultsE.innerHTML = '';
        messageE.textContent = '';
        containerE.style.backgroundColor = '#fff'; // Reset background color
        let value = searchInputE.value.trim();
        let url = "https://apis.ccbp.in/book-store?title=" + value;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const {
                    search_results
                } = data;
                displayResults(search_results);
            })
            .catch(error => {
                displayMessage('Failed to fetch data. Please try again.', true);
            })
            .finally(() => {
                spinnerE.classList.add("d-none");
            });
    }
});