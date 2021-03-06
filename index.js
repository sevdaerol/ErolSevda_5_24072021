//function call   
getArticles();

let article = []; //information pour un article dans tableau 
console.log(article);

//lancer le serveur avec node: aller sur le terminal lancer le serveur --> backend - npm install - npm run start - node server 
// Recuperer Api
function getArticles() {
    const getAPI = fetch("http://localhost:3000/api/cameras");

    getAPI
        .then(async (resultsAPI) => {
            console.log(resultsAPI);
            const articles = await resultsAPI.json();
            // console.log("tableauDesArticles: ");
            console.log(articles);
            // afficher dans le DOM
            for (let article in articles) {

                let productCart = document.createElement("div"); //creer nouvel element
                document.getElementById(".products"); //dans celui-la
                products.appendChild(productCart);
                productCart.classList.add("cart_product"); //avec cet class..
                //lien
                let productLink = document.createElement("a"); //creer element pour le lien
                productCart.appendChild(productLink); 
                productLink.href = `product.html?id=${articles[article]._id}`; //inserer le lien de l'article avec le nom de la page produit + point d'interrogation + le nom avce la quelle on va recuperer sur la page prochaine(ici 'id'), pour redirrigee au click 
                productLink.classList.add("article_link"); //avec cet class
                //image
                let productImgDiv = document.createElement("div"); //cree element pour img
                productLink.appendChild(productImgDiv); 
                productImgDiv.classList.add("product_img"); //avec cet class

                let productImg = document.createElement("img"); //element pour img
                productImgDiv.appendChild(productImg);
                productImg.src = articles[article].imageUrl; //inserer l'images
                //description
                let productInfosDiv = document.createElement("div"); //creer element pour englober la description
                productLink.appendChild(productInfosDiv);
                productInfosDiv.classList.add("product_infos");

                let productInfosTitle = document.createElement("div"); //element pour le titre
                productInfosDiv.appendChild(productInfosTitle);
                productInfosTitle.classList.add("product_infos_title");
                productInfosTitle.innerHTML = articles[article].name; //titre avec innerhtml pour inserer du text

                let productInfosPrice = document.createElement("div");//element pour le prix
                productInfosDiv.appendChild(productInfosPrice);
                productInfosPrice.classList.add("product_infos_price");
                productInfosPrice.price = articles[article].price/100;//recuperer la valeur
               
                // methode pour formater le prix 
                //inserer le prix avec la methode; new = objet / intl.numberformat = la classe / paranthese = fonction => format => inserer prix
                productInfosPrice.innerHTML = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR",}).format(productInfosPrice.price);
                console.log("un article: " + articles[article]._id);
            }
        })
        .catch((error) => {
            products.innerHTML = "Une erreur est survenue.R??essayer plustard!";
        })

}