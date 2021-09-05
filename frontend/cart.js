let cart = document.querySelector(".cart_filled_details");
let copyLocalStorage = JSON.parse(localStorage.getItem("articles")); //copier le tableau local storage

main(); //function call

function main() {
    viewCart();
    totalOfCart();
    forEmptyCart();
    submitForm();
    validEmail();
}

function viewCart() {
    let filledCart = document.querySelector(".cart_filled");
    let ifempty = document.querySelector(".empty_cart_case"); //vider le panier
    let totalTest = document.querySelector(".total");
    let emptyCart = document.querySelector(".cart_empty"); //si le panier est vide
    let orderCart = document.querySelector(".cart_order"); //form
    let filledCartDetails = document.querySelector(".cart_filled_details");

    // si il ya un objet dans localstorage => afficher dans l'emplacement cree et masquer element .cart_empty
    if (localStorage.getItem("articles")) {
        filledCart.style.display = "flex";
        filledCart.style.flexDirection = "column";
        filledCart.style.justifyContent = "space-between";
        filledCart.style.backgroundColor = "white";
        filledCart.style.padding = "2%";
        filledCart.style.margin = "3%";
        filledCart.style.width = "75%";
        emptyCart.style.display = "none";
    } else { 
        orderCart.style.display = "none";
        filledCartDetails.style.display ="none";
        filledCart.style.height = "85vh";
    }

    //creer emplacement pour les donnees recu du tableau localstorage
    for (let article in copyLocalStorage) {
        let productInCart = document.createElement("div");
        cart.insertBefore(productInCart, ifempty);  //bouton vider le panier aavnt les produits dans le panier
        cart.insertBefore(totalTest, ifempty); //total avant le bouton vider panier
        productInCart.classList.add("cart_filled_informationsjs", "classStyle");

        let productName = document.createElement("div");
        productInCart.appendChild(productName);
        productName.classList.add("cart_filled_informations_titlejs", "classStyle");
        productName.innerHTML = copyLocalStorage[article].name;

        let productQuantity = document.createElement("div");
        productInCart.appendChild(productQuantity);
        productQuantity.classList.add("cart_filled_informations_quantityjs", "classStyle" );
        productQuantity.innerHTML = copyLocalStorage[article].quantity;

        let productPrice = document.createElement("div");
        productInCart.appendChild(productPrice);
        productPrice.classList.add("cart_filled_informations_pricejs","classStyle",);
        productPrice.price = copyLocalStorage[article].price;

        productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(copyLocalStorage[article].price * copyLocalStorage[article].quantity);
        //reformater prix +  calculer total de plusieurs quantitees
    }
}

//fonction pour total du panier!!!!!
function totalOfCart() {
    let arrayForPrice = [];
    console.log(arrayForPrice);
    let priceTotal = document.querySelector(".total");
    let pushEachPriceToArray = document.querySelectorAll(".cart_filled_informations_pricejs");
    let pushEachQuantityToArray = document.querySelectorAll(".cart_filled_informations_quantityjs");

    for (let m in pushEachPriceToArray) {
        arrayForPrice.push(pushEachPriceToArray[m].price);
        arrayForPrice.push(pushEachQuantityToArray[m].quantity); 
    }

    let newArrayForPrice = arrayForPrice.filter((x) => { //enlever les undefined du array => creer un nouvel array pour trier les undefined
        return x !== undefined;
    });
    console.log(newArrayForPrice);

    //newArrayForPrice.map((pushEachPriceToArray) => parseInt(pushEachPriceToArray));  //transformer en nombre tout les valeurs du tableau
   
    const reducerTest = (accumulator, currentVal) => accumulator + currentVal;  //additionner le nombre total
    let totalTest = newArrayForPrice.reduce(reducerTest);
    console.log(totalTest);

    priceTotal.innerText = `Total : ${(totalTest)} €`;
  
}

//fonction: evenement pour vider le panier au click!
function forEmptyCart() {
const btnForEmptyCart = document.querySelector(".empty_cart_btn");
btnForEmptyCart.addEventListener("click", () => {
    localStorage.clear();
});
}

//fonction pour soumettre le formulaire
function submitForm () {
    const submit = document.querySelector("#submit"); 
    let inputName = document.querySelector("#name");
    let inputLastname = document.querySelector("#lastname");
    let inputMail = document.querySelector("#mail");
    let inputStreet = document.querySelector("#street");
    let inputCity = document.querySelector("#city");
    let inputPostal = document.querySelector("#postal");
    let ifError = document.querySelector(".error_case");

    //au click si un champs n'est pas renseigner.. 
    submit.addEventListener("click", (e) => {
        if (
            !inputName.value ||
            !inputLastname.value ||
            !inputMail.value ||
            !inputStreet.value ||
            !inputCity.value ||
            !inputPostal.value 
        )
        
        {
            ifError.innerHTML = "Renseigner tout les champs!"; //..alors afficher message d'erreur
            e.preventDefault();
        }  
        
        else { 
            let boughtArticles = []; //tableau des produits acheter
            boughtArticles.push(copyLocalStorage);
            //tableau + objets infos 
            const order = { //check backend /controllers/ camera.js
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastname.value,
                    adress: inputStreet.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: boughtArticles,
            };

            //requete post au backend!
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json"},
            };

            //formater prix pour l'affichage
            let totalConfirmation = document.querySelector(".total").innerText;
            totalConfirmation = totalConfirmation.split(" :");

            //envoi de la requete vers la page de confirmation
            fetch("http://localhost:3000/api/cameras/order", options)
            .then((Response) => Response.json())
            .then((data) => {
                localStorage.clear();
                console.log(data)
                localStorage.setItem("orderId", data.orderId);
                localStorage.setItem("total", totalConfirmation[1]);
                //verifier le statut de la requete
                document.location.href = "confirmation.html";
            })
        }
    });
}

//-----------------REGEXP--------------------------
let form = document.querySelector('.order_form');
//console.log(form.user_mail);

//ajouter addeventlistener pour ecouter les changements
form.user_mail.addEventListener('change', function() {
    validEmail(this);
});

//creer fonction validEmail
const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    //console.log(testEmail);
    let small = inputEmail.nextElementSibling;

    if (testEmail) {
        small.innerHTML = 'Email valide!';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = 'Email non valide!';
        small.classList.add('text-danger');
        small.classList.remove('text-success');
    }
};
console.log("ok!");