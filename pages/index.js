import FormValidator from "../components/FormValidator.js"
import { config } from "../utils/config.js"
import { entryForm, inputRub, inputValute, select } from "../utils/constants.js"


const validateEmail = new FormValidator(config, entryForm);
validateEmail.enableValidation();

let rates = {}

//Получаем объект с курсами валют
async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates = result.Valute
    let valutes = Object.keys(result.Valute)
    let values = Object.values(result.Valute)
    
    for (let i = 0; i < valutes.length; i++) {
        let newOption = new Option(valutes[i] + ` - ${values[i].Name}`)
        select.append(newOption)
    }

    inputRub.oninput = converteValute;
    select.oninput = converteValute;
    
    function converteValute() {
        inputValute.value = (parseFloat(inputRub.value) / rates[select.value.substr(0, 3)].Value).toFixed(2)
    }
}

getCurrencies()
