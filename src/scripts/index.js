import '../styles/index.scss';

const myVariable = 100;

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

const validatePrincipalAmount = () => {
  validationResultInfo.isPrincipalAmountValid = true;
  clearValidationError("principal-amount-required");
  clearValidationError("principal-amount-invalid");
  let p = document.getElementById("principal-amount").value;
  if (p == "") {
    validationResultInfo.isPrincipalAmountValid = false;
    setValidationError("principal-amount-required");
  }

  if (isNaN(p) || (p < 0 && !isFinite(p))) {
    validationResultInfo.isPrincipalAmountValid = false;
    setValidationError("principal-amount-invalid");
  }
  setButtonStateIfNeeded();
};

const validateAnnualInterest = () => {
  validationResultInfo.isAnnualInterestValid = true;
  clearValidationError("annual-interest-rate-required");
  clearValidationError("annual-interest-rate-invalid");
  let r = document.getElementById("interest-rate").value;
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

const validateCalculationPeriod = () => {
  validationResultInfo.isCalculationPeriodValid = true;
  clearValidationError("calculation-period-required");
  clearValidationError("calculation-period-invalid");
  let t = document.getElementById("calculation-period").value;
  if (t == "") {
    validationResultInfo.isCalculationPeriodValid = false;
    setValidationError("calculation-period-required");
  }
  if (isNaN(t) || t < 0) {
    validationResultInfo.isCalculationPeriodValid = false;
    setValidationError("calculation-period-invalid");
  }
  setButtonStateIfNeeded();
};

const validateCompoundTimes = () => {
  validationResultInfo.isCompoundTimesValid = true;
  clearValidationError("compound-times-required");
  clearValidationError("compound-times-invalid");
  let c = document.getElementById("interval").value;
  if (c == "") {
    validationResultInfo.isCompoundTimesValid = false;
    setValidationError("compound-times-required");
  }
  if (isNaN(c) || c < 0) {
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
