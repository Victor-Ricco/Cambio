let myHeaders = new Headers();
myHeaders.append("apiKey", "zWmmsMXejFHSB3ZcYqPSWvHYyiCG7tf2");

let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

function createElement () {
    //Criar o elemento em que os valores vao ser inseridos
}

function AddValues () {
    //Adiciona os valores no elemento, os coloca em um array, envia esse array para "appendElements" para serem inseridos no HTML
}

function appendElements () {
    //Envia os elementos atravez do DOM para o HTML
}

async function getData (symbols) {
    const data = await fetch(`https://api.apilayer.com/fixer/latest?symbols=${symbols}&base=${'BRL'}`, requestOptions)
    .then(function(response){
        return response.json();
    });
    console.log(Object.entries(data.rates));
}

async function getSymbols () {
    const dataSymbols = await fetch("https://api.apilayer.com/fixer/symbols", requestOptions)
    .then(function(response){
        return response.json();
    });
    const arrOfSymbols = Object.keys(dataSymbols.symbols);
    getData(arrOfSymbols.join());
}
