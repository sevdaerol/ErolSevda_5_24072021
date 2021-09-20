let copyLocalStorage = localStorage; //copier le tableau local storage
console.log(copyLocalStorage);
console.log("nombre dans ls: " + copyLocalStorage.length);

main(); //function call

function main() {
    viewCart();
    forEmptyCart();
   // submitForm();
}
function viewCart() {
    let filledCart = document.querySelector(".cart_filled");
    let emptyCart = document.querySelector(".empty_cart_case"); //vider le panier
    let totalTest = document.querySelector(".total");
    let ifEmpty = document.querySelector(".cart_empty"); //si le panier est vide
    let orderCart = document.querySelector(".cart_order"); //form
    let cart = document.querySelector(".cart_filled_details");
    //le panier au depart = vide 
    let totalCart = 0;
    // si il ya un objet dans localstorage => afficher dans l'emplacement cree et masquer element .cart_empty
    if (copyLocalStorage.length > 0) { //si le contenue du local storage est superieur a 0
        console.log("le panier est non vide");
        filledCart.style.display = "flex";
        filledCart.style.flexDirection = "column";
        filledCart.style.justifyContent = "space-between";
        filledCart.style.backgroundColor = "white";
        filledCart.style.padding = "2%";
        filledCart.style.margin = "3%";
        filledCart.style.width = "75%";
        ifEmpty.style.display = "none";
        //creer emplacement pour les donnees recu du tableau localstorage
        for (let article = 0; article < copyLocalStorage.length; article++) {
            //for (let article in copyLocalStorage) {
            console.log(article);
            let productInCart = document.createElement("div");
            cart.insertBefore(productInCart, emptyCart);  //bouton vider le panier avant les produits dans le panier
            cart.insertBefore(totalTest, emptyCart); //total avant le bouton vider panier
            productInCart.classList.add("cart_filled_informationsjs", "classStyle");

            let articleKey = copyLocalStorage.key(article); //recuperer la cle = id du produit
            let articleInfos = JSON.parse(copyLocalStorage.getItem(articleKey));
            console.log(articleInfos);
            //console.log("nom article: " + articleInfos.name);

            let productName = document.createElement("div");
            productInCart.appendChild(productName);
            productName.classList.add("cart_filled_informations_titlejs", "classStyle");
            productName.innerHTML = articleInfos.name;
            console.log("name: " + productName.innerHTML);

            let productQuantity = document.createElement("div");
            productInCart.appendChild(productQuantity);
            productQuantity.classList.add("cart_filled_informations_quantityjs", "classStyle" );
            productQuantity.innerHTML = articleInfos.quantity;
            console.log("quantity: " + productQuantity.innerHTML);

            let productPrice = document.createElement("div");
            productInCart.appendChild(productPrice);
            productPrice.classList.add("cart_filled_informations_pricejs","classStyle",);
            productPrice.price = articleInfos.price;
            productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(articleInfos.price * articleInfos.quantity);
            //reformater prix +  calculer total de plusieurs quantitees
            console.log("price: " + productPrice.innerHTML);
            //le nouveau total dans le panier
            totalCart =
                //total deja dans le panier + l'article recuperee x la quantite
                totalCart + articleInfos.quantity * articleInfos.price;
        }
        console.log("le total du panier: " + totalCart);
        //formater l'affichage du prix total
        totalCart = new Intl.NumberFormat("fr-FR", {style: "currency",currency: "EUR",}).format(totalCart);
        console.log(totalCart);
        //affichage total 
        let priceTotal = document.querySelector(".total");
        priceTotal.innerText = `Total : ${(totalCart)}`;
        console.log(priceTotal.innerText);
    }//si local storage est vide afficher message .cart_empty
    else {
        console.log("le panier est vide");
        orderCart.style.display = "none";
        cart.style.display ="none";
        filledCart.style.height = "85vh";
        ifEmpty.style.display = "display";
    }
}

//fonction: evenement pour vider le panier au click!
function forEmptyCart() {
const btnForEmptyCart = document.querySelector(".empty_cart_btn");
btnForEmptyCart.addEventListener("click", () => {
    localStorage.clear();
});
}


//fonction pour soumettre le formulaire
//function submitForm () {
    const submit = document.querySelector("#submit");
    let ifError = document.querySelector(".error_case");

    //ecouter le click.. 
    submit.addEventListener("click", (e) => { 
     //e.preventDefault();
//******recuperation des values du formulaires pour la validation
        let inputName = copyLocalStorage.setItem("name", document.querySelector("#name").value);
        let inputLastname = copyLocalStorage.setItem("lastname", document.querySelector("#lastname").value);
        let inputMail = copyLocalStorage.setItem("mail", document.querySelector("#mail").value);
        let inputStreet = copyLocalStorage.setItem("street", document.querySelector("#street").value);
        let inputCity = copyLocalStorage.setItem("city", document.querySelector("#city").value);
        let inputPostal = copyLocalStorage.setItem("postal", document.querySelector("#postal").value);
        console.log(inputName);
        
        //si les values du formulaire sont valide alors envoyer la requete
        if (inputName && inputLastname && inputMail && inputStreet && inputCity && inputPostal) {
             
            //******tableau du produit a envoyer au serveur
            let boughtArticles = []; 
            boughtArticles.push(copyLocalStorage);
            console.log(boughtArticles);
            
            //******objet contact
            const contact = {
            firstName: copyLocalStorage.getItem("name"),
            lastName: localStorage.getItem("lastname"),
            adress: localStorage.getItem("street"),
            city: localStorage.getItem("city"),
            email: localStorage.getItem("mail"),
            }
            console.log(contact);
            
            //******objet de contact et produit a envoyer au serveur
            const ordered = { 
                contact,
                products : boughtArticles,
            };
            console.log(ordered);

            //envoi de l'objet vers le serveur
            const promise1 = fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            body: JSON.stringify(ordered),
            headers: {
                "Content-Type" : "application/json",
            },
            });
            console.log(promise1);

            const promise2 = fetch("http://localhost:3000/api/cameras/order")
            promise2.then(async (response)=>{
                try{
                    console.log(promise2);
                    const dataSurServeur = await response.json()
                    console.log("dataSurServeur");
                    console.log(dataSurServeur);
                } catch(e){
                    console.log(e);
                }
            })
            console.log(promise2);
            console.log("je suis dans if");
        }else {
            ifError.innerHTML = "Erreur!";
            console.log("je suis dans else");
        }
    });
