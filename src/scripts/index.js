import '../styles/index.scss';

let button = document.getElementById("calculate");
button.onclick = () => {
  let values = readValuesFromUi();
  let calculatedCompoundInterest = calculate(values);
  renderCalculatedResultToUi(calculatedCompoundInterest);
};

const readValuesFromUi = () => {
  let readValues = {};
  readValues.principalAmount = document.getElementById(
    "principal-amount"
  ).value;
  readValues.annualInterest = document.getElementById("interest-rate").value;
  readValues.calculationPeriod = document.getElementById(
    "calculation-period"
  ).value;
  readValues.compoundInterval = document.getElementById("interval").value;
  return readValues;
};

const calculate = values => {
  let calculatedCompoundInterest = [];
  for (let i = 0; i < values.calculationPeriod; i++) {
    values.years = i + 1;
    calculatedCompoundInterest[i] = calculateCompoundInterest(values);
  }
  return calculatedCompoundInterest;
};

const calculateCompoundInterest = values => {
  let result = {};
  let amount =
    values.principalAmount *
    Math.pow(
      1 + values.annualInterest / (values.compoundInterval * 100),
      values.compoundInterval * values.years
    );
  result.interest = (amount.toFixed(2) - values.principalAmount).toFixed(2);
  result.principal = amount.toFixed(2);
  return result;
};

const renderCalculatedResultToUi = calculatedCompoundInterest => {
  let innerHtml = "";
  innerHtml +=
    '<table><th ><tr class="table_header"><td>Year</td><td>Interest</td><td>Total amount</td></tr></th>';
  calculatedCompoundInterest.forEach((value, index) => {
    let row = "<tr>";
    row += "<td>" + (index + 1) + "</td>";
    row += "<td>" + value.interest + "</td>";
    row += "<td>" + value.principal + "</td>";
    row += "</tr>";
    innerHtml += row;
  });
  innerHtml += "</table>";
  document.getElementById("result").innerHTML = innerHtml;
};

let validationResultInfo = {
  isPrincipalAmountValid: false,
  isAnnualInterestValid: false,
  isCalculationPeriodValid: false,
  isCompoundTimesValid: false
};

let principalAmountInputElement = document.getElementById("principal-amount");
principalAmountInputElement.onkeyup = () => {
  validatePrincipalAmount();
};

principalAmountInputElement.onchange= () => {
  validatePrincipalAmount();
};

principalAmountInputElement.onblur= () => {
  validatePrincipalAmount();
};

const validatePrincipalAmount = () => {
  validationResultInfo.isPrincipalAmountValid = true;
  clearValidationError("principal-amount-required");
  clearValidationError("principal-amount-invalid");
  const principalAmount = principalAmountInputElement.value;
  if (principalAmount == "") {
    validationResultInfo.isPrincipalAmountValid = false;
    setValidationError("principal-amount-required");
  }

  if (isNaN(principalAmount) || (principalAmount < 0 && !isFinite(p))) {
    validationResultInfo.isPrincipalAmountValid = false;
    setValidationError("principal-amount-invalid");
  }
  setButtonStateIfNeeded();
};

let annualInterestRateInputElement = document.getElementById("interest-rate");
annualInterestRateInputElement.onkeyup = () => {
  validateAnnualInterest();
};

annualInterestRateInputElement.onchange= () => {
  validateAnnualInterest();
};

annualInterestRateInputElement.onblur= () => {
  validateAnnualInterest();
};
const validateAnnualInterest = () => {
  validationResultInfo.isAnnualInterestValid = true;
  clearValidationError("annual-interest-rate-required");
  clearValidationError("annual-interest-rate-invalid");
  let r = annualInterestRateInputElement.value;
  if (r == "") {
    validationResultInfo.isAnnualInterestValid = false;
    setValidationError("annual-interest-rate-required");
  }
  if (isNaN(r) || r < 0) {
    validationResultInfo.isAnnualInterestValid = false;
    setValidationError("annual-interest-rate-invalid");
  }
  setButtonStateIfNeeded();
};

let calculationPeriodInputElement = document.getElementById("calculation-period");
calculationPeriodInputElement.onkeyup = () => {
  validateCalculationPeriod();
};

calculationPeriodInputElement.onchange= () => {
  validateCalculationPeriod();
};

calculationPeriodInputElement.onblur= () => {
  validateCalculationPeriod();
};
const validateCalculationPeriod = () => {
  validationResultInfo.isCalculationPeriodValid = true;
  clearValidationError("calculation-period-required");
  clearValidationError("calculation-period-invalid");
  let calculationPeriod = calculationPeriodInputElement.value;
  if (calculationPeriod == "") {
    validationResultInfo.isCalculationPeriodValid = false;
    setValidationError("calculation-period-required");
  }
  if (isNaN(calculationPeriod) || calculationPeriod < 0) {
    validationResultInfo.isCalculationPeriodValid = false;
    setValidationError("calculation-period-invalid");
  }
  setButtonStateIfNeeded();
};

let compoundTimesPerYearInputElement = document.getElementById("interval");
compoundTimesPerYearInputElement.onkeyup = () => {
  validateCompoundTimes();
};

compoundTimesPerYearInputElement.onchange= () => {
  validateCompoundTimes();
};

compoundTimesPerYearInputElement.onblur= () => {
  validateCompoundTimes();
};
const validateCompoundTimes = () => {
  validationResultInfo.isCompoundTimesValid = true;
  clearValidationError("compound-times-required");
  clearValidationError("compound-times-invalid");
  let compoundTimes = compoundTimesPerYearInputElement.value;
  if (compoundTimes == "") {
    validationResultInfo.isCompoundTimesValid = false;
    setValidationError("compound-times-required");
  }
  if (isNaN(compoundTimes) || compoundTimes < 0) {
    validationResultInfo.isCompoundTimesValid = false;
    setValidationError("compound-times-invalid");
  }
  setButtonStateIfNeeded();
};

const setValidationError = elementId => {
  let label = document.getElementById(elementId);
  let customAttr = document.createAttribute("class");
  customAttr.value = "input-validation-error";
  label.attributes.setNamedItem(customAttr);
};

const clearValidationErrors = elementId => {
  clearValidationError("principal-amount-required");
  clearValidationError("principal-amount-invalid");

  clearValidationError("annual-interest-rate-required");
  clearValidationError("annual-interest-rate-invalid");

  clearValidationError("calculation-period-required");
  clearValidationError("calculation-period-invalid");

  clearValidationError("compound-times-required");
  clearValidationError("compound-times-invalid");
};

const clearValidationError = elementId => {
  let label = document.getElementById(elementId);
  let customAttr = document.createAttribute("class");
  customAttr.value = "input-validation-error-hidden";
  label.attributes.setNamedItem(customAttr);
};

const setButtonStateIfNeeded = () => {
  if (!areAllFieldsValid()) {
    document.getElementById("calculate").disabled = true;
  } else {
    document.getElementById("calculate").disabled = false;
  }
};

const areAllFieldsValid = () => {
  if (
    validationResultInfo.isPrincipalAmountValid &&
    validationResultInfo.isAnnualInterestValid &&
    validationResultInfo.isCalculationPeriodValid &&
    validationResultInfo.isCompoundTimesValid
  ) {
    return true;
  }

  return false;
};
setButtonStateIfNeeded();
