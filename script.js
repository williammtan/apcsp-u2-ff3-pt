import textToMorse from'./textToMorse.json' assert {type: 'json'}; // src: https://bobbyhadz.com/blog/javascript-import-json-file
import morseToText from './morseToText.json' assert {type: 'json'};

function translateMT() { // translate morse to txt
    let input = document.getElementById("inputMT").value;
    let output = document.getElementById("outputMT");
    let error = document.getElementById("errorMT");
    let result = "";

    if (input == "") {
        // reset and skip all if empty
        output.value = "";
        error.innerHTML = "";
        return;
    }

    let chars = input.split(' '); // array of words
    for(let i=0;i<chars.length;i++) {
        // iterate over all characters, checking if they are valid (exist in the dictionary keys), get the value, and add it to the result variable

        let char = morseToText[chars[i]];
        if (chars[i] == "") {
            continue;
        }
        if (char == undefined) {
            error.innerHTML = "unknown morse character: <strong>" + chars[i] + "</strong>";
            break;
        } else { 
            error.innerHTML = "";
        }
        result += char;
    }

    output.value = result;
}

function translateTM() {
    let inputDiv = document.getElementById("inputTM")
    let output = document.getElementById("outputTM");
    let table = document.getElementById("tableTM");
    let result = "";

    let input = inputDiv.value.replace(/  +/g, ' '); // use regex to replace 2 or more spaces with only 1 spaces
    inputDiv.value = input; // replace the inputDiv value with the cleaned value, so the user can't add more than 1 spaces next to each other
    

    if (input.length > 0) {
        let tableText = "<tr><td><b>char</b></td><td><b>morse</b></td></tr>"; // table header

        for(let i=0;i<input.length;i++) {
            // iterate input text, map value to textToMorse object

            let char = textToMorse[input[i]];
            if (char == undefined) {
                // if char does not exist, display the undefined symbol
                tableText += `<tr class="table-danger"><td>${input[i]}</td><td>${char}</td></tr>`;
                continue;
            }
            result += char + " ";

            tableText += `<tr><td>${input[i]}</td><td>${char}</td></tr>`;
        }
    
        output.value = result; // write to output
        table.innerHTML = tableText; // rewrite the table every time

    } else {
        // if empty, reset output and table
        output.value = "";
        table.innerHTML = "";
    }

}

function addToWords() {
    let wordDiv = document.getElementById("myWords");
    let helpI = document.getElementById("help");
    let word = document.getElementById("inputTM").value;
    let morse = document.getElementById("outputTM").value;
    let newWord = document.createElement("code");
    helpI.innerHTML = "hint: hover over me to see the real word!";
    newWord.innerHTML = morse;
    newWord.title = word;
    wordDiv.appendChild(newWord);
    wordDiv.appendChild(document.createElement("br"));
}

// since it's a module, it is not directly accessable in html
// so we'll have to define the event listeners in javacsript
document.getElementById("inputMT").addEventListener('keyup', translateMT);
document.getElementById("inputTM").addEventListener('keyup', translateTM);
document.getElementById("addToWords").addEventListener('click', addToWords);