const convertButton = document.querySelector(".convert-button");
const fromCurrencySelect = document.querySelector(".from-currency-select");
const toCurrencySelect = document.querySelector(".currency-select");
const inputCurrency = document.querySelector(".input-currency");

const rates = {
  real: 1,
  dolar: 5.2,
  euro: 6.2,
  bitcoin: 338915.24,
  libra: 6.55,
};

const currencyInfo = {
  real: {
    name: "Real Brasileiro",
    img: "assets/real.png",
    locale: "pt-BR",
    currencyCode: "BRL",
  },
  dolar: {
    name: "Dólar Americano",
    img: "assets/dolar.png",
    locale: "en-US",
    currencyCode: "USD",
  },
  euro: {
    name: "Euro",
    img: "assets/euro.png",
    locale: "de-DE",
    currencyCode: "EUR",
  },
  bitcoin: {
    name: "Bitcoin",
    img: "assets/bitcoin.png",
    locale: null,
    currencyCode: null,
  },
  libra: {
    name: "Libra Esterlina",
    img: "assets/libra.png",
    locale: "en-GB",
    currencyCode: "GBP",
  },
};

function formatCurrencyValue(currencyKey, value) {
  const info = currencyInfo[currencyKey];

  if (currencyKey === "bitcoin") {
    return `₿ ${value.toFixed(8)}`;
  }

  return new Intl.NumberFormat(info.locale, {
    style: "currency",
    currency: info.currencyCode,
  }).format(value);
}

function updateCurrencyBox(selectEl, nameEl, imgEl) {
  const key = selectEl.value;
  const info = currencyInfo[key];

  nameEl.innerHTML = info.name;
  imgEl.src = info.img;
}

function convertValues() {
  const rawValue = inputCurrency.value.replace(",", ".");
  const inputValue = parseFloat(rawValue) || 0;

  const fromKey = fromCurrencySelect.value;
  const toKey = toCurrencySelect.value;

  const valueInReal = inputValue * rates[fromKey];
  const convertedValue = valueInReal / rates[toKey];

  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert",
  );
  const currencyValueConverted = document.querySelector(".currency-value");

  currencyValueToConvert.innerHTML = formatCurrencyValue(fromKey, inputValue);
  currencyValueConverted.innerHTML = formatCurrencyValue(toKey, convertedValue);
}

function changeCurrency() {
  updateCurrencyBox(
    fromCurrencySelect,
    document.getElementById("currency-name-from"),
    document.querySelector(".m-real"),
  );

  updateCurrencyBox(
    toCurrencySelect,
    document.getElementById("currency-name"),
    document.querySelector(".currency-img"),
  );

  convertValues();
}

fromCurrencySelect.addEventListener("change", changeCurrency);
toCurrencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

changeCurrency();
