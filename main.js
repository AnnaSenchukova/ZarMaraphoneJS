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


console.log(player1);
console.log(player2);

const buttonKick = document.getElementById('btn-kick');
const buttonPunch = document.getElementById('btn-punch');
const blockLogs = document.querySelector('#logs');


const logCallback = (count, player) => {

    debugger;

    console.log(player.name);

    //const log = this === enemy ? generateLog(this, character, count, buildRenderHPText(this)) : generateLog(this, enemy, count, buildRenderHPText(this));
    //const log = Pokemon.selectors === enemy ? generateLog(player1, player2, count, count) : generateLog(player1, player2, count, count);

    let log;
    if (player === player1) {
        log = generateLog(player, player2, count, count);
    } else {
        log = generateLog(player, player1, count, count);
    }

    console.log(log);
    logs.push(log);
    createLogFighting(blockLogs, log);

    //-console.log(generateLog(player1, player2, count, count));
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


// const character = {
//     name: 'Picachu',
//     defaultHP: 100,
//     damageHP: 100,
//     elHP: document.getElementById('health-character'),
//     elProgressbar: document.getElementById('progressbar-character'),
//     changeHP,
// };
//
// const enemy = {
//     name: 'Charmander',
//     defaultHP: 100,
//     damageHP: 100,
//     elHP: document.getElementById('health-enemy'),
//     elProgressbar: document.getElementById('progressbar-enemy'),
//     changeHP,
// };

/*buttonKick.addEventListener('click', function () {
    console.log('Kick');
    changeHP(random(20), character);
    changeHP(random(20), enemy);
});

buttonPunch.addEventListener('click', function () {
    console.log('Punch');
    changeHP(random(50), character);
    changeHP(random(50), enemy);
});*/


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
                /*character.changeHP(random(button.damage));*/
                // enemy.changeHP(random(button.damage));

                counterFunction(button);

        });
    }
}

/*function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function buildRenderHPText(person) {
    return person.damageHP + ' / ' + person.defaultHP;
}

function renderHPLife(person) {
    person.elHP.innerText = buildRenderHPText(person);
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}
*/

/*function changeHP(count) {
    if(this.damageHP < count) {
        this.damageHP = 0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        buttonKick.disabled = true;
        buttonPunch.disabled = true

    } else {
        this.damageHP -= count;
    }
    const log = this === enemy ? generateLog(this, character, count, buildRenderHPText(this)) : generateLog(this, enemy, count, buildRenderHPText(this));
    console.log(log);
    logs.push(log);
    createLogFighting(blockLogs, log);
    renderHP(this);
}
*/
// function random(num) {
//     return Math.ceil(Math.random() * num);
// }

function init() {
    console.log('Start Game!');
    changeHit(buttonsArray);
    /*renderHP(character);*/
    // renderHP(enemy);
}

init();

