import "../styling/index.css";

fetchWeather();
getTime();

function fetchWeather() {
  fetch(
    "https://api.darksky.net/forecast/4410c51917a1784fbf3c8188902767d0/52.3680,4.9036"
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let container = document.querySelector(".news__weather");
      let wind = data.currently.windSpeed / 10;
      degToCompass(data.currently.windBearing);

      document.querySelector(
        ".news"
      ).style = `transform: skewY(${wind}deg); marginTop: ${wind};`;
      container.classList.add(data.currently.icon);
      container.innerHTML = `
        <header>
        <h3>Weather in Amsterdam</h3>
        </header>
        <p><Strong>Current weather status:</Strong> <br /> ${
          data.currently.summary
        }</p>
        <p><Strong>Today's weather summary:</Strong> <br /> ${
          data.daily.summary
        }</p>
      `;
    })
    .catch(err => console.error(err));
}

function getTime() {
  const date = new Date();
  const currTime = date.getHours();
  let body = document.querySelector("body");
  body.classList.add(currTime < 18 && currTime > 6 ? "day" : "night");
}

function degToCompass(num) {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  console.log(arr[val % 8]);
  return arr[val % 8];
}
