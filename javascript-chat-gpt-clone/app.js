const API_KEY = 'get yours, it is free';

const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

function changeInput(value) {
    const inputElement = document.querySelector('input');
    inputElement.value = value;
}

async function getMessage() {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{ role: "user", content: inputElement.value }],
                "max_tokens": 100
            })

        });
        const data = await response.json();
        outputElement.textContent = data.choices[0].message.content;
        if (data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement);
        }
    } catch (err) {
        console.error(err);
    }
}

function clearInput() {
    inputElement.value = '';
}

submitButton.addEventListener('click', getMessage);
buttonElement.addEventListener('click', clearInput)