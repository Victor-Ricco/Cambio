let myHeaders = new Headers();
myHeaders.append("apiKey", "zWmmsMXejFHSB3ZcYqPSWvHYyiCG7tf2");

let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

document.getElementById('searchIcon').addEventListener('click', getSymbols);

//Cria os elementos para serem preenchidos e visualizados
const createElement =  () => {
    let elementSection = document.createElement('section');
    let elementPNomeMoeda = document.createElement('p');
    let elementPValorMoeda = document.createElement('p');
    elementSection.id = "valores";
    elementPNomeMoeda.id = "nomeMoeda";
    elementPValorMoeda.id = "valorMoeda";
    return {
        elementSection,
        elementPNomeMoeda,
        elementPValorMoeda
    };
}

//Adiciona os valores no elemento e os motra no HTML
function sendAndAppendValues (symbols) {
    if (document.getElementById('resultados').hasChildNodes()) {
        document.getElementById('resultados').innerHTML = '';
    }
    symbols.forEach(element => {
        let {elementSection, elementPNomeMoeda, elementPValorMoeda} = createElement();
        elementPNomeMoeda.innerText = element[0];
        elementPValorMoeda.innerText = `$ ${element[1].toFixed(2)}`;
        elementSection.appendChild(elementPNomeMoeda);
        elementSection.appendChild(elementPValorMoeda);
        document.getElementById('resultados').appendChild(elementSection)
    });
}

//captura o preço atual de cada moeda referenta a moeda pesquisada
async function getData (symbols) {
    let symbolCoin = document.getElementById('searchBox').value
    const data = await fetch(`https://api.apilayer.com/fixer/latest?symbols=${symbols}&base=${symbolCoin.toUpperCase()}`, requestOptions)
    .then(function(response){
        return response.json();
    })
    .catch(error => window.alert(error));
    sendAndAppendValues(Object.entries(data.rates))
}

//Captura todos os simbolos e nomes das moedas
async function getSymbols () {
    const dataSymbols = await fetch("https://api.apilayer.com/fixer/symbols", requestOptions)
    .then(function(response){
        return response.json();
    });
    const arrOfSymbols = Object.keys(dataSymbols.symbols);
    getData(arrOfSymbols.join());
}
