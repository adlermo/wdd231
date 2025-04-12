const goldLinkTag = document.getElementById("gold");
const silverLinkTag = document.getElementById("silver");
const bronzeLinkTag = document.getElementById("bronze");
const nonprofitLinkTag = document.getElementById("nonprofit");

const membershipDialog = document.getElementById("membership-dialog");

const openDialog = () => {
    membershipDialog.showModal();
};

const closeDialog = () => {
    membershipDialog.close();
}

document.getElementById("close-dialog")
    .addEventListener("click", closeDialog);
// Above event listeners for the close button

// Setting timestamp value
document.getElementById("timestamp")
    .value = new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });

const title = document.getElementById("dialog-title");
const description = document.getElementById("dialog-description");
const benefits = document.getElementById("dialog-benefits");

const createDialogContent = (titleText, descriptionText, benefitsText) => {
    title.textContent = titleText;
    description.textContent = descriptionText;

    benefits.innerText = `Benefits of the ${titleText}`; // Clear previous benefits

    // Create a new list of benefits
    for (let benefit of benefitsText) {
        const li = document.createElement("li");
        benefits.append(li);
        li.textContent = benefit;
    }

};

// Adding event listeners for each membership dialog link
goldLinkTag.addEventListener("click", () => {
    // Open gold dialog
    openDialog();
    createDialogContent(
        "Gold Membership",
        "Gold membership includes access to all events and resources.",
        ["Access to exclusive events", "Networking opportunities", "Discounts on services"]
    );
});

silverLinkTag.addEventListener("click", () => {
    // Open silver dialog
    openDialog();
    createDialogContent(
        "Silver Membership",
        "Silver membership includes access to most events and resources.",
        ["Access to most events", "Networking opportunities"]
    );
});

bronzeLinkTag.addEventListener("click", () => {
    // Open bronze dialog
    openDialog();
    createDialogContent(
        "Bronze Membership",
        "Bronze membership includes access to basic events and resources.",
        ["Access to basic events"]
    );
});

nonprofitLinkTag.addEventListener("click", () => {
    // Open nonprofit dialog
    openDialog();
    createDialogContent(
        "Nonprofit Membership",
        "Nonprofit membership includes access to all events and resources at a discounted rate.",
        ["Access to all events", "Networking opportunities", "Discounts on services"]
    );
});