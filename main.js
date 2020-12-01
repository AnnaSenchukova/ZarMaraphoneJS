import Pokemon from "./pokemon.js";
import random from "./utilsRandom.js";
import {generateLog, clearLogs, createLogFighting, logs, blockLogs} from "./logs.js";
import {pokemons} from "./pokemons.js";

class Game {

    player1;
    player2;

    constructor() {

        this.player1 = new Pokemon({
            ...randomPokemon(),
            selectors: 'player1',
        });

        this.player2 = new Pokemon({
            ...randomPokemon(),
            selectors: 'player2',
        });
    }

    startGame(){
        this.player1 = renderPlayer('player1');
        this.player2 = renderPlayer('player2');

        this.player1.attacks.forEach((pokemonAttack) => {
            createAttackButton(pokemonAttack, this.player1, this.player2);
        });
    }

    resetGame(){
        this.player2 = renderPlayer('player2');
    }

}

function randomPokemon() {
    return pokemons[random(pokemons.length - 1)];
}

function createAttackButton(pokemonAttack, player, enemy) {

    console.log(pokemonAttack);

    const buttonHtml = document.createElement('button');

    buttonHtml.classList.add('button');
    buttonHtml.innerText = pokemonAttack.name;

    const kickCounter = createKickCounter(pokemonAttack.maxCount, buttonHtml, pokemonAttack);

    const handleAttackButtonClick = () => {
        clearLogs(blockLogs);

        player.changeHP(random(pokemonAttack.maxDamage), enemy, logCallback);
        enemy.changeHP(random(pokemonAttack.maxDamage), player, logCallback);

        kickCounter();
    };

    buttonHtml.addEventListener('click', handleAttackButtonClick);

    control.appendChild(buttonHtml);
};




//todo - refactor renderCharacter() and renderEnemy() - code duplication
function renderPlayer(selectors) {

    const pokemon = randomPokemon();
    let player = new Pokemon({
        ...pokemon,
        selectors,
    });

    const pokemonHtml = document.querySelector(`.${selectors}`);
    const pokemonNameHtml = document.querySelector(`#name-${selectors}`);
    clearLogs(pokemonNameHtml);
    pokemonNameHtml.innerHTML = pokemon.name;

    const pokemonImgHtml = pokemonHtml.querySelector('.sprite');
    pokemonImgHtml.src = pokemon.img;

    return player;
}

const logCallback = (count, player, enemy) => {

    let log = generateLog(player, enemy, count, player.buildRenderHPText());

    console.log(log);
    logs.push(log);
    createLogFighting(blockLogs, log);
};

function createKickCounter(kick, htmlBlock, button) {

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

const game = new Game();
game.startGame();