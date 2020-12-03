import random from "./utilsRandom.js";
export const logs = [];
export const blockLogs = document.querySelector('#logs');

export function generateLog (firstPerson, secondPerson, damage, HPResult) {
    const phrases = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name}  удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name}  высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name}  пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name}  расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. Урон -${damage}, [${HPResult}]`,
        `${firstPerson.name}  пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. Урон -${damage}, [${HPResult}]`
    ];

    return phrases[random(phrases.length) - 1];
}

export function clearLogs(htmlBlock) {
    while (htmlBlock.firstChild) {
        htmlBlock.removeChild(htmlBlock.lastChild);
    }
}

export function createLogFighting(htmlBlock, log) {
    const logEntry = document.createElement('p');
    logEntry.innerText = log;
    htmlBlock.insertBefore(logEntry, htmlBlock.children[0]);
}


