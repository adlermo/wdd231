const linesList = [];

const getLines = async () => {
    try {
        const response = await fetch('./data/lines.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const lines = await response.json();
        console.log(lines);
        linesList.push(...lines);
        console.log(linesList);
    } catch (error) {
        console.error('Error fetching lines:', error);
    }
}

// Function to populate the existing lines
const populateLines = () => {
    const ul = document.getElementById('lineList');

    const addButton = ul.firstElementChild;
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

    ul.appendChild(addButton);
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
    console.log(lines);
}
catch (error) {
    console.log('Error parsing lines from localStorage:', error);

}
finally {
    console.log('Sending request to get lines...');
    getLines().then(() => {
        localStorage.setItem('lines', JSON.stringify(linesList));
        lines = linesList;

        populateLines();
    });
}

