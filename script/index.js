
// sound voice
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
}

// active class
function removeActiveClass() {
    const activeButton = document.getElementsByClassName('active');
    for (let btn of activeButton) {
        btn.classList.remove('active');
    }
}

// button item
function loadeCategory () {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => {
        // removeActiveClass()
        // document.getElementById('all-btn').classList.add('active');
        displayCategory(json.data);
    });
}

//lesson item
function loadLesson() {
    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(response => response.json())
    .then(data => displayLesson(data.data))
}

// Loade Category
function loadeCategoryLesson(id) {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActiveClass()
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add('active');
            displayLesson(json.data);
        });
}

// word details
const loadWordDetails = (wordId) => {
    console.log(wordId);
    const url = `https://openapi.programming-hero.com/api/word/${wordId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayWordDetails(data.data);
        });
}
// {
//     "id": 16,
//     "level": 2,
//     "word": "Morning",
//     "meaning": "সকাল",
//     "pronunciation": "মর্নিং",
//     "sentence": "I drink tea every morning.",
//     "points": 2,
//     "partsOfSpeech": "noun",
//     "synonyms": [
//         "dawn",
//         "daybreak"
//     ]
// }

// display details
const displayWordDetails = (word) => {
    console.log(word);
    document.getElementById('word_details').showModal();
    const detailsContainer = document.getElementById('details-containe');
    detailsContainer.innerHTML=`
        <div class="card-body">
            <h2 class="card-title fond-semibold text-[36px]">${word.word}</h2>
            <span class="text-2xl font-semibold">Meaning</span>
            <h3 class="font-medium text-xl">${word.meaning}</h3>
            <span class="text-xl font-bold">Example</span>
            <p>${word.sentence}</p>
            <h2 class="font-bold">Synonym</h2>
            <div class="">${word.synonyms}</div>
        </div>
    `;
   
}

// {"id":101,"level_no":1,"lessonName":"Basic Vocabulary"}

// {"id":2,"level":1,"word":"Book","meaning":"বই","pronunciation":"বুক"},{"id":3,"level":1,"word":"Water","meaning":"পানি","pronunciation":"ওয়াটার"},

// display category
function displayCategory(lessons) {
    const buttonContainer = document.getElementById('button-container');

    for (const lesson of lessons) {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <button id="btn-${lesson.level_no}" onclick="loadeCategoryLesson(${lesson.level_no})" class="btn border border-[#422AD5] bg-white text-[#422AD5] hover:bg-[#422AD5] hover:text-white">${lesson.lessonName}</button>
        `;
        buttonContainer.appendChild(newElement);
    }
}

// display lesson
const displayLesson = (words) => {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    if(words.length === 0) {
        mainContainer.innerHTML = `
            <div class="text-center col-span-full flex flex-col justify-center items-center py-[60px]">
                <img class="w-[120px]" src="assets/alert-error.png" alt="image">
                <span>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</span>
                <h2 class="text-2xl">নেক্সট Lesson এ যান</h2>
            </div>
        `
        return;
    }

    words.forEach(word => {
        // console.log(word);
        const lessonCard = document.createElement('div');
        lessonCard.innerHTML = `
        <div class="card w-full text-center bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title flex justify-center text-2xl">${word.word}</h2>
                <span>Meaning / Pronounciation</span>
                <p>${word.meaning} / ${word.pronunciation}</p>
                <div class="card-actions justify-between">
                    <button onclick="loadWordDetails('${word.id}')" class="btn"><img src="assets/info.png" alt="image"></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn"><img src="assets/volume.png" alt="image"></button>
                </div>
            </div>
        </div>
        `;
        mainContainer.appendChild(lessonCard);
    })
}

// Get all elements
const loginForm = document.getElementById("login-form");
const nameInput = document.getElementById("user-name");
const pinInput = document.getElementById("pin-number");

const navbar = document.getElementById("navbar");
const buttonContainer = document.getElementById("button-container");
const mainSection = document.getElementById("main-container");
const faqSection = document.getElementById("faq");
const footerSection = document.getElementById("footer");

// Login
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const pin = pinInput.value;

    // Check name and PIN
    if (name === "" || pin !== "1234") {
        alert("Right Your Name and 1234 PIN");
        return;
    }

    // Show all sections
    navbar.classList.remove("login-hidden");
    buttonContainer.classList.remove("login-hidden");
    mainSection.classList.remove("login-hidden");
    faqSection.classList.remove("login-hidden");
    footerSection.classList.remove("login-hidden");

    // Welcome message
    alert("Welcome " + name);
});

loadeCategory()