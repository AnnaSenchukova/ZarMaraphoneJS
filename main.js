import Pokemon from "./pokemon.js";
import random from "./utilsRandom.js";
import {generateLog, clearLogs, createLogFighting, logs, blockLogs} from "./logs.js";

class Game {

    player1;
    player2;

    pokemons;

    async startGame(){

        this.pokemons = await fetchPokemons();

        this.player1 = this.renderPlayer('player1');
        this.player2 = this.renderPlayer('player2');

        this.player1.attacks.forEach((pokemonAttack) => {
            createAttackButton(pokemonAttack, this.player1, this.player2);
        });
    }

    resetGame(){
        this.player2 = this.renderPlayer('player2');
    }

    renderPlayer(selectors) {

        const pokemon = this.pokemons[random(this.pokemons.length - 1)];

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


}

async function fetchPokemons() {
    const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
    return await response.json();
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