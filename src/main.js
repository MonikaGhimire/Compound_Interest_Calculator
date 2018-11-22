
let button = document.getElementById('calculate');

button.onclick = () => {
    clearValidationErrors();
    let values = readValuesFromUi();
    let isValid = validate(values);
    if (!isValid) {
        return;
    };

    let calculatedCompoundInterest = calculate(values);
    renderCalculatedResultToUi(calculatedCompoundInterest);
}

const readValuesFromUi = () => {
    let readValues = {};
    readValues.principalAmount = document.getElementById('principal-amount').value;
    readValues.annualInterest = document.getElementById('interest-rate').value;
    readValues.calculationPeriod = document.getElementById('calculation-period').value;
    readValues.compoundInterval = document.getElementById('interval').value;
    return readValues;
}

const calculate = (values) => {
    let calculatedCompoundInterest = [];
    for (let i = 0; i < values.calculationPeriod; i++) {
        values.years = i + 1;
        calculatedCompoundInterest[i] = calculateCompoundInterest(values);
    }

    return calculatedCompoundInterest;
}

const calculateCompoundInterest = (values) => {
    let result = {};
    let amount = (values.principalAmount * Math.pow((1 + (values.annualInterest / (values.compoundInterval * 100))), (values.compoundInterval * values.years)));
    result.interest = (amount.toFixed(2) - values.principalAmount).toFixed(2);
    result.principal = amount.toFixed(2);
    return result;
}

const renderCalculatedResultToUi = (calculatedCompoundInterest) => {
    let innerHtml = '';
    innerHtml += '<table><th ><tr class="table_header"><td>Year</td><td>Interest</td><td>Total amount</td></tr></th>';
    calculatedCompoundInterest.forEach((value, index) => {
        let row = '<tr>';
        row += '<td>' + (index + 1) + '</td>';
        row += '<td>' + value.interest + '</td>';
        row += '<td>' + value.principal + '</td>';
        row += '</tr>';
        innerHtml += row;
    });
    innerHtml += '</table>';
    document.getElementById('result').innerHTML = innerHtml;

}

const validate = (values) => {

    let isValid = true;
    let p = document.getElementById('principal-amount').value;
    let r = document.getElementById('interest-rate').value;
    let t = document.getElementById('calculation-period').value;
    let c = document.getElementById('interval').value;
    if (p == '') {
        isValid = false;
        setValidationError('principal-amount-required');
    }
    if (r == '') {
        isValid = false;
        setValidationError('annual-interest-rate-required');
    }
    if (t == '') {
        isValid = false;
        setValidationError('calculation-period-required');
    }

    if (c == '') {
        isValid = false;
        setValidationError('compound-times-required');
    }

    if (isNaN(p) || p < 0 && !isFinite(n)) {
        isValid = false;
        setValidationError('principal-amount-invalid');
    }

    if (isNaN(r) || r < 0) {
        isValid = false;
        setValidationError('annual-interest-rate-invalid');
    }

    if (isNaN(t) || t < 0) {
        isValid = false;
        setValidationError('calculation-period-invalid');
    }
    if (isNaN(c) || c < 0) {
        isValid = false;
        setValidationError('compound-times-invalid');
    }

    return isValid;
}

const setValidationError = (elementId) => {
    let label = document.getElementById(elementId);
    let customAttr = document.createAttribute('class');
    customAttr.value = 'input-validation-error';
    label.attributes.setNamedItem(customAttr);
}

const clearValidationErrors = (elementId) => {
    clearValidationError('principal-amount-required');
    clearValidationError('principal-amount-invalid');

    clearValidationError('annual-interest-rate-required');
    clearValidationError('annual-interest-rate-invalid');

    clearValidationError('calculation-period-required');
    clearValidationError('calculation-period-invalid');

    clearValidationError('compound-times-required');
    clearValidationError('compound-times-invalid');
}

const clearValidationError = (elementId) => {
    let label = document.getElementById(elementId);

    let customAttr = document.createAttribute('class');
    customAttr.value = 'input-validation-error-hidden';
    label.attributes.setNamedItem(customAttr);
}
