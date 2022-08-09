// Le prix max
var max = 500;

// Objet game qui contient nos variables devenues propriétés !!
var game = {
    attempts: 1,
    min: 3,
    max: 3,
    scores: [], // On créé un tableau vide des scores
    // displayScores() {
    displayScores: function () {
        // 1. Sélection d'un élément HTML avec son id
        var scoresHTML = document.getElementById('scores'); // Node -> Element -> HTMLElement
        // 2. On créé un tableau (on le rajoutera à la fin en enfant de #scores)
        var table = document.createElement('table');
        // 3. Entête du tableau
        var thead = document.createElement('thead'); // On créé l'élément thead
        var theadContent = '<tr><th>Partie</th><th>Essais</th></tr>'; // On structure son contenu HTML enfant sous forme de chaîne
        thead.innerHTML = theadContent; // On ajoute ce HTML en enfant du thead
        table.appendChild(thead); // On ajoute l'élément thead en enfant de table
        // 4. Corps du tableau
        var tbody = document.createElement('tbody');
        for (var i = 0; i < game.scores.length; i++) { // On parcoure les scores (initialisation; condition; incrémentation)
            var tr = document.createElement('tr'); // A chaque tour, on créé un <tr> pour chaque partie

            var tdGame = document.createElement('td'); // Le premier <td> qui va contenir le numéro de partie
            tdGame.textContent = i + 1; // Numéro de la partie ajouté en texte du <td>
            tr.appendChild(tdGame); // On ajoute le <td> en premier enfant du <tr>

            var tdAttempts = document.createElement('td'); // Le deuxième <td> qui contient le nombre de coups
            tdAttempts.textContent = game.scores[i]; // Nombre de coups ajouté en texte du <td>
            tr.appendChild(tdAttempts); // On ajoute le <td> en deuxième enfant du <tr>

            tbody.appendChild(tr); // Mon <tr> est ok, je l'ajoute à <tbody>
        }

        // 5. On ajoute le <tbody> à notre <table> et on vient ensuite ajouter la table dans notre div#scores
        table.appendChild(tbody);
        scoresHTML.appendChild(table);
    }
};

// Génération d'un nombre entier aléatoire sur un intervalle
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Fonction play() qui permet de lancer une nouvelle partie
function play() {
    // On créé une propriété randomPrice qui aura pour valeur celle retournée par la fonction randomNumber()
    game.randomPrice = randomNumber(game.min, game.max);
    var enteredPrice = parseInt(prompt('Quel est le juste prix?'));

    while (enteredPrice !== game.randomPrice) {
        if (enteredPrice < game.randomPrice) {
            enteredPrice = parseInt(prompt("C'est plus!"));
        } else {
            enteredPrice = parseInt(prompt("C'est moins!"));
        }
        game.attempts++;
    }

    // J'ai gagné !!
    game.scores.push(game.attempts); // On ajoute mon score au tableau

    alert("C'est gagné!!! Vous avez trouvé le juste prix de " + game.randomPrice + " après " + game.attempts + " essais!!!");

    // Si le joueur veut rejouer
    if (confirm('Nouvelle partie?')) {
        game.attempts = 1; // On reset le compteur de coups
        play(); // On appelle la fonction play() (Fonctionception :O)
    } else {
        game.displayScores();
    }
}

// On doit lancer la fonction pour la première partie
play();
