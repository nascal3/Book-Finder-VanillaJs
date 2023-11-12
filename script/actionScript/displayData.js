// Import the book data from the external dummy data books JSON file
async function fetchBooksData() {
    const response = await fetch('script/actionScript/books.json');
    const data = await response.json();
    return data.books;
}

// Sorting configuration
let isTitleAsc = true;
let isYearAsc = true;

//Temp holder array to store the books data to
// avoid mutating the original array data
let booksData = [];

let originalBooksData = [];

//Create the table and populate data into it
async function generateTable() {
    const headerRow = document.getElementById('headerRow');

    // Fetch original book data from the external JSON file
    originalBooksData = await fetchBooksData();
    booksData = [...originalBooksData];

    // Create table headers
    for (const key in booksData[0]) {
        const th = document.createElement('th');
        th.textContent = key;

        // Add sort icons for "title" and "year" headers
        if (key === 'title' || key === 'year') {
            th.innerHTML += '&nbsp;<i class="material-icons">sort</i>';

            // Add click event listener to the header for sorting
            th.addEventListener('click', () => {
                sortData(key);
                renderTable();
            });
        }

        headerRow.appendChild(th);
        renderTable();
    }
}

// Sort the data based on the sorting configuration
function sortData(key) {
    booksData.sort((a, b) => {
        const valueA = a[key].toUpperCase();
        const valueB = b[key].toUpperCase();

        if (key === 'title') {
            return isTitleAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (key === 'year') {
            return isYearAsc ? parseInt(valueB) - parseInt(valueA) : parseInt(valueA) - parseInt(valueB);
        }

        return 0;
    });

    // Toggle sorting direction for the next click
    if (key === 'title') {
        isTitleAsc = !isTitleAsc;
    } else if (key === 'year') {
        isYearAsc = !isYearAsc;
    }
}

// Render the table with the books data to screen
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Create table rows and cells
    booksData.forEach(book => {
        const row = tableBody.insertRow();
        for (const key in book) {
            const cell = row.insertCell();
            cell.textContent = book[key];
        }
    });
}

//Function called to filter/search the data in the table
function filterTable() {
    const searchTerm = document.getElementById('search').value.toLowerCase();

    const filteredData = originalBooksData.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );

    // Update the booksData with the filtered data
    booksData = [...filteredData];
    renderTable();
}

// Run the function
generateTable().then()

