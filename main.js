const buttonKick = document.getElementById('btn-kick');
const buttonPunch = document.getElementById('btn-punch');
const blockLogs = document.querySelector('#logs');

const logs = [];

let buttonsArray = [
    {
        name: 'Kick',
        element: document.getElementById('btn-kick'),
        damage: 20
    },
    {
        name: 'Punch',
        element: document.getElementById('btn-punch'),
        damage: 50
    },
];


const character = {
    name: 'Picachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP,
};

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
        return function(buttonName) {
            kick++;
            console.log(`Button ${buttonName} has been clicked ${kick} times`);
        }
    }

    for (let i = 0; i < buttonsArray.length; i++) {
        let button = buttonsArray[i];

        const counterFunction = kickCounter();

        button.element.addEventListener('click', function (event) {
                console.log(button.name);

                clearLogs(blockLogs);
                character.changeHP(random(button.damage));
                enemy.changeHP(random(button.damage));

                counterFunction(button.name);
        });
    }
}

function renderHP(person) {
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

function changeHP(count) {
    if(this.damageHP < count) {
        this.damageHP = 0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        buttonKick.disabled = true;

    } else {
        this.damageHP -= count;
    }
    const log = this === enemy ? generateLog(this, character, count, buildRenderHPText(this)) : generateLog(this, enemy, count, buildRenderHPText(this));
    console.log(log);
    logs.push(log);
    createLogFighting(blockLogs, log);
    renderHP(this);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function init() {
    console.log('Start Came!');
    changeHit(buttonsArray);
    renderHP(character);
    renderHP(enemy);
}

init();

