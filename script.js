const number = document.querySelector('.firstDisplay');
const oldNumber = document.querySelector('.secondDisplay');

let plus = false;
let minus = false;
let multiply = false;
let divide = false;
let enter = false;
let in1 = false;
let in2 = false;

let calculation = 0;
let input1 = "";
let input2 = "";
let symbol = "";

function addFunc(input1,input2) {
	return (Number(input1) + Number(input2));
};

function subtractFunc(input1,input2) {
	return (Number(input1) - Number(input2));
};

function multiplyFunc(input1,input2) {
	return (Number(input1) * Number(input2));
};

function divideFunc(input1,input2) {
	return (Number(input1) / Number(input2));
};

function button(num){
    if (in1 === false){
        input1 += num;
        number.textContent = input1;
        symbol = "";
    } else if (enter == true){
        input2 += num;
        in2 = true;
        number.textContent = "input operator";
    } else {
        input2 += num;
        in2 = true;
        number.textContent = input1 + symbol + input2;
    }
}

function symbolBtn(symb,operator){
    enter = false;
    symbol = symb;
    number.textContent = symb;
    in1 = true;
    input2 = "";
    if (operator != true){      
        plus = false;
        minus = false;
        multiply = false;
        divide = false;
    }
}

function backspaceFunction(){
    let array = [...number.textContent];
    array.pop();
    for (let i = 0; i < array.length; i++){
        if (array[i] != 0 && array[i] == "-" || array[i] == "+" || array[i] == "*" || array[i] == "/"){
            sliced1 = array.slice(0,i);
            sliced2 = array.slice(i+1);
            input1 = sliced1.join('');
            input2 = sliced2.join(''); 
        }  
    }
    if (input2 != ""){
        number.textContent = input1 + symbol + input2;
    } 
    number.textContent = array.join("");
}

function enterFunction(){
    if (plus === true) {
        calculation = Math.round(addFunc(input1,input2) * 100)/ 100;
        plus = false;
        input2 = "";
        input1 = calculation
    } else if (minus === true) {
        calculation = Math.round(subtractFunc(input1,input2) * 100) / 100;
        minus = false;
        input2 = "";
        input1 = calculation; 
    } else if (multiply === true && input2 != "") {
        calculation = Math.round(multiplyFunc(input1,input2) * 100) / 100;
        multiply = false;
        input2 = "";
        input1 = calculation;
    } else if (divide === true && input2 != "") {
        calculation = Math.round(divideFunc(input1,input2) * 100) / 100;
        divide = false;
        input2 = "";
        input1 = calculation;
    }
    if (input2 === ""){
        oldNumber.textContent = input1;
    } else if (in1 == false) {
        oldNumber.textContent = number.innerText;
    } else {
        oldNumber.textContent = calculation;
    }
    enter = true;
    number.textContent = "";
}

function clearFunction(){
    number.textContent = 0;
    calculation = 0;
    input1 = "";
    in1 = false;
    input2 = "";
}

window.addEventListener('keydown', (keyDown) => {
    const keyCode = keyDown.key;
    const keyString = keyCode.toString();
    if (keyString >= 0 && keyString <= 9 || keyString == "."){
        keyString.charCodeAt();
        button(keyString);
    } else if (keyString == "+"){
        plus = true;
        symbolBtn("+",plus);
    } else if (keyString == "-"){
        minus = true; 
        symbolBtn("-",minus);
    } else if (keyString == "*"){
        multiply = true;
        symbolBtn("*",multiply);
    }   else if (keyString == "/"){
        divide = true;
        symbolBtn("/",divide);
    } else if (keyString == "Enter"){
        enterFunction(); 
    } else if (keyString == "Backspace"){
        backspaceFunction();
    } else if (keyString == "Escape"){
        clearFunction();
    } 
})

window.addEventListener('click', (click) => {
    const clickBtn = click.target;
    if (clickBtn.dataset.number >= 0 && clickBtn.dataset.number <= 9 || clickBtn.dataset.number == "."){
        button(clickBtn.dataset.number);
    } else if (clickBtn.dataset.key == "+"){
        plus = true;
        symbolBtn("+",plus);
    } else if (clickBtn.dataset.key == "-"){
        minus = true; 
        symbolBtn("-",minus);
    } else if (clickBtn.dataset.key == "*"){
        multiply = true;
        symbolBtn("*",multiply);
    }   else if (clickBtn.dataset.key == "/"){
        divide = true;
        symbolBtn("/",divide);
    } else if (clickBtn.dataset.key == "enter"){
        enterFunction(); 
    } else if (clickBtn.dataset.key == "backspace"){
        backspaceFunction();
    } else if (clickBtn.dataset.key == "clear"){
        clearFunction();
    } else if (clickBtn.dataset.key == "clearall"){
        clearFunction();
        oldNumber.textContent = 0;
    }
})

