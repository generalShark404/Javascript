document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const restartButton = document.querySelector('#restart');

    let userScore = 0;
    let computerScore = 0;

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const userSelection = e.target.id;
            const computerSelection = Math.random() < 0.5 ? 'heads' : 'tails';
            const randomResult = Math.round(Math.random());

            showSelection(userSelection, computerSelection);
            animateResult(randomResult);
            setTimeout(() => {
                updateScore(randomResult, userSelection, computerSelection);
                checkWinner();
            }, 1000);
        });
    });

    restartButton.addEventListener('click', () => {
        window.location.reload();
    });

    function showSelection(user, computer) {
        document.querySelector("#player-selection").textContent = user;
        document.querySelector("#computer-selection").textContent = computer;

        document.querySelector("#player-selection").style.color = user === 'heads' ? 'green' : 'blue';
        document.querySelector("#computer-selection").style.color = computer === 'heads' ? 'green' : 'blue';
    }

    function animateResult(result) {
        const image = document.querySelector('#image');
        image.classList.add('animate');
        setTimeout(() => {
            image.style.backgroundImage = result ? "url('./heads.png')" : "url('./tails.png')";
            image.classList.remove('animate');
        }, 1000);
    }

    function updateScore(result, userSelection, computerSelection) {
        if ((userSelection === 'heads' && result === 1) || (userSelection === 'tails' && result === 0)) {
            userScore++;
        }
        if ((computerSelection === 'heads' && result === 1) || (computerSelection === 'tails' && result === 0)) {
            computerScore++;
        }

        document.querySelector('#player-score').textContent = userScore;
        document.querySelector('#computer-score').textContent = computerScore;
    }

    function checkWinner() {
        const winnerDisplay = document.querySelector('#winner');
        if (userScore === 5 && computerScore === 5) {
            winnerDisplay.innerHTML = "<h1>It's a Tie</h1>";
        } else if (userScore === 5) {
            winnerDisplay.innerHTML = "<h1>You Win!!!</h1>";
        } else if (computerScore === 5) {
            winnerDisplay.innerHTML = "<h1>Computer Wins!!!</h1>";
        }
    }
});