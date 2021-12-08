// THIS IS A VERY BAD SOLUTION, BECAUSE THE ONLY THING I RESEARCHED ONLINE WAS UI ELEMENTS,
// PLEASE DO NOT FOLLOW THIS CODE TO MAKE A WORKING CALCULATOR, IT WORKS BUT ONLY BECAUSE OF
// TRIAL AND ERROR, I DID NOT FOLLOW ANY GUIDELINES OR ALGORITHMS ON HOW TO MAKE A PROPER CALCULATOR.




//UI elements
const screenContent = document.querySelector(".screenContent");
const buttons = document.querySelectorAll("Button");
const ClearButton = document.querySelector(".clearButton");
const backspaceButton = document.querySelector(".backspaceButton");
const switchSignButton = document.querySelector(".switchSign");
let numberA;
let numberB;
screenContent.textContent = 0;
let lastDoneOperation;
let lastClickedButtonType;
let operationResult;
let mathExpression= "";


buttons.forEach(function(curButton){
    curButton.addEventListener("click",(target)=> handleButtonClick(target));
});

function handleButtonClick(currentTarget){
    let targetId = currentTarget.target.id;
    let targetClass = currentTarget.target.className;
    if(targetId=="clear"){
        console.log("Clear was pressed");
        screenContent.textContent=0;
        lastDoneOperation = undefined;
        lastClickedButtonType = undefined;
        operationResult = undefined;
        mathExpression= undefined;
        numberA = undefined;
        numberB = undefined;
    }
    else if(targetId=="delete"){
        if(lastClickedButtonType=="number"){
            screenContent.textContent = screenContent.textContent.slice(0,-1);
            if(screenContent.textContent.length==0){
                screenContent.textContent=0;
            }
            console.log("Delete was pressed");
        }
        
    }
    else if(targetId=="switchSign"){
        if(lastClickedButtonType=="number"){
            screenContent.textContent = switchSignFunction(parseFloat(screenContent.textContent));
        }
    }
    else{
        if(targetClass.includes("number")){
            console.log("PRESSED NUMBER : " + targetId);
                // ----------------------------
                //? This block is working well, makes zeros disapear when typing a number and stops spamming 0
            if(screenContent.textContent=="0"){
                if(targetId=="0"){
                    console.log(screenContent.textContent);
                    //? do nothing if there is 0 only and user is spamming 0
                }
                else if(targetId=="."){
                    screenContent.textContent="0."
                }
                else{ 
                    screenContent.textContent=targetId;
                }
            }
            // -----------------------------------
            
            else if(targetId=="."){         //? Handles the decimal dot
                if(!screenContent.textContent.includes(".")){
                    if(lastClickedButtonType=="operation"){
                        screenContent.textContent="0.";
                    }
                    else{
                        screenContent.textContent= screenContent.textContent+".";
                    }
                }

            }

            else{
                screenContent.textContent=screenContent.textContent+targetId;
                if(lastClickedButtonType=="operation"){
                    if(lastDoneOperation=="="){
                        ClearButton.click();
                    }
                    screenContent.textContent="";
                    screenContent.textContent=screenContent.textContent+targetId;
                }
            }
            lastClickedButtonType="number";

        }
        else if(targetClass.includes("operation")){

            switch(targetId){
                case("+"):
                if(lastClickedButtonType!="operation"){
                    if(numberA == undefined){
                        numberA = parseFloat(screenContent.textContent);
                        console.log("A VAR IS EMPTY, Filling it with : " +  numberA);
                    }
                    else if(numberB == undefined){
                        numberB = parseFloat(screenContent.textContent);
                        console.log("B VAR IS EMPTY, Filling it with : " +  numberB);
                    }
                    if(calculationLogic(numberA, numberB, lastDoneOperation)=="DIV_0"){
                        ClearButton.click();
                        break;
                    }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                    break;

                case("-"):
                if(lastClickedButtonType!="operation"){
                    if(numberA == undefined){
                        numberA = parseFloat(screenContent.textContent);
                        console.log("A VAR IS EMPTY, Filling it with : " +  numberA);
                    }
                    else if(numberB == undefined){
                        numberB = parseFloat(screenContent.textContent);
                        console.log("B VAR IS EMPTY, Filling it with : " +  numberB);
                    }
                    if(calculationLogic(numberA, numberB, lastDoneOperation)=="DIV_0"){
                        ClearButton.click();
                        break;
                    }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                    break;


                case("*"):
                if(lastClickedButtonType!="operation"){
                    if(numberA == undefined){
                        numberA = parseFloat(screenContent.textContent);
                        console.log("A VAR IS EMPTY, Filling it with : " +  numberA);
                    }
                    else if(numberB == undefined){
                        numberB = parseFloat(screenContent.textContent);
                        console.log("B VAR IS EMPTY, Filling it with : " +  numberB);
                    }
                    if(calculationLogic(numberA, numberB, lastDoneOperation)=="DIV_0"){
                        ClearButton.click();
                        break;
                    }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                    break;


                case("/"):                    
                if(lastClickedButtonType!="operation"){
                    if(numberA == undefined){
                        numberA = parseFloat(screenContent.textContent);
                        console.log("A VAR IS EMPTY, Filling it with : " +  numberA);
                    }
                    else if(numberB == undefined){
                        numberB = parseFloat(screenContent.textContent);
                        console.log("B VAR IS EMPTY, Filling it with : " +  numberB);
                    }
                    if(calculationLogic(numberA, numberB, lastDoneOperation)=="DIV_0"){
                        ClearButton.click();
                        break;
                    }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                    break;


                case("="):
                if(lastClickedButtonType!="operation"){
                    if(numberA == undefined){
                        numberA = parseFloat(screenContent.textContent);
                        console.log("A VAR IS EMPTY, Filling it with : " +  numberA);
                    }
                    else if(numberB == undefined){
                        numberB = parseFloat(screenContent.textContent);
                        console.log("B VAR IS EMPTY, Filling it with : " +  numberB);
                    }
                    if(calculationLogic(numberA, numberB, lastDoneOperation)=="DIV_0"){
                        ClearButton.click();
                        break;
                    }
                    lastDoneOperation=targetId;
                    lastClickedButtonType="operation";
                }
                    break;

            }
        }
    }
}

function evaluate(expression){
    //? Regex that tests for a pattern of ( Float / Operator / Float ) to validate if its a mathematical expression
    if(/^([-+]?)+(\d+((\.\d+)?)+[-+/*]+\d+(\.\d+)?)/g.test(expression)){
            console.log("Valid math expression");
            return true;
    }
    return false;
}

function calculationLogic(){
    if(numberA!=undefined && numberB!=undefined){
        console.log("Number A is : " + numberA);
        console.log("Number B is : " + numberB);
        mathExpression = parseFloat(numberA) + lastDoneOperation + parseFloat(numberB);
        if(evaluate(mathExpression)){
            operationResult = parseFloat(SolveExpression(numberA,numberB,lastDoneOperation));
            if(!isNaN(operationResult)){
                operationResult = parseFloat(operationResult.toFixed(10));
            }
            else{
                //? this is a hack to reset calculator after division by 0
                alert("Stop dividing by 0, do you want to create a blackhole ?")
                return "DIV_0";

            }
            screenContent.textContent=operationResult;
            if(operationResult!="DONE"){
                screenContent.textContent=operationResult;
                numberA = operationResult;
                numberB = undefined;
                console.log(operationResult);
            }
        mathExpression=undefined;
        
        }
        else{
            console.log(mathExpression);
            console.log("Invalid math Expression");
        }
    }
}

function SolveExpression(numberA,numberB,lastDoneOperation){
    numberA = parseFloat(numberA);
    numberB = parseFloat(numberB);
    switch(lastDoneOperation){
        case("+"):
            return addition(numberA, numberB);
            break;
        case("-"):
            return substraction(numberA, numberB);
            break;
        case("*"):
            return multiplication(numberA, numberB);
            break;
        case("/"):
            return division(numberA, numberB);
            break;
        case("="):
            return "DONE";
            break;
    }
}


// Arithemtic functions
function addition(a,b){
    return parseFloat(a+b);
}

function substraction(a,b){
    return parseFloat(a-b);
}

function multiplication(a,b){
    return parseFloat(a*b);
}

function division(a,b){
    if(b!=0){
        return parseFloat(a/b);
    }
    else{
        return "Error, division by 0";
    }
}

function switchSignFunction(x){
    return parseFloat(-x);
}