//}

//*****************
       /* if (
            !inputName ||
            !inputLastname ||
            !inputMail ||
            !inputStreet ||
            !inputCity ||
            !inputPostal
        ) { 
            console.log("je suis passer dans then");
            ifError.innerHTML = "Renseigner tout les champs!"; //..alors afficher message d'erreur
           // e.preventDefault();} 

        } else { 
            //console.log("je suis passer dans else");
            //let boughtArticles = []; 
            //boughtArticles.push(copyLocalStorage);
            //console.log(boughtArticles);
            //console.log("nombreElementba: " + boughtArticles.length);
        }

        //pour voir le resultat du serveur dans la console
            promise.then(async(response) => {
                try{
                    console.log(response);
                    const contenu = await response.json();
                    console.log(contenu);
                    if(response.ok){
                        console.log(`resultat response ok: ${response.ok}`);

                        //recuperer id du response du serveur
                        console.log(contenu._idd)
                        //mettre cette id dans localstorage avec cle responseId 
                        localStorage.setItem("responseId", contenu._idd);
                        //mettre le prix dans localstorage
                        let totalConfirmation = document.querySelector(".total").innerText;
                        totalConfirmation = totalConfirmation.split(" :");
                        localStorage.setItem("total", totalConfirmation[1]);
                        //aller vers la apge confirmation commande
                        document.location.href = "confirmation.html";
                    }else{
                        console.log(`resultat du serveur: ${response.status}`)
                    };
                }catch(e){
                    console.log(e);
                }
            })*/
       


//-----------------REGEXP--------------------------
let form = document.querySelector('.order_form');
//console.log(form.user_mail);
//ajouter addeventlistener pour ecouter les changements
form.user_name.addEventListener('change', function() {
    validName(this);
});
form.user_lastname.addEventListener('change', function() {
    validLastName(this);
});
form.user_mail.addEventListener('change', function() {
    validEmail(this);
});
form.user_street.addEventListener('change', function() {
    validStreet(this);
});
form.user_city.addEventListener('change', function() {
    validCity(this);
});
form.user_postal.addEventListener('change', function() {
    validPostal(this);
});
//fonction pour valider prenom
const validName = function (inputName) {
    let nameRegExp = new RegExp(/^[a-zA-Z ,.'-]+$/);
    let small = inputName.nextElementSibling;
    //On teste l'expression regulière
  if (nameRegExp.test(inputName.value)) {
    small.innerHTML = "Prénom Valide!";
    small.classList.add("text-success");
    small.classList.remove("text-danger");
    return true;
  } else {
    small.innerHTML = "Prénom non valide!";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};
//valide nom
const validLastName = function (inputLastname) {
    let LastNameRegExp = new RegExp(/^[a-zA-Z ,.'-]+$/);
    let small = inputLastname.nextElementSibling;
    //On teste l'expression regulière
  if (LastNameRegExp.test(inputLastname.value)) {
    small.innerHTML = "Nom Valide!";
    small.classList.add("text-success");
    small.classList.remove("text-danger");
    return true;
  } else {
    small.innerHTML = "Nom non valide!";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};
//valider email
const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    //console.log(testEmail);
    let caseEmail = inputEmail.nextElementSibling;
    if (testEmail) {
        caseEmail.innerHTML = 'Email valide!';
        caseEmail.classList.remove('text-danger');
        caseEmail.classList.add('text-success');
    } else {
        caseEmail.innerHTML = 'Email non valide!';
        caseEmail.classList.add('text-danger');
        caseEmail.classList.remove('text-success');
    }
};
//Valider Rue
const validStreet = function (inputStreet) {
    let StreetRegExp = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
    let small = inputStreet.nextElementSibling;
    //On teste les expressions regulière
  if (StreetRegExp.test(inputStreet.value)) {
    small.innerHTML =  "Adresse Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
  } else {
    small.innerHTML = "Adresse non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
  }
};
//valider ville
const validCity = function (inputCity) {
    let CityRegExp = new RegExp(/^[a-zA-Z',.\s-]{1,25}$/);
    let small = inputCity.nextElementSibling;
    //On teste les expressions regulière
  if (CityRegExp.test(inputCity.value)) {
    small.innerHTML =  "Adresse Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
  } else {
    small.innerHTML = "Adresse non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
  }
};
//valide codepostal ;;;
const validPostal = function (inputPostal) {
    let PostalRegExp = new RegExp(/^[0-9]{1,25}$/);
    let small = inputPostal.nextElementSibling;
    //On teste les expressions regulière
  if (PostalRegExp.test(inputPostal.value)) {
    small.innerHTML =  "Code postal Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Code postal non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
    return false;
  }
};
