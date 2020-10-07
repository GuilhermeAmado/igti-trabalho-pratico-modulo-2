/*
O aluno deverá baixar os arquivos Cidades.json e Estados.json do seguinte link
(https://github.com/felipefdl/cidades-estados-brasil-json) e coloca-los dentro do seu
projeto. O arquivo Estados.json possui uma listagem com todos os estados do Brasil,
cada um representado por um ID. No arquivo Cidades.json estão listadas todas as
cidades do Brasil, com seu respectivo estado representando pelo ID fazendo referência
ao arquivo Estados.json.
*/

import fs from 'fs';
import util from 'util';

let cidades;
let estados;

cidades = JSON.parse(fs.readFileSync('./assets/Cidades.json', 'utf-8', err => console.log(err)));
estados = JSON.parse(fs.readFileSync('./assets/Estados.json', 'utf-8', err => console.log(err)));


/* 
1. Criar uma função que irá criar um arquivo JSON para cada estado representado no
arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes a
aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser
o UF do estado, por exemplo: MG.json
*/
function createJSONfromEstados() {
    let sigla;
    let cidadesDoEstado = [];
    estados.forEach(estado => {
        sigla = estado.Sigla;
        cidadesDoEstado = cidades.filter(cidade => cidade.Estado == estado.ID);
        fs.writeFileSync(`/assets/${sigla}.json`, JSON.stringify(cidadesDoEstado));
    });
}

// createJSONfromEstados();

/* 
2. Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
*/

function numberOfCitiesFromUF(uf) {
    let citiesFromUF = JSON.parse(fs.readFileSync(`./assets/${uf}.json`, 'utf-8', err => console.log(err)));
    return `O Estado ${uf} possui ${citiesFromUF.length} cidades`;
}

console.log(numberOfCitiesFromUF('PR'));

/*
3. Criar um método que imprima no console um array com o UF dos cinco estados
que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você
pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”,
“UF - 74”, “UF - 72”, “UF - 65”]
*/
function statesWithMostCities() {
    let top5 = [];

    estados.forEach(e => {
        e.Cidades = cidades.filter(c => e.ID === c.Estado);
    });

    // console.log(util.inspect(estados, {showHidden: false, depth: null}))
    top5 = estados
    .sort((a, b) => b.Cidades.length - a.Cidades.length)
    .slice(0, 5)
    .map(estado => {
        return `${estado.Sigla} - ${estado.Cidades.length}`  
    });
    console.log('5 Estados com MAIS cidades:', top5);
}

statesWithMostCities();

/*
4. Criar um método que imprima no console um array com o UF dos cinco estados
que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF
- 27”, “UF - 25”, “UF - 23”, “UF - 21”]
*/
function statesWithLeastCities() {
    let bottom5 = [];

    estados.forEach(e => {
        e.Cidades = cidades.filter(c => e.ID === c.Estado);
    });

    // console.log(util.inspect(estados, {showHidden: false, depth: null}))
    bottom5 = estados
    .sort((a, b) => b.Cidades.length - a.Cidades.length)
    .slice(-6, -1)
    .map(estado => {
        return `${estado.Sigla} - ${estado.Cidades.length}`  
    });
    console.log('5 Estados com MENOS cidades:',bottom5);
}

statesWithLeastCities();

/*
5. Criar um método que imprima no console um array com a cidade de maior nome de
cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da
Cidade – UF”, ...]
*/
function longestCityNameEachState() {
    const longestNames = [];

    function getLongestName(uf) {
        let ufToSearch = JSON.parse(fs.readFileSync(`./assets/${uf}.json`, 'utf-8', err => console.log(err)));
        let longestName = ufToSearch.reduce((a, b) => a.Nome.length > b.Nome.length ? a : b);
        // console.log(longestName);
        return longestName;
    }

    estados.forEach(estado => {
        const city = getLongestName(estado.Sigla);
        longestNames.push(`${city.Nome} - ${estado.Sigla}`);
    });

    console.log(longestNames);
}

longestCityNameEachState();

/*
6. Criar um método que imprima no console um array com a cidade de menor nome
de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome
da Cidade – UF”, ...]
*/
function shortestCityNameEachState() {
    const shortestNames = [];

    function getShortestName(uf) {
        let ufToSearch = JSON.parse(fs.readFileSync(`./assets/${uf}.json`, 'utf-8', err => console.log(err)));
        let shortestName = ufToSearch.reduce((a, b) => a.Nome.length < b.Nome.length ? a : b);
        return shortestName;
    }

    estados.forEach(estado => {
        const city = getShortestName(estado.Sigla);
        shortestNames.push(`${city.Nome} - ${estado.Sigla}`);
    });

    console.log(shortestNames);
}

shortestCityNameEachState();

/*
7. Criar um método que imprima no console a cidade de maior nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF"
*/
function getLongestCityNameOverall() {
    const longestCityNames = [];

    function getLongestCityName(uf) {
        let ufToSearch = JSON.parse(fs.readFileSync(`./assets/${uf}.json`, 'utf-8', err => console.log(err)));
        let longestCityName = ufToSearch.reduce((a, b) => a.Nome.length > b.Nome.length ? a : b);
        return longestCityName;
    }

    estados.forEach(estado => {
        const city = getLongestCityName(estado.Sigla);
        longestCityNames.push({
            cityName: city.Nome,
            uf: estado.Sigla
        });
    });

    let longestCityName = longestCityNames.reduce((a, b) => a.cityName.length > b.cityName.length ? a : b);
    console.log(longestCityName);
}

getLongestCityNameOverall();


/*
8. Criar um método que imprima no console a cidade de menor nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF"
*/
function getShortestCityNameOvervall() {
    const shortestCityNames = [];

    function getShortestCityName(uf) {
        let ufToSearch = JSON.parse(fs.readFileSync(`./assets/${uf}.json`, 'utf-8', err => console.log(err)));
        let shortestCityName = ufToSearch.reduce((a, b) => a.Nome.length < b.Nome.length ? a : b);
        return shortestCityName;
    }

    estados.forEach(estado => {
        const city = getShortestCityName(estado.Sigla);
        shortestCityNames.push({
            cityName: city.Nome,
            uf: estado.Sigla
        });
    });

    let shortestCityName = shortestCityNames.reduce((a, b) => a.cityName.length < b.cityName.length ? a : b);
    console.log(shortestCityName);
}

getShortestCityNameOvervall();