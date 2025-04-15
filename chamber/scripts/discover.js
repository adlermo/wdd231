/* 
 * 
 * Handling local storage for the last connection time
 */

// Save client last connection time in local storage
const lastConnectionTime = new Date().toISOString();
localStorage.setItem('lastConnectionTime', lastConnectionTime);

// Get the last connection time from local storage
const lastConnectionTimeFromStorage = localStorage.getItem('lastConnectionTime');

// Parse the last connection time to a Date object
const lastConnectionDate = new Date(lastConnectionTimeFromStorage);

// Get the current time
const currentTime = new Date();

// Calculate the difference in milliseconds
const timeDifference = currentTime - lastConnectionDate;

// Convert the difference to minutes
const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));

// Check if the difference is within same day
if (lastConnectionDate.toDateString() === currentTime.toDateString()) {
    // If the difference is within the same day, do not clear local storage
    console.log("Local storage will not be cleared today.");
}


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