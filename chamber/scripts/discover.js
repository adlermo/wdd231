/*
 * 
 * Fetching the list of places to discover from data/places.json
 * and displaying them in the UI
 */
// Fetch the places data from the JSON file
const fetchPlaces = async () => {
    const placesUrl = './data/places.json';

    try {
        const response = await fetch(placesUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

// Initialize an empty array to hold the places
const displayPlaces = async () => {
    // Call the fetch function to get the places data
    const places = await fetchPlaces();

    const placesList = document.getElementById('places');

    places.forEach(place => {
        const placeItem = document.createElement('div');

        placeItem.classList.add('place-card');
        placeItem.innerHTML = `
            <h2>${place.name}</h2>

            <div>
                <figure>
                    <img src="${place.image}" alt="${place.name}">
                </figure>
                <p>${place.description}</p>
                <address>${place.address}</address>
            </div>

            <button>Learn More</button>
        `;

        placesList.append(placeItem);
    });
}

// Call the display function to show the places on the page
displayPlaces();


/* 
 * 
 * Handling local storage for the last connection time
 */

// Get the sidebar content area
const sidebarContent = document.getElementById('sidebar');

// Get the current date
const currentDate = Date.now();

// Retrieve the last visit date from localStorage
const lastVisit = localStorage.getItem('lastVisit');

// Function to calculate the difference in days
const calculateDaysDifference = (current, previous) => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((current - previous) / millisecondsPerDay);
};

let message = '';

// Check if this is the user's first visit
if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const daysDifference = calculateDaysDifference(currentDate, parseInt(lastVisit));

    if (daysDifference < 1) {
        message = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysDifference} days ago.`;
    }
}

// Display the message in the sidebar content area
sidebarContent.textContent = message;

// Update the last visit date in localStorage
localStorage.setItem('lastVisit', currentDate);
