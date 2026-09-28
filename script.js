const themeBtn = document.querySelector("#theme");
const unitBtn = document.querySelector("#unit");
const searchBtn = document.querySelector("#go");
const searchInput = document.querySelector("#search");

const cities = {
  surabaya: {
    name: "Surabaya",
    temp: 29,
    feel: 32,
    desc: "Partly cloudy",
    icon: "⛅",
    humidity: 78,
    wind: "14 km/h",
    pressure: "1011 hPa",
    visibility: "9 km"
  },
  jakarta: {
    name: "Jakarta",
    temp: 31,
    feel: 35,
    desc: "Sunny",
    icon: "☀️",
    humidity: 70,
    wind: "11 km/h",
    pressure: "1009 hPa",
    visibility: "10 km"
  },
  bandung: {
    name: "Bandung",
    temp: 24,
    feel: 25,
    desc: "Cloudy",
    icon: "☁️",
    humidity: 82,
    wind: "8 km/h",
    pressure: "1015 hPa",
    visibility: "8 km"
  },
  bali: {
    name: "Bali",
    temp: 28,
    feel: 31,
    desc: "Light rain",
    icon: "🌦️",
    humidity: 84,
    wind: "18 km/h",
    pressure: "1010 hPa",
    visibility: "7 km"
  }
};

let current = cities.surabaya;
let fahrenheit = false;

function temperature(value) {
  return fahrenheit ? Math.round(value * 9 / 5 + 32) : value;
}

function renderMetrics() {
  const metrics = document.querySelector("#metrics");
  metrics.innerHTML = [
    ["Humidity", current.humidity + "%"],
    ["Wind", current.wind],
    ["Pressure", current.pressure],
    ["Visibility", current.visibility]
  ].map(([label, value]) =>
    `<article><span>${label}</span><b>${value}</b></article>`
  ).join("");
}

function renderHourly() {
  const hourly = document.querySelector("#hourly");
  const icons = ["☀️", "⛅", "☁️", "🌦️"];

  hourly.innerHTML = Array.from({ length: 12 }, (_, i) => {
    const hour = (i * 2 + 9) % 24;
    const value = temperature(current.temp + (i % 4 - 1));
    return `<div class="hour">
      <span>${String(hour).padStart(2, "0")}:00</span>
      <div class="icon">${icons[i % icons.length]}</div>
      <b>${value}°</b>
    </div>`;
  }).join("");
}

function renderDays() {
  const days = document.querySelector("#days");
  const names = ["Today", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const icons = ["☀️", "⛅", "🌧️", "☀️", "☁️", "⛅", "☀️"];

  days.innerHTML = names.map((day, i) => {
    const high = temperature(current.temp + (i % 3 - 1));
    const low = temperature(current.temp - 5 + (i % 2));
    return `<div class="day">
      <span>${day}</span>
      <div class="icon">${icons[i]}</div>
      <b>${high}° / ${low}°</b>
    </div>`;
  }).join("");
}

function render() {
  document.querySelector("#city").textContent = current.name;
  document.querySelector("#desc").textContent = current.desc;
  document.querySelector("#temp").textContent = temperature(current.temp);
  document.querySelector("#feel").textContent = temperature(current.feel) + "°" + (fahrenheit ? "F" : "C");
  document.querySelector(".temp sup").textContent = fahrenheit ? "°F" : "°C";
  document.querySelector(".sun").textContent = current.icon;

  renderMetrics();
  renderHourly();
  renderDays();
}

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☀" : "◐";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  themeBtn.setAttribute("title", dark ? "Light mode" : "Dark mode");
}

const savedTheme = localStorage.getItem("atmos-theme") || "light";
applyTheme(savedTheme === "dark");

themeBtn.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");
  applyTheme(dark);
  localStorage.setItem("atmos-theme", dark ? "dark" : "light");
});

unitBtn.addEventListener("click", () => {
  fahrenheit = !fahrenheit;
  render();
});

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase().trim();
  if (cities[query]) {
    current = cities[query];
    render();
  } else {
    alert("Demo mendukung: Surabaya, Jakarta, Bandung, Bali");
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchBtn.click();
});

render();
