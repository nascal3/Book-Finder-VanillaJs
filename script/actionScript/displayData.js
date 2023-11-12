
// Import the book data from the external dummy data books JSON file
async function fetchBooksData() {
    const response = await fetch('script/actionScript/books.json');
    const data = await response.json();
    return data.books;
}

async function generateTable() {
    const headerRow = document.getElementById('headerRow');
    const tableBody = document.getElementById('tableBody');

    // Fetch book data from the external JSON file
    const booksData = await fetchBooksData();

    // Create table headers
    for (const key in booksData[0]) {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
    }

    // Create table rows and cells
    booksData.forEach(book => {
        const row = tableBody.insertRow();
        for (const key in book) {
            const cell = row.insertCell();
            cell.textContent = key === 'year' ? parseInt(book[key]) : book[key];
        }
    });
}

generateTable();