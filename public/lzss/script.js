
const id = (id = '') => {
    return document.getElementById(id);
}
const input = id('input');
const output = id('output');
output.innerHTML = "asd";

const MIN_LOOKAHEAD_BUFFER = 2;
const MIN_SEARCH_BUFFER = 2;

const lookaheadBuffer = id('lookahead');
let lookaheadBufferLength = Math.max(MIN_LOOKAHEAD_BUFFER,Number(lookaheadBuffer.value));
lookaheadBuffer.addEventListener("input", () => {
    console.log('Changed look-ahead buffer length to ', Math.max(MIN_LOOKAHEAD_BUFFER,Number(lookaheadBuffer.value)))
    lookaheadBufferLength = Math.max(MIN_LOOKAHEAD_BUFFER, Number(lookaheadBuffer.value));
    run();
});

const searchBuffer = id('search');
let searchBufferLength = Math.max(MIN_SEARCH_BUFFER, Number(searchBuffer.value));
searchBuffer.addEventListener("input", () => {
    console.log('Changed search buffer length to ', Math.max(MIN_SEARCH_BUFFER, Number(searchBuffer.value)))
    searchBufferLength = Math.max(MIN_SEARCH_BUFFER, Number(searchBuffer.value));
    run();
});

const createHtml = (compressedValue) => {
    let html = '';
    compressedValue.forEach(value => {
        if (typeof value === 'string') {
            html += value;
        } else {
            html += `<span class="c"><span>${value[1]}</span><span>${value[2]}</span></span>`;
        }
    })
    return `<div>decompressed: ${decompress(compressedValue)}</div><div>${html}</div>`;
}

const decompress = (compressedValue) => {
    let charArray = [];
    compressedValue.forEach(value => {
        if (typeof value === 'string') {
            charArray.push(value);
        } else {
            console.log(value)
            const offset = value[1];
            const length = value[2];
            for (let i = 0; i < length; i++) {
                const offsetCharacter = charArray[i+offset];
                console.log(offsetCharacter)
                charArray.push(offsetCharacter);
            }
        }
    })
    return charArray.join('');
}



const run = () => {

    const inputValue = input.value;

    let searchBuffer = "";
    let lookaheadBuffer = "";

    let compressedValue = [];

    const getStringFromOffset = (value) => {
        if (typeof value === 'string') {
            return value;
        } else {
            return getStringFromOffset(value)
        }
    }

    // console.log(inputValue.length)

    const inputArray = inputValue.split("")

    for (let i = 0; i < inputValue.length; i++) {
        lookaheadBuffer = inputValue.substring(i, i + lookaheadBufferLength);



        // console.log({lookaheadBuffer, searchBuffer})

        let newValue = '';
        // let newSearchBufferString = '';
        // Find longest part of lookahead from search (minimum 2 characters)
        console.log("asd")
        // if (lookaheadBuffer.length >= MIN_LOOKAHEAD_BUFFER && searchBuffer.length >= MIN_SEARCH_BUFFER) {
            console.log("asd2")
            let found = false;

            for (let l = lookaheadBufferLength; l > 1; l--) {
                const searchString = lookaheadBuffer.substring(0, l);
                
                const searchBuffer = decompress(compressedValue);
                const offset = searchBuffer.indexOf(searchString);
                console.log(offset, searchString, searchBuffer)
                if (offset !== -1) {
                    found = true;
                    // console.log(searchString, offset, searchString.length, searchBuffer)
                    newValue = [i, offset, searchString.length];
                    // newSearchBufferString = searchString;
                    i += searchString.length;
                    break;
                }
            }
            if (!found) {
                newValue = inputArray[i];
                // newSearchBufferString = inputArray[i];
            }
        // } else {
        //     newValue = inputArray[i];
        //     // newSearchBufferString = inputArray[i];
        // }
        compressedValue.push(newValue); // Offset and length


        // searchBuffer += newSearchBufferString;
        // if (newSearchBufferString.length > searchBufferLength) {
        //     searchBuffer = searchBuffer.slice(-searchBufferLength);
        // }
    }

    
    console.log(compressedValue)
    output.innerHTML = createHtml(compressedValue);
}


input.addEventListener("input", run);

