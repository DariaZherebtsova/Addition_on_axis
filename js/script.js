
//рандомно выбираем числа для примера
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

let num1 = randomInteger(6,9);
let num2 = randomInteger(11-num1,14-num1);

//вставляем пример на страницу
document.querySelector('.example.math').innerHTML = `<span class="val_num1">${num1}</span> + ` +
                                                    `<span class="val_num2">${num2}</span> = ` +
                                                    `<span class="question">?</span>`;

//задержка появления первой стрелочки
setTimeout(addArrow1, 1000);

function addArrow1() {
    let arrow1 = document.querySelector('.arrow.number1');
    arrow1.innerHTML = `<div class="number_on_arrow">
                            <input class="number1" type="text" maxlength="1">
                        </div>
                        <svg class="arrow_image number1" >
                          ${arrows[num1]}
                        </svg>`;
    arrow1.style.width = `${arrows_width[num1]}px`;
    arrow1.style.height = `${arrows_height[num1]}px`;
    let input_num1 = document.querySelector("input.number1");
    input_num1.focus();
    input_num1.addEventListener("keypress", inputRestriction);
    input_num1.addEventListener("input", onNumber1Input);
}

//обработка ввода первого числа
function onNumber1Input(event) {
    let number_input = event.currentTarget;
    let user_num = + number_input.value;
    //если введено неправильное значение
    if (user_num !== num1){
        number_input.classList.add("badValue");
        document.querySelector(".val_num1").classList.add("mark");
    }
    else {
        number_input.parentNode.innerHTML = `${num1}`;
        document.querySelector(".val_num1").classList.remove("mark");

        //задержка появления второй стрелочки
        setTimeout(addArrow2, 700);
    }
}

function addArrow2() {
    let arrow2 = document.querySelector(".arrow.number2");
    arrow2.innerHTML = `<div class="number_on_arrow">
                          <input  class="number2" type="text" maxlength="1">
                        </div>
                        <svg class="arrow_image number2" >
                          ${arrows[num2]}
                        </svg>`;
    arrow2.style.width = `${arrows_width[num2]}px`;
    arrow2.style.height = `${arrows_height[num2]}px`;
    arrow2.style.left = `${arrows_width[num1]+38}px`;
    let input_num2 = document.querySelector("input.number2");
    input_num2.focus();
    input_num2.addEventListener("keypress", inputRestriction);
    input_num2.addEventListener("input", onNumber2Input);
}

//обработка ввода второго числа
function onNumber2Input(event) {
    let number_input = event.currentTarget;
    let user_num = + number_input.value;
    //если введено неправильное значение
    if (user_num !== num2){
        number_input.classList.add("badValue");
        document.querySelector(".val_num2").classList.add("mark");
    }
    else {
        number_input.parentNode.innerHTML = `${num2}`;
        document.querySelector(".val_num2").classList.remove("mark");

        //задержка появления input ответа
        setTimeout(addAnswerInput, 700);
    }
}

function addAnswerInput() {
    document.querySelector(".question").innerHTML = "";
    document.querySelector(".example").insertAdjacentHTML("beforeEnd",`<input class="answer" type="text" maxlength="2">`);
    let answer_input = document.querySelector(".answer");
    answer_input.focus();
    answer_input.addEventListener("input", onAnswerInput);
}
//проверка ответа
function onAnswerInput(event) {
    let answerInput = event.currentTarget;
    let userAnswer = +answerInput.value;
    //проверяем только когда введут две цифры
    if (userAnswer > 9) {
        console.log(userAnswer);
        //если введено неправильное значение
        if (userAnswer !== (num1+num2)){
            answerInput.classList.add("badValue");
        }
        else {
            console.log("all right");
            document.querySelector(".example").removeChild(answerInput);
            document.querySelector(".example").insertAdjacentHTML("beforeEnd",`${num1+num2}`);

            //задержка перед перезагрузкой
            setTimeout(reload, 1200);
        }
    }
}
//перезагрузка страницы, чтобы появился новый пример
function reload() {
    window.location.reload();
}

//разрешаем вводить только цифры
function inputRestriction(e) {
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);
    if (chr == null) return;
    if (chr < '0' || chr > '9') {
        e.preventDefault();
    }
}
//кросс-браузерная функция для получения символа из события keypress
function getChar(event) {
    if (event.which == null) { // IE
        if (event.keyCode < 32) return null; // спец. символ
        return String.fromCharCode(event.keyCode)
    }

    if (event.which != 0 && event.charCode != 0) { // все кроме IE
        if (event.which < 32) return null; // спец. символ
        return String.fromCharCode(event.which); // остальные
    }

    return null; // спец. символ
}

//массив стрелок
let arrows = ['0',
              '1',
    `<path fill="none" stroke-width="2" d="M0,75 C 10,25 67,25 75,75" />
                    <line x1="76" y1="75" x2="66" y2="66" stroke-width="2" />
                    <line x1="76" y1="75" x2="76" y2="63" stroke-width="2" />`,
    `<path fill="none" stroke-width="2" d="M0,75 C 15,10 100,10 114,75" />
                    <line x1="115" y1="75" x2="105" y2="66" stroke-width="2" />
                    <line x1="115" y1="75" x2="115" y2="63" stroke-width="2" />`,
    `<path fill="none" stroke-width="2" d="M0,75 C 19,0 137,0 153,75" />
                    <line x1="153" y1="75" x2="143" y2="66" stroke-width="2" />
                    <line x1="154" y1="75" x2="154" y2="63" stroke-width="2" />`,
    `<path fill="none" stroke-width="2" d="M0,75 C 19,-7 173,-7 193,75" />
                    <line x1="193" y1="75" x2="185" y2="66" stroke-width="2" />
                    <line x1="193" y1="75" x2="193" y2="63" stroke-width="2" />`,
    `<path fill="none" stroke-width="2" d="M0,75 C 19,-10 213,-10 232,75" />
                    <line x1="232" y1="75" x2="224" y2="66" stroke-width="2" />
                    <line x1="232" y1="75" x2="232" y2="63" stroke-width="2" />`,
    `<path fill="none" stroke-width="2" d="M0,75 C 25,-15 245,-15 271,75" />
                    <line x1="271" y1="75" x2="263" y2="66" stroke-width="2" />
                    <line x1="271" y1="75" x2="271" y2="63" stroke-width="2" />`,
    `<path fill="none" stroke-width="2" d="M0,75 C 25,-20 285,-20 310,75" />
                    <line x1="310" y1="75" x2="302" y2="66" stroke-width="2" />
                    <line x1="310" y1="75" x2="310" y2="63" stroke-width="2" />`,
    `<path fill="none" stroke-width="2" d="M0,75 C 29,-23 320,-23 349,75" />
                    <line x1="349" y1="75" x2="340" y2="66" stroke-width="2" />
                    <line x1="349" y1="75" x2="349" y2="63" stroke-width="2" />`,
];

let arrows_width = [0, 1, 76, 115, 154, 193, 232, 271, 310, 349];

let arrows_height = [0, 1, 82, 92, 98, 102, 104, 108, 110, 110];