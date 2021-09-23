displayConfirmationPage(); //function call

//fonction pour afficher le prix et l'order id
function displayConfirmationPage() {
    const totalConfirmationPage = document.querySelector(".total span");
    const idOrder = document.querySelector(".orderid span");

    totalConfirmationPage.innerText = localStorage.getItem("total");
    idOrder.innerText = localStorage.getItem("orderId");
    //console.log(idOrder);
}
 //vider le local storage pour recommander
 localStorage.clear();
