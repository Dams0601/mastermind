// Initialisation de l'interface
function start(couleurs){
    for (let j = 0; j<8; j++){
        for (let i=0; i<5; i++){
            let rond = document.createElement("div");
            rond.classList.add("rondVide");
            document.getElementById("top").appendChild(rond);
        }
    }
    for (const element of couleurs){
        let pion = document.createElement("div");
        pion.classList.add("pion");
        pion.setAttribute("id", "pion"+element);
        document.getElementById("bottom").appendChild(pion);
    }
    document.getElementById("pionorange").classList.add("active");
}

function sousListe(liste, deb, fin){
    newListe = []
    for(let i=deb; i<fin; i++){
        newListe.push(liste[i]);
    }
    return newListe
}

function ligneComplete(ele){
    for(let i=0; i<ele.length; i++){
        if (!(ele[i].classList.contains('orange')) && !(ele[i].classList.contains('vert')) && !(ele[i].classList.contains('rouge')) && !(ele[i].classList.contains('bleu')) && !(ele[i].classList.contains('jaune')) && !(ele[i].classList.contains('marron'))){
            return false;
        }
    }
    console.log('Complété');
    return true;
}

function creerCombinaison(couleurs){
    let num1 = Math.floor(Math.random() * (6));
    let num2 = Math.floor(Math.random() * (6));
    let num3 = Math.floor(Math.random() * (6));
    let num4 = Math.floor(Math.random() * (6));
    let num5 = Math.floor(Math.random() * (6));
    
    return [couleurs[num1], couleurs[num2], couleurs[num3], couleurs[num4], couleurs[num5]];

}

function verification(ligne, combinaison){
    let bienplace = 0;
    let malplace = 0;
    let temp = combinaison.slice();

    if (ligne[0].classList.contains(combinaison[0])){
        ligne[0].classList.add("bienplace");
        temp[0] = "x";
        bienplace+=1;
    }
    if (ligne[1].classList.contains(combinaison[1])){
        ligne[1].classList.add("bienplace");
        temp[1] = "x";
        bienplace+=1;
    }
    if (ligne[2].classList.contains(combinaison[2])){
        ligne[2].classList.add("bienplace");
        temp[2] = "x";
        bienplace+=1;
    }
    if (ligne[3].classList.contains(combinaison[3])){
        ligne[3].classList.add("bienplace");
        temp[3] = "x";
        bienplace+=1;
    }
    if (ligne[4].classList.contains(combinaison[4])){
        ligne[4].classList.add("bienplace");
        temp[4] = "x";
        bienplace+=1;
    }

    console.log(ligne, temp);
    for (let i=0; i<ligne.length; i++){
        for (let j=0; j<ligne.length; j++){
            console.log(ligne[i], temp[j], j)
            if (ligne[i].classList.contains(temp[j]) && !(ligne[i].classList.contains("bienplace"))){
                ligne[i].classList.add('malplace');
                temp[j] = "y";
                malplace += 1;
            }
        }
    }
    life-=1;
    if (life==0 || bienplace == 5){
        setTimeout(function() {
            document.getElementById('jeu').style.display = "none";
            document.getElementById('fin').style.display = "flex";
          }, 3000);
    }
}



let couleurs = ["orange", "vert", "bleu", "rouge", "jaune", "marron"];
let life = 8;
start(couleurs);
let combinaison = creerCombinaison(couleurs);
console.log(combinaison);

// Gérer l'activation de la couleur choisi
let buttons =  document.getElementsByClassName('pion');
for (const button of buttons){
    button.addEventListener("click", function() {
        document.getElementsByClassName("active")[0].classList.toggle("active");
        this.classList.toggle("active");
    })
}

let numligne = 0;
let lignes = document.getElementsByClassName('rondVide');

let pionorange = document.getElementById("pionorange");
let pionvert = document.getElementById("pionvert");
let pionbleu = document.getElementById("pionbleu");
let pionjaune = document.getElementById("pionjaune");
let pionrouge = document.getElementById("pionrouge");
let pionmarron = document.getElementById("pionmarron");

for (let i=0; i<lignes.length; i++){
    lignes[i].addEventListener("click", function() {
        let ligne = sousListe(document.getElementsByClassName('rondVide'),numligne*5, (numligne+1)*5);
        if (i>=numligne*5 && i<=(numligne+1)*5){
            if (this.classList.length>1){
                const classeARetirer = this.className.split(' ')[1];
                this.classList.remove(classeARetirer);
            }
            if (pionorange.classList.contains('active')){
                this.classList.toggle("orange");
            }
            else if (pionvert.classList.contains('active')){
                this.classList.toggle("vert");
            }
            else if (pionbleu.classList.contains('active')){
                this.classList.toggle("bleu");
            }
            else if (pionjaune.classList.contains('active')){
                this.classList.toggle("jaune");
            }
            else if (pionrouge.classList.contains('active')){
                this.classList.toggle("rouge");
            }
            else if (pionmarron.classList.contains('active')){
                this.classList.toggle("marron");
            }
            if (ligneComplete(ligne)){
                console.log(combinaison)
                verification(ligne, combinaison);
                numligne += 1;
                ligne =  sousListe(document.getElementsByClassName('rondVide'),numligne*5, (numligne+1)*5);
            }
        }
    })
}


