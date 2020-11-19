const buttonKick = document.getElementById('btn-kick');
const buttonPunch = document.getElementById('btn-punch');
let buttonsArray = [buttonKick, buttonPunch];


const character = {
    name: 'Picachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
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
    for (let i = 0; i < buttonsArray.length; i++) {
        let button = buttonsArray[i];
        button.addEventListener('click', function () {
            if(i === 0) {
                console.log('Kick');
                changeHP(random(20), character);
                changeHP(random(20), enemy);
            } else {
                console.log('Punch');
                changeHP(random(50), character);
                changeHP(random(50), enemy);
            }
        });
    }
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
    if(person.damageHP < count) {
        person.damageHP = 0;
        alert('Бедный ' + person.name + ' проиграл бой!');
        buttonKick.disabled = true;

    } else {
        person.damageHP -= count;
    }
    renderHP(person);
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

