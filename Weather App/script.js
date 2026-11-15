const title = document.querySelector("#title");
const body = document.querySelector(".body");
const btn = document.querySelector("#btn button");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humid");
const windSpeed = document.querySelector("#wind_speed");
const input = document.querySelector("input");

function updateMargin() {
  const isFullscreen =
    window.innerWidth >= screen.width && window.innerHeight >= screen.height;

  title.style.fontSize = isFullscreen ? "35px" : "25px";
  title.style.marginTop = isFullscreen ? "3.5rem" : "3rem";
  body.style.marginTop = isFullscreen ? "9rem" : "7rem";

  btn.style.marginTop = isFullscreen ? "50px" : "32px";
  btn.style.height = isFullscreen ? "50px" : "40px";

  temperature.style.marginTop = isFullscreen ? "35px" : "5px";
  humidity.style.marginTop = isFullscreen ? "35px" : "5px";
  windSpeed.style.marginTop = isFullscreen ? "35px" : "5px";

  temperature.style.fontSize = isFullscreen ? "25px" : "18px";
  humidity.style.fontSize = isFullscreen ? "25px" : "18px";
  windSpeed.style.fontSize = isFullscreen ? "25px" : "18px";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F11") {
    setTimeout(updateMargin, 100);
  }
});

window.addEventListener("resize", updateMargin);
updateMargin();

const BASE_URLs = [
  "https://nominatim.openstreetmap.org/search?q=",
  "https://api.open-meteo.com/v1/forecast?",
];

btn.addEventListener("click", async () => {
  try {
    let coordinateApi = `${BASE_URLs[0]}${encodeURIComponent(input.value)}&format=json`;

    let response1 = await fetch(coordinateApi);
    let data1 = await response1.json();

    if (data1.length === 0) {
      input.style.border = "3px solid red";
      input.style.outline = "none";
      alert("Place not found");
      return;
    } else {
      input.style.border = "none";
      input.style.outline = "2px solid black";
    }

    let values = [data1[0].lat, data1[0].lon];

    let weatherApi = `${BASE_URLs[1]}latitude=${values[0]}&longitude=${values[1]}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    let response2 = await fetch(weatherApi);
    let data2 = await response2.json();

    temperature.innerText = `Temperature: ${data2.current.temperature_2m} ℃`;
    humidity.innerText = `Humidity: ${data2.current.relative_humidity_2m} %`;
    windSpeed.innerText = `Wind Speed: ${data2.current.wind_speed_10m} km/h`;
  } catch (error) {
    console.error(error);
  }
});
