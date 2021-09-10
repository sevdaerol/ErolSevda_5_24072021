main();

function main() {
    displayConfirmationPage();
}

//fonction pour afficher le prix et l'order id
function displayConfirmationPage() {
    const totalConfirmationPage = document.querySelector(".total span");
    const orderId = document.querySelector(".orderId span");

    totalConfirmationPage.innerText = localStorage.getItem("total");
    orderId.innerText = localStorage.getItem("orderId");

    //vider le local storage pour recommander
    localStorage.clear();
}
console.log("ok!");