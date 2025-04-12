// Retrieving data from the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// and displaying it in the HTML elements
document.getElementById('display-first-name')
    .textContent = urlParams.get('first-name') || 'N/A';

document.getElementById('display-last-name')
    .textContent = urlParams.get('last-name') || 'N/A';

document.getElementById('display-organization-title')
    .textContent = urlParams.get('organization-title') || 'N/A';

document.getElementById('display-email')
    .textContent = urlParams.get('email') || 'N/A';

document.getElementById('display-phone')
    .textContent = urlParams.get('phone') || 'N/A';

document.getElementById('display-company')
    .textContent = urlParams.get('company') || 'N/A';

document.getElementById('display-membership-type')
    .textContent = urlParams.get('membership-type') || 'N/A';

document.getElementById('display-description')
    .textContent = urlParams.get('description') || 'N/A';