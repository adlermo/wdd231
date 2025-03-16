// Description: This file contains the code to display the members of the chamber in a grid or list view.

// Display members function
const displayMembers = (members) => {
    const display = document.querySelector("article");
    display.innerHTML = "";
    members.forEach(member => {
        const memberCard = document.createElement("section");
        memberCard.classList.add("member");
        memberCard.innerHTML = `
            <img src="images/${member.logo}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
        `;
        display.appendChild(memberCard);
    });
};

// Request to members of the chamber in ../data/members.json
fetch("https://adlermo.github.io/wdd231/chamber/data/members.json").then(response => {
    return response.json();
}).then(data => {
    displayMembers(data);
}).catch(error => {
    console.log(error);
});

// Toggle between grid and list view function

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}
