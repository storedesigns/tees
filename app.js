const tshirtData = [
{
    id: 1,
    name: `Blue-Green Triangles, Red-Orange Square`,
    description: 'Triangles in shades of blue and green intersecting with squares in vibrant reds and oranges.',
    price: `$22.99`,
    image: 'images/1.jpg',
    link: 'https://teespring.com/fr/blue-green-triangles-red-ora?pid=2&cid=2397'
},
{
    id: 2,
    name: `I hate everything about you`,
    description: 'Express your bold stance with our tee, featuring the statement "I hate everything about you". A blend of attitude and comfort for those unapologetically candid days.',
    price: `$21.99`,
    image: 'images/2.jpg',
    link: 'https://teespring.com/fr/i-hate-everything-about-you?pid=2&cid=2397'
}
];

const ITEMS_PER_PAGE = 9;
let currentPage = 1;

// ... [Rest of the JavaScript code]

let filteredData = [...tshirtData];

function limitTo100Chars(str, limit) {
    if (str.length > limit) {
        return str.substring(0, limit-3) + "...";
    }
    return str;
}

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    filteredData = tshirtData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    // Reset to the first page after a new search
    currentPage = 1;
    displayTshirts(currentPage);
}

// Update the displayTshirts function to use filteredData instead of tshirtData
function displayTshirts(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const itemsToDisplay = filteredData.slice(start, end); // Use filteredData here

    const tshirtList = document.getElementById('tshirt-list');
    tshirtList.innerHTML = '';

    itemsToDisplay.forEach(item => {
        tshirtList.innerHTML += `
            <a target="_blank" href="${item.link}"><div class="bg-white p-4 rounded shadow">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover mb-4 rounded">
                <h2 class="text-xl mb-2">${limitTo100Chars(item.name, 27)}</h2>
                <p class="text-gray-600 mb-3">${limitTo100Chars(item.description, 100)}</p>
                <p class="text-green-500 font-semibold">${item.price}</p>
            </div></a>
        `;
    });

    displayPagination();
}

// Update the displayPagination function to use filteredData for calculating total pages
function displayPagination() {
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage ? 'active' : '';
        pagination.innerHTML += `
            <button onclick="changePage(${i})" class="px-4 py-2 bg-blue-500 text-white rounded-full ${isActive}">
                ${i}
            </button>
        `;
    }
}


// ... [Rest of the JavaScript code]


function changePage(page) {
    currentPage = page;
    displayTshirts(currentPage);
}

// Initial display
displayTshirts(currentPage);