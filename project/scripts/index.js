const linesList = [];

const getLines = async () => {
    try {
        const response = await fetch('./data/lines.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const lines = await response.json();

        linesList.push(...lines);
    } catch (error) {
        console.error('Error fetching lines:', error);
    }
}

// Function to populate the existing lines
const populateLines = () => {
    const ul = document.getElementById('lineList');

    ul.innerHTML = '';

    lines.forEach(line => {
        const a = document.createElement('a');
        const li = document.createElement('li');

        a.innerText = `Line ${line.id}`;
        a.setAttribute('href', line.address);

        a.addEventListener('click', toggleActiveClass)

        li.appendChild(a);
        ul.appendChild(li);
    });


    const img = document.createElement('img');
    img.setAttribute('src', 'images/square-plus-solid.svg');
    img.setAttribute('alt', 'Site Logo');
    img.setAttribute('width', '20');
    img.setAttribute('loading', 'lazy');

    const addButton = document.createElement('a');
    addButton.setAttribute('href', 'login.html');

    // addButton.textContent = 'Add New Line';

    const addListButton = document.createElement('li');
    addListButton.appendChild(addButton);
    addButton.appendChild(img);
    addButton.appendChild(document.createTextNode('Add New Line'));

    ul.appendChild(addListButton);
}

const changeIframeSrcByLine = (line) => {
    const lineAddress = lines.filter(l => l.id == line.split(' ')[1])

    const iframe = document.getElementById('busStopAddress');
    iframe.setAttribute('src', lineAddress[0].address);
}

// Function makes the effect of lines list button extending to the map
const toggleActiveClass = (e) => {
    e.preventDefault();

    const tagA = e.target;
    const oldTagA = document.getElementsByClassName('active');
    if (oldTagA.length > 0) oldTagA[0].removeAttribute('class');
    tagA.setAttribute('class', 'active');

    changeIframeSrcByLine(oldTagA[0].innerText)
}


// Main
let lines = [];

try {
    lines = JSON.parse(localStorage.getItem('lines'));
}
catch (error) {
    console.log('Error parsing lines from localStorage:', error);
}
finally {
    if (lines == null) {
        console.log('Sending request to get lines...');
        getLines().then(() => {
            localStorage.setItem('lines', JSON.stringify(linesList));
            lines = linesList;
            populateLines();
        });
    }
    populateLines();
}

