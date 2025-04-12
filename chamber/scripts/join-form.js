// Retrieving data from the URL parameters
const searchParams = new URLSearchParams(window.location.search);

// and displaying it in the HTML elements
document.getElementById('display-first-name')
    .textContent = searchParams.get('first-name') || 'N/A';

document.getElementById('display-last-name')
    .textContent = searchParams.get('last-name') || 'N/A';

document.getElementById('display-organization-title')
    .textContent = searchParams.get('organization-title') || 'N/A';

document.getElementById('display-email')
    .textContent = searchParams.get('email') || 'N/A';

document.getElementById('display-phone')
    .textContent = searchParams.get('phone') || 'N/A';

document.getElementById('display-company')
    .textContent = searchParams.get('company') || 'N/A';

document.getElementById('display-membership-type')
    .textContent = searchParams.get('membership-type') || 'N/A';

document.getElementById('display-description')
    .textContent = searchParams.get('description') || 'N/A';

document.getElementById('display-timestamp')
    .textContent = searchParams.get('timestamp') || 'N/A';