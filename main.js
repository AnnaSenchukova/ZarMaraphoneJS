import Pokemon from "./pokemon.js";
import random from "./utilsRandom.js";
import {generateLog, clearLogs, createLogFighting, logs, blockLogs} from "./logs.js";
import {pokemons} from "./pokemons.js";

/*class Game {
    constructor({}) {
        startGame: renderPokemon();
    }
}*/

function randomPokemon() {
    return random(pokemons.length - 1);
}

const characterI = randomPokemon();
const enemyI = randomPokemon();

const character = pokemons[characterI];
const enemy = pokemons[enemyI];

let player1 = new Pokemon({
    ...character,
    selectors: 'player1',
});

console.log(player1);

let player2 = new Pokemon({
    ...enemy,
    selectors: 'player2',
});

//todo - refactor renderCharacter() and renderEnemy() - code duplication
function renderCharacter() {
    const characterI = randomPokemon();
    const character = pokemons[characterI];

    let player1 = new Pokemon({
        ...character,
        selectors: 'player1',
    });

    const characterHtml = document.querySelector('.player1');
    const characterNameHtml = document.querySelector('#name-player1');
    clearLogs(characterNameHtml);
    characterNameHtml.innerHTML = character.name;

    const characterImgHtml = characterHtml.querySelector('.sprite');
    characterImgHtml.src = character.img;

    return player1;
}

function renderEnemy() {
    const enemyI = randomPokemon();
    const enemy = pokemons[enemyI];

    let player2 = new Pokemon({
        ...enemy,
        selectors: 'player2',
    });

    const enemyHtml = document.querySelector('.player2');
    const enemyNameHtml = document.querySelector('#name-player2');
    clearLogs(enemyNameHtml);
    enemyNameHtml.innerHTML = enemy.name;

    const enemyImgHtml = enemyHtml.querySelector('.sprite');
    enemyImgHtml.src = enemy.img;

    return player2;
}

function startGame() {
    renderEnemy();
}

function resetGame() {
    renderCharacter();
    renderEnemy();
}

resetGame();
const logCallback = (count, player) => {
    let log;
    if (player === player1) {
        log = generateLog(player, player2, count, player.buildRenderHPText());
    } else {
        log = generateLog(player, player1, count, player.buildRenderHPText());
    }

    console.log(log);
    logs.push(log);
    createLogFighting(blockLogs, log);
};

function kickCounter(kick, htmlBlock, button) {
    function createLogKick(htmlBlock) {
        clearLogs(htmlBlock);
        const logKick = htmlBlock.innerText;
        htmlBlock.innerText = `${button.name} ${logKick} (${kick})`;
    }

    createLogKick(htmlBlock);

    return function () {
        console.log();
        kick--;
        createLogKick(htmlBlock);
        if (kick === 0) {
            htmlBlock.disabled = true;
            console.log(`Button ${htmlBlock} has been disabled`);
        }
        //-console.log(`Button ${button.name} has been clicked ${kick} times`);
        return kick;
    }

}


const control = document.querySelector('.control');

const createAttackButton = item => {

    console.log(item);

    const buttonHtml = document.createElement('button');
    buttonHtml.classList.add('button');
    buttonHtml.innerText = item.name;
    const counterFunction = kickCounter(item.maxCount, buttonHtml, item);

    buttonHtml.addEventListener('click', () => {
        console.log('Click ', buttonHtml.innerText);
        clearLogs(blockLogs);

        player1.changeHP(random(item.maxDamage), logCallback);
        player2.changeHP(random(item.maxDamage), logCallback);
        counterFunction();
    });


    control.appendChild(buttonHtml);
};

player1.attacks.forEach(createAttackButton);

