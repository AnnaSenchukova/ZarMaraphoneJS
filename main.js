import Pokemon from "./pokemon.js";
import random from "./utilsRandom.js";
import {generateLog, clearLogs, createLogFighting, logs} from "./logs.js";

const  player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 500,
    selectors: 'character',
});

const  player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 450,
    selectors: 'enemy',
});

const buttonKick = document.getElementById('btn-kick');
const buttonPunch = document.getElementById('btn-punch');
const blockLogs = document.querySelector('#logs');


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



let buttonsArray = [
    {
        name: 'Thunder Jolt',
        element: document.getElementById('btn-kick'),
        damage: 20,
        kick: 6,
    },
    {
        name: 'Mighty Punch',
        element: document.getElementById('btn-punch'),
        damage: 50,
        kick: 2,
    },
];

function changeHit(buttonsArray) {

    function kickCounter(kick = 0) {
        return function(button) {
            kick++;
            console.log(`Button ${button.name} has been clicked ${kick} times`);


            function createLogKick (htmlBlock) {
                const logKick = document.createElement('p');
                logKick.innerText = `${button.name} (${button.kick - kick})`;
                htmlBlock.insertBefore(logKick, htmlBlock.children[0]);
            }
            createLogKick(button.element);



            if(kick === button.kick){
                button.element.disabled = true;
                console.log(`Button ${button.name} has been disabled`);
            }
        }
    }

    for (let i = 0; i < buttonsArray.length; i++) {
        let button = buttonsArray[i];

        const counterFunction = kickCounter();


        button.element.addEventListener('click', function (event) {
                console.log(button.name);

                clearLogs(blockLogs);
                clearLogs(button.element);
                player1.changeHP(random(button.damage),  logCallback);
                player2.changeHP(random(button.damage), logCallback);

                counterFunction(button);

        });
    }
}

function init() {
    console.log('Start Game!');
    changeHit(buttonsArray);
}

init();

