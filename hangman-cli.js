// hangman.js

// Import modul readline untuk membaca input dari CLI
const readline = require('readline');

// Fungsi untuk mencetak intro game
function printIntro() {
    console.log("=========================================");
    console.log("|  |  __         ___            __          ");
    console.log("|__| |  | |\\  | |     |\\    /| |  | |\\  |");
    console.log("|  | |__| | \\ | | __  | \\  / | |__| | \\ |");
    console.log("|  | |  | |  \\| |___| |  \\/  | |  | |  \\|");
    console.log("=========================================");
    console.log("Guess the word in less than 7 mistakes to win.");
    console.log("\n");
}

// Fungsi untuk memeriksa apakah string hanya berisi huruf kecil
function checkLowercase(inputString) {
    for (let char of inputString) {
        if (char < 'a' || char > 'z') {
            return false;
        }
    }
    return true;
}

// Fungsi untuk mencetak gambar berdasarkan jumlah kesalahan
function printImage(mistakes) {
    const images = [
        "-----------------------------\n     |                       \n     |                       \n     |                       \n     |                       \n     |                       \n     |                       \n-----------------------------",
        "-----------------------------\n     |            |          \n     |                       \n     |                       \n     |                       \n     |                       \n     |                       \n-----------------------------",
        "-----------------------------\n     |            |          \n     |            O          \n     |                       \n     |                       \n     |                       \n     |                       \n-----------------------------",
        "-----------------------------\n     |            |          \n     |            O          \n     |            |          \n     |                       \n     |                       \n     |                       \n-----------------------------",
        "-----------------------------\n     |            |          \n     |            O          \n     |           -|          \n     |                       \n     |                       \n     |                       \n-----------------------------",
        "-----------------------------\n     |            |          \n     |            O          \n     |           -|-         \n     |                       \n     |                       \n     |                       \n-----------------------------",
        "-----------------------------\n     |            |          \n     |            O          \n     |           -|-         \n     |           /           \n     |                       \n     |                       \n-----------------------------",
        "-----------------------------\n     |            |          \n     |            O          \n     |           -|-         \n     |           / \\         \n     |                       \n     |                       \n-----------------------------"
    ];
    console.log(images[mistakes]);
}

// Fungsi utama untuk menjalankan game
async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    printIntro();

    // Meminta jumlah kata dalam bank kata
    const numOfWords = await new Promise(resolve => {
        rl.question("How many words in the word bank? (Enter an integer)\n", answer => {
            resolve(parseInt(answer));
        });
    });

    const wordList = [];
    for (let i = 0; i < numOfWords; i++) {
        const word = await new Promise(resolve => {
            rl.question(`What is word ${i + 1}?\n(Maximum permitted word length is 50 letters)\n(Lowercase letters ONLY)\n`, answer => {
                if (checkLowercase(answer)) {
                    resolve(answer);
                } else {
                    console.log("Invalid input. Try again.\n");
                    i--;
                    resolve(null);
                }
            });
        });
        if (word) wordList.push(word);
    }

    let replay = true;
    while (replay) {
        const word = wordList[Math.floor(Math.random() * numOfWords)];
        let solvedStatus = false;
        let mistakes = 0;
        const solvedArray = Array(word.length).fill(0);
        const wrongLetters = [];
        const usedLetters = new Set();

        console.log("Let's Start!");

        while (!solvedStatus && mistakes < 7) {
            console.log("=========================================");
            console.log(`The word contains ${word.length} letters.`);
            const letter = await new Promise(resolve => {
                rl.question("Enter a letter: ", answer => {
                    resolve(answer[0]);
                });
            });

            if (usedLetters.has(letter)) {
                console.log(`The letter '${letter}' has already been used. Try a different letter.`);
                continue;
            }

            usedLetters.add(letter);
            console.log(`You entered: ${letter}`);

            let unsolvedLetters = 0;
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    solvedArray[i] = 1;
                } else {
                    unsolvedLetters++;
                }
            }

            if (unsolvedLetters === word.length) {
                mistakes++;
                wrongLetters.push(letter);
            }
            console.log(`Number of mistakes: ${mistakes}`);
            console.log(`Wrong letters: ${wrongLetters.join(', ')}`);
            printImage(mistakes);

            solvedStatus = solvedArray.every(val => val === 1);

            console.log(solvedArray.map((val, i) => (val ? word[i] : '_')).join(''));
            console.log("\n");
        }

        if (mistakes === 7) {
            console.log(`Correct word was: ${word}`);
            console.log("YOU LOSE!\n");
        } else {
            console.log("YOU WIN!\n");
        }

        replay = await new Promise(resolve => {
            rl.question("Do you want to play again? (y/n)\n", answer => {
                resolve(answer.toLowerCase() === 'y');
            });
        });
    }

    rl.close();
}

main();