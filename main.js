const firstRow = prompt('Введите первую строку', 'мама мыла раму');
const secondRow = prompt('Введите вторую строку', 'собака друг человека');

function findLetterCountIn(row, letter) {
    let counter = 0;
    for (let i = 0; i <= row.length; i++) {
        if (row.charAt(i) === letter) {
            counter++;
        }
    }
    return counter;
}

/**
 * функция возвращает ту строку в которой больше искомых букв.
 * если все строки содержат однаковое количество искомых букв возвращается пустая строка.
 *
 * @param firstRow
 * @param secondRow
 * @returns {string}
 */
function getRow(firstRow, secondRow) {
    let resultRow = '';
    const kiryllicA = 'а';
    const latinA = 'a';

    let firstRowLetterCount = findLetterCountIn(firstRow, kiryllicA) + findLetterCountIn(firstRow, latinA);
    let secondRowLetterCount = findLetterCountIn(secondRow, kiryllicA) + findLetterCountIn(secondRow, latinA);

    if (firstRowLetterCount > secondRowLetterCount) {
        resultRow = firstRow;
    } else if (firstRowLetterCount < secondRowLetterCount) {
        resultRow = secondRow;
    }

    return resultRow;
}

alert(getRow(firstRow, secondRow)); // мама мыла раму