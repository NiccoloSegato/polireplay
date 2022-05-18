let giorniSettimana = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
let nomiMesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

var lessons = [];
var latestStart = 0;
var latestEnd = 10;

$.getJSON("scripts/rawdata.json", {}, function(data) {
    lessons = data;
    loadLesson();
    document.getElementById("pagination-box").style.display = "block";
});

function loadLesson() {
    for(var i = latestStart; i < latestEnd; i++) {
        let cont = document.getElementById("feedcontainer");
        
        let subDiv = document.createElement("div");
        subDiv.classList.add("card");
        subDiv.style.marginBottom = "10px";

        let esercitazione = "Lezione";
        if(lessons[i].esercitazione == 1){
            esercitazione = "Esercitazione";
        }
        let convertedDate = new Date(lessons[i].data.slice(0, -9));
        esercitazione = esercitazione + " di " + giorniSettimana[convertedDate.getDay()] + " " + convertedDate.getDate() + " " + nomiMesi[convertedDate.getMonth()] + " " + convertedDate.getFullYear();

        let cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.innerText = esercitazione;

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardTitle = document.createElement("h5");
        cardTitle.innerText = lessons[i].insegnamento;
        cardTitle.classList.add("card-title");

        let cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = lessons[i].titolo;

        let cardTextDocente = document.createElement("p");
        cardTextDocente.classList.add("card-text");
        cardTextDocente.innerText = "👤 " + lessons[i].docente;

        let cardLink = document.createElement("a");
        cardLink.href = lessons[i].link;
        cardLink.classList.add("btn");
        cardLink.classList.add("btn-primary");
        cardLink.innerText = "Vai alla lezione";

        cardBody.append(cardTitle);
        cardBody.append(cardTextDocente);
        cardBody.append(cardText);
        cardBody.append(cardLink);
        subDiv.append(cardHeader);
        subDiv.append(cardBody);

        cont.append(subDiv);
    }
    document.getElementById("feedcontainer").removeChild(document.getElementById("loaderspin"));
}

function loadMore() {
    if(latestStart + 10 < lessons.length) {
        document.getElementById("feedcontainer").innerHTML = "";
        latestStart = latestStart + 10;
        latestEnd = latestEnd + 10;
        loadLesson();
    }
}

function loadLess() {
    if(latestStart > 9 && latestEnd > 19) {
        document.getElementById("feedcontainer").innerHTML = "";
        latestStart = latestStart - 10;
        latestEnd = latestEnd - 10;
        loadLesson();
    }
}

function searchFeed() {
    let query = document.getElementById("query").value;
    if(query.length > 3) {
        let resultsInsegnamento = lessons.filter(element => (element["insegnamento"].toUpperCase() + ' ' + element["docente"].toUpperCase()).includes(query.toUpperCase()));
        let resultDocente = lessons.filter(element => element["docente"].toUpperCase().includes(query.toUpperCase()));
        let results = resultDocente.concat(resultsInsegnamento);
        if(results.length > 0){
            document.getElementById("feedcontainer").innerHTML = "";
            for(var i = 0; i < results.length; i++) {
                let cont = document.getElementById("feedcontainer");
        
                let subDiv = document.createElement("div");
                subDiv.classList.add("card");
                subDiv.style.marginBottom = "10px";

                let esercitazione = "Lezione";
                if(results[i].esercitazione == 1){
                    esercitazione = "Esercitazione";
                }
                let convertedDate = new Date(results[i].data.slice(0, -9));
                esercitazione = esercitazione + " di " + giorniSettimana[convertedDate.getDay()] + " " + convertedDate.getDate() + " " + nomiMesi[convertedDate.getMonth()] + " " + convertedDate.getFullYear();

                let cardHeader = document.createElement("div");
                cardHeader.classList.add("card-header");
                cardHeader.innerText = esercitazione;

                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");

                let cardTitle = document.createElement("h5");
                cardTitle.innerText = results[i].insegnamento;
                cardTitle.classList.add("card-title");

                let cardText = document.createElement("p");
                cardText.classList.add("card-text");
                cardText.innerText = results[i].titolo;

                let cardTextDocente = document.createElement("p");
                cardTextDocente.classList.add("card-text");
                cardTextDocente.innerText = "👤 " + results[i].docente;

                let cardLink = document.createElement("a");
                cardLink.href = results[i].link;
                cardLink.classList.add("btn");
                cardLink.classList.add("btn-primary");
                cardLink.innerText = "Vai alla lezione";

                cardBody.append(cardTitle);
                cardBody.append(cardTextDocente);
                cardBody.append(cardText);
                cardBody.append(cardLink);
                subDiv.append(cardHeader);
                subDiv.append(cardBody);

                cont.append(subDiv);
            }
            document.getElementById("pagination-box").style.display = "none";
        }
        else {
            document.getElementById("feedcontainer").innerHTML = "";

            let noLbl = document.createElement("p");
            noLbl.innerText = "Nessun risultato per la tua ricerca";

            document.getElementById("feedcontainer").append(noLbl);
            document.getElementById("pagination-box").style.display = "none";
        }
    }
}