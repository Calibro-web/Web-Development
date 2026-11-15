import countryList from "./code.js";

let BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const excRate = document.querySelector("#excRate");

const form = document.querySelector("form");
const main = document.querySelector(".main");
const title = document.querySelector("#title");
const button = document.querySelector("button");

function updateMargin() {
  const isFullscreen =
    window.innerWidth >= screen.width && window.innerHeight >= screen.height;

  form.style.marginTop = isFullscreen ? "22vh" : "15vh";
  main.style.height = isFullscreen ? "63vmin" : "70vmin";
  main.style.width = isFullscreen ? "58vmin" : "60vmin";
  title.style.marginTop = isFullscreen ? "40px" : "22px";
  button.style.marginTop = isFullscreen ? "30px" : "20px";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F11") {
    setTimeout(updateMargin, 100);
  }
});

window.addEventListener("resize", updateMargin);
updateMargin();

const selects = document.querySelectorAll("select");

for (let country in countryList) {
  for (let select of selects) {
    let option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.appendChild(option);
  }
}

const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");

fromSelect.value = "USD";
toSelect.value = "INR";

fromSelect.addEventListener("change", (e) => {
  let fromCode = e.target.value;
  const fromImg = document.querySelector(".from img");
  fromImg.src = `https://flagsapi.com/${countryList[fromCode]}/flat/64.png`;
});
toSelect.addEventListener("change", (e) => {
  let toCode = e.target.value;
  const toImg = document.querySelector(".to img");
  toImg.src = `https://flagsapi.com/${countryList[toCode]}/flat/64.png`;
});

const amount = document.querySelector(".amount input");
const rate = document.querySelector("#excRate");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    alert("Please enter a valid amount.");
    amount.value = 1;
  }
  let api = `${BASE_URL}/${fromSelect.value.toLowerCase()}.json`;
  let response = await fetch(api);
  let data = await response.json();
  let value = data[fromSelect.value.toLowerCase()];
  let exhange = value[toSelect.value.toLowerCase()];
  let finalValue = amtValue * exhange;
  showValue(finalValue, amtValue);
});

let showValue = (finalValue, amtValue) => {
  excRate.innerText = `${amtValue}${fromSelect.value} = ${finalValue}${toSelect.value}`;
};
