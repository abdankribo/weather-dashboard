var themeBtn = document.getElementById("theme");
var unitBtn = document.getElementById("unit");
var searchBtn = document.getElementById("go");
var searchInput = document.getElementById("search");

var cities = {
  surabaya: { name:"Surabaya", temp:29, feel:32, desc:"Partly cloudy", icon:"⛅", humidity:78, wind:"14 km/h", pressure:"1011 hPa", visibility:"9 km" },
  jakarta: { name:"Jakarta", temp:31, feel:35, desc:"Sunny", icon:"☀️", humidity:70, wind:"11 km/h", pressure:"1009 hPa", visibility:"10 km" },
  bandung: { name:"Bandung", temp:24, feel:25, desc:"Cloudy", icon:"☁️", humidity:82, wind:"8 km/h", pressure:"1015 hPa", visibility:"8 km" },
  bali: { name:"Bali", temp:28, feel:31, desc:"Light rain", icon:"🌦️", humidity:84, wind:"18 km/h", pressure:"1010 hPa", visibility:"7 km" }
};

var current = cities.surabaya;
var fahrenheit = false;

function temperature(value) {
  return fahrenheit ? Math.round(value * 9 / 5 + 32) : value;
}

function renderMetrics() {
  var el = document.getElementById("metrics");
  el.innerHTML =
    '<article><span>Humidity</span><b>' + current.humidity + '%</b></article>' +
    '<article><span>Wind</span><b>' + current.wind + '</b></article>' +
    '<article><span>Pressure</span><b>' + current.pressure + '</b></article>' +
    '<article><span>Visibility</span><b>' + current.visibility + '</b></article>';
}

function renderHourly() {
  var el = document.getElementById("hourly");
  var icons = ["☀️","⛅","☁️","🌦️"];
  var html = "";
  for (var i = 0; i < 12; i++) {
    var hour = (i * 2 + 9) % 24;
    var value = temperature(current.temp + (i % 4 - 1));
    html += '<div class="hour"><span>' + (hour < 10 ? "0" : "") + hour + ':00</span>' +
      '<div class="icon">' + icons[i % icons.length] + '</div><b>' + value + '°</b></div>';
  }
  el.innerHTML = html;
}

function renderDays() {
  var el = document.getElementById("days");
  var names = ["Today","Tue","Wed","Thu","Fri","Sat","Sun"];
  var icons = ["☀️","⛅","🌧️","☀️","☁️","⛅","☀️"];
  var html = "";
  for (var i = 0; i < names.length; i++) {
    var high = temperature(current.temp + (i % 3 - 1));
    var low = temperature(current.temp - 5 + (i % 2));
    html += '<div class="day"><span>' + names[i] + '</span><div class="icon">' +
      icons[i] + '</div><b>' + high + '° / ' + low + '°</b></div>';
  }
  el.innerHTML = html;
}

function render() {
  document.getElementById("city").textContent = current.name;
  document.getElementById("desc").textContent = current.desc;
  document.getElementById("temp").textContent = temperature(current.temp);
  document.getElementById("feel").textContent = temperature(current.feel) + "°" + (fahrenheit ? "F" : "C");
  document.querySelector(".temp sup").textContent = fahrenheit ? "°F" : "°C";
  document.querySelector(".sun").textContent = current.icon;
  renderMetrics();
  renderHourly();
  renderDays();
}

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☀" : "◐";
}

var savedTheme = localStorage.getItem("atmos-theme") || "light";
applyTheme(savedTheme === "dark");

themeBtn.onclick = function() {
  var dark = !document.body.classList.contains("dark");
  applyTheme(dark);
  localStorage.setItem("atmos-theme", dark ? "dark" : "light");
};

unitBtn.onclick = function() {
  fahrenheit = !fahrenheit;
  render();
};

searchBtn.onclick = function() {
  var query = searchInput.value.toLowerCase().trim();
  if (cities[query]) {
    current = cities[query];
    render();
  } else {
    alert("Demo mendukung: Surabaya, Jakarta, Bandung, Bali");
  }
};

searchInput.onkeydown = function(event) {
  if (event.key === "Enter") searchBtn.click();
};

render();
