const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

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
    let searchLetter = 'а';

    let firstRowLetterCount = findLetterCountIn(firstRow, searchLetter);
    let secondRowLetterCount = findLetterCountIn(secondRow, searchLetter);

    if (firstRowLetterCount > secondRowLetterCount) {
        resultRow = firstRow;
    } else if (firstRowLetterCount < secondRowLetterCount) {
        resultRow = secondRow;
    }

    return resultRow;
}

console.log(getRow(firstRow, secondRow)); // мама мыла раму