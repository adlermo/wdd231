const getLines = async () => {
    try {
        const response = await fetch('./data/lines.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const lines = await response.json();
        return lines;
    } catch (error) {
        console.error('Error fetching lines:', error);
    }
}

let lines = localStorage.getItem('lines');

if (lines === null || lines.length === 0) {
    lines = getLines()
        .then(data => {
            const lines = data.map(line => {
                return {
                    id: line.id,
                    address: line.address
                }
            });

            localStorage.setItem('lines', JSON.stringify(lines))
            return lines;
        })
} else {
    lines = JSON.parse(lines);
}

localStorage.setItem('lines', JSON.stringify(lines))

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

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', populateLines);

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