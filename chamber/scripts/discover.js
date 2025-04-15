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

// Use Intersection Observer to lazily load images
const lazyLoadImages = (cards) => {
    const images = cards.querySelectorAll('img[data-src]');
    images.forEach(image => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.setAttribute('data-src', image.getAttribute('src'));

        lazyLoad(image);
    });
}

const lazyLoad = (image) => {
    const observer = new IntersectionObserver(
        (image, observer) => {
            image.forEach(entry => {
                if (!entry.isIntersecting) return;
                else {
                    const img = entry.target;

                    img.setAttribute('src', img.getAttribute('data-src'));
                    img.removeAttribute('data-src');

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0,
            rootMargin: '0px 0px 10px 0px',
        }
    );

    observer.observe(image);
}

const displayPlaces = async () => {
    // Call the fetch function to get the places data
    const places = await fetchPlaces();

    const placesList = document.getElementById('places');

    // Add a placeholder image and set data-src for lazy loading
    places.forEach(place => {
        const placeCard = document.createElement('div');

        placeCard.classList.add('place-card');
        placeCard.innerHTML = `
            <h2>${place.name}</h2>

            <div>
                <figure>
                    <img data-src="${place.image}" alt="${place.name}" src="./images/placeholder.webp"
                    width="460" height="400">
                </figure>
                <p>${place.description}</p>
                <address>${place.address}</address>
            </div>

            <button>Learn More</button>
        `;

        placesList.append(placeCard);
    });

    setTimeout(() => {
        lazyLoadImages(placesList);
    }, 800);
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
    message = 'Welcome! Let us know if you have any questions.';
} else {
    const daysDifference = calculateDaysDifference(currentDate, parseInt(lastVisit));

    if (daysDifference < 1) {
        message = 'Back so soon! Awesome!';
    } else if (daysDifference === 1) {
        message = 'You last visited 1 day ago.';
    } else {
        message = `You last visited ${daysDifference} days ago.`;
    }
}

// Display the message in the sidebar content area
sidebarContent.textContent = message;

// Update the last visit date in localStorage
localStorage.setItem('lastVisit', currentDate);
