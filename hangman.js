document.addEventListener('DOMContentLoaded', () => {
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

    const wordList = [
        "javascript", "programming", "hangman", "developer", "algorithm", "function", "variable", "constant", "array", "object",
        "class", "inheritance", "encapsulation", "polymorphism", "abstraction", "interface", "loop", "iteration", "recursion", "closure",
        "callback", "promise", "async", "await", "thread", "process", "concurrency", "parallelism", "synchronization", "deadlock",
        "queue", "stack", "memory", "binary", "decimal", "hexadecimal", "octal", "buffer", "string", "kilobyte",
        "megabyte", "gigabyte", "terabyte", "petabyte", "exabyte", "zettabyte", "yottabyte", "compiler", "interpreter", "syntax",
        "semantics", "parsing", "token", "lexical", "semantic", "runtime", "debugging", "testing", "unittest", "integration",
        "system", "acceptance", "regression", "performance", "loadtest", "stress", "usability", "security", "vulnerability", "encryption",
        "decryption", "hashing", "authentication", "authorization", "firewall", "antivirus", "malware", "spyware", "adware", "ransomware",
        "phishing", "spoofing", "hacking", "cracker", "cybersecurity", "network", "protocol", "network", "network", "internet",
        "domain", "http", "https", "filetransfer", "mailserver", "mailserver", "mailserver", "secureshell", "remoteaccess", "virtualprivate"
    ];

    let word = '';
    let mistakes = 0;
    let solvedArray = [];
    let wrongLetters = [];
    let usedLetters = new Set();

    const imageDiv = document.getElementById('image');
    const wordDiv = document.getElementById('word');
    const wrongLettersDiv = document.getElementById('wrong-letters');
    const letterInput = document.getElementById('letter-input');
    const submitButton = document.getElementById('submit-letter');
    const messageDiv = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    const chancesDiv = document.getElementById('chances');

    function startGame() {
        word = wordList[Math.floor(Math.random() * wordList.length)];
        mistakes = 0;
        solvedArray = Array(word.length).fill('_');
        wrongLetters = [];
        usedLetters.clear();
        updateDisplay();
        document.getElementById('game').style.display = 'block';
        messageDiv.textContent = '';
        letterInput.focus();
    }

    function updateDisplay() {
        imageDiv.textContent = images[mistakes];
        wordDiv.textContent = solvedArray.join(' ');
        wrongLettersDiv.textContent = `Huruf salah: ${wrongLetters.join(', ')}`;
        chancesDiv.textContent = `Sisa kesempatan: ${7 - mistakes}`;
    }

    submitButton.addEventListener('click', () => {
        const letter = letterInput.value.toLowerCase();
        letterInput.value = '';

        if (!letter || usedLetters.has(letter)) {
            messageDiv.textContent = `Huruf '${letter}' sudah digunakan atau tidak valid. Coba huruf lain.`;
            letterInput.focus();
            return;
        }

        usedLetters.add(letter);

        if (word.includes(letter)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    solvedArray[i] = letter;
                }
            }
            // messageDiv.textContent = `Huruf '${letter}' benar!`;
        } else {
            mistakes++;
            wrongLetters.push(letter);
            // messageDiv.textContent = `Huruf '${letter}' salah!`;
        }

        if (mistakes === 7) {
            messageDiv.textContent = `Kata yang benar adalah: ${word}. ANDA KALAH!`;
            submitButton.disabled = true;
        } else if (!solvedArray.includes('_')) {
            messageDiv.textContent = "ANDA MENANG!";
            submitButton.disabled = true;
        }

        updateDisplay();
        letterInput.focus();
    });

    restartButton.addEventListener('click', () => {
        submitButton.disabled = false;
        startGame();
    });

    startGame();
});
