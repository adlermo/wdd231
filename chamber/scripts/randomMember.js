// Description: This file contains the code to display the members of the chamber in a grid or list view.

// Display members function
const displayMembers = (members) => {
    const display = document.querySelector("article");
    display.innerHTML = "";
    members.forEach(member => {
        const memberCard = document.createElement("section");
        memberCard.classList.add("member");
        memberCard.innerHTML = `
            <img src="images/${member.logo}" alt="${member.name}" width="100%" height="auto">
            <h3>${member.name}</h3>
            <hr>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
        `;
        display.appendChild(memberCard);
    });
};

// Top Random Partners Home Page
const randomMembers = async () => {
    try {
        const response = await fetch("https://adlermo.github.io/wdd231/chamber/data/members.json")
        const data = await response.json();
        const randomMembers = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        displayMembers(randomMembers);
    } catch (error) {
        console.log(error);
    }
}

randomMembers();