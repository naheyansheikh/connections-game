// Get references to the words and the button
const words = document.querySelectorAll('.word');
const checkButton = document.getElementById('checkButton');
const randomizeButton = document.getElementById('randomizeButton');
const wordsContainer = document.querySelector('.container');
const result = document.getElementById('result');
let selectedWordCount = 0;
const dots = document.querySelectorAll('.dot');
let trials = dots.length;
const currentDate = new Date();

// Add click event listeners to the words
words.forEach(word => {
    word.addEventListener('click', handleWordClick);
});

// Function to handle click on the check button
checkButton.addEventListener('click', function() {
    const selectedWords = document.querySelectorAll('.word.selected');
    
    // Check if exactly four words are selected
    if (selectedWords.length !== 4) {
        result.textContent = 'Select four words!';
        return;
    }
    
    const selectedWordTexts = Array.from(selectedWords).map(word => word.textContent);

    if (selectedWordTexts.includes('cat') && selectedWordTexts.includes('tail') && selectedWordTexts.includes('paws') && selectedWordTexts.includes('meow')) {
        result.textContent = 'correct! the connection is that they are parts of a cat!';
    } else if (selectedWordTexts.includes('red') && selectedWordTexts.includes('blue') && selectedWordTexts.includes('green') && selectedWordTexts.includes('orange')) {
        result.textContent = 'correct! the connection is that they are colours!';
    } else if (selectedWordTexts.includes('addition') && selectedWordTexts.includes('subtraction') && selectedWordTexts.includes('division') && selectedWordTexts.includes('multiplication')) {
        result.textContent = 'correct! the connection is that they are math operations!';
    } else if (selectedWordTexts.includes('hydrogen') && selectedWordTexts.includes('helium') && selectedWordTexts.includes('oxygen') && selectedWordTexts.includes('nitrogen')) {
        result.textContent = 'correct! the connection is that they are gases!';
    } else {
        result.textContent = 'incorrect! try again.';
        updateTrialCount();
        if (trials == 0) {
            showFailPopup();
        }
        return; // Exit the function if the answer is incorrect
    }

    markAsCorrect(selectedWords);

    const allWords = document.querySelectorAll('.word');
    allWords.forEach(word => {
        if (!word.classList.contains('correct')) {
            word.addEventListener('click', handleWordClick);
        }
    });

    checkIfAllCorrect();
});

function markAsCorrect(words) {
    words.forEach(word => {
        word.classList.add('correct');
        word.classList.remove('selected');
        word.removeEventListener('click', handleWordClick);
    });
}

// Function to handle click on words
function handleWordClick(event) {
    event.target.classList.toggle('selected');
}

function checkIfAllCorrect() {
    const allWords = document.querySelectorAll('.word');
    const correctWords = document.querySelectorAll('.word.correct');
    
    if (allWords.length === correctWords.length) {
        showSmallPopup();
    }
}

function showSmallPopup() {
    const smallPopup = document.getElementById('smallPopup');
    const header = document.querySelector('header');
    smallPopup.style.display = 'block';

    // Add event listener to close button
    const closeButton = smallPopup.querySelector('.close');
    closeButton.addEventListener('click', function() {
        smallPopup.style.display = 'none';
    });

    successPopup.classList.add('show');

    // Add event listener to close the popup when clicking outside it
    window.addEventListener('click', function(event) {
        if (event.target === smallPopup) {
            smallPopup.style.display = 'none';
        }
    });
}

function showFailPopup() {
    const failPopup = document.getElementById('failPopup');
    failPopup.style.display = 'block';
}

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to shuffle the words and update the display
function randomizeWords() {
    const wordsContainer = document.querySelector('.container');
    const words = Array.from(wordsContainer.querySelectorAll('.word'));
    const shuffledWords = shuffle(words);

    // Append shuffled words back to the container in a 4x4 grid layout
    for (let i = 0; i < shuffledWords.length; i++) {
        if (i % 4 === 0) {
            const connectionDiv = document.createElement('div');
            connectionDiv.classList.add('connection');
            wordsContainer.appendChild(connectionDiv);
        }
        wordsContainer.appendChild(shuffledWords[i]);
    }
}

// Function to update the number of trials
function updateTrialCount() {
    trials--;
    if (trials >= 0) {
            dots[trials].style.backgroundColor = 'transparent'; // Hide a dot
    }
}

const formattedDate = currentDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

// Add click event listener to the randomize button
randomizeButton.addEventListener('click', randomizeWords);

document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const playButton = document.getElementById('playButton');

    // Show popup when page loads
    popup.style.display = 'block';
    document.getElementById('date').textContent = formattedDate;

    // Handle click on play button
    playButton.addEventListener('click', function() {
        // Redirect to the game page
        popup.classList.add('top');
    });

    randomizeWords();
});



