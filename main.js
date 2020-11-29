import Pokemon from "./pokemon.js";
import random from "./utilsRandom.js";
import {generateLog, clearLogs, createLogFighting, logs, blockLogs} from "./logs.js";
import {pokemons} from "./pokemons.js";

const pikachu = pokemons.find(item => item.name === 'Pikachu');
console.log(pikachu);

const  player1 = new Pokemon({
    ...pikachu,
    selectors: 'player1',
});

console.log(player1);

const  player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 450,
    selectors: 'player2',
});



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



    const control = document.querySelector('.control');

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

    player1.attacks.forEach(item => {
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
    });

