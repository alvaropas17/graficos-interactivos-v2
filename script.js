var map = L.map("map").setView([40.4167, -3.7037], 13);
var marker = L.marker([40.4167, -3.7037]).addTo(map);
let chartInstancia;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

async function obtenerNombreCiudad(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const ciudad =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Lugar desconocido";
    document.getElementById("ciudad").innerText = ciudad;
  } catch (e) {
    document.getElementById("ciudad").innerText = "Ubicación seleccionada";
  }
}

async function consultarClima(lat, lng) {
  obtenerNombreCiudad(lat, lng);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m,precipitation,weather_code&hourly=temperature_2m&forecast_days=5`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    document.getElementById("caja-temperatura").innerText =
      datos.current.temperature_2m + "°C";
    document.getElementById("humedad").innerText =
      datos.current.relative_humidity_2m;
    document.getElementById("presion").innerText =
      datos.current.surface_pressure;
    document.getElementById("viento").innerText = datos.current.wind_speed_10m;
    document.getElementById("viento-dir").innerText =
      datos.current.wind_direction_10m;
    document.getElementById("precipitacion").innerText =
      datos.current.precipitation;

    const code = datos.current.weather_code;
    let icono = "☀️";
    if (code > 0 && code <= 3) icono = "☁️";
    else if (code >= 45 && code <= 48) icono = "🌫️";
    else if (code >= 51 && code <= 67) icono = "🌧️";
    else if (code >= 71 && code <= 99) icono = "⛈️";
    document.getElementById("icono-clima").innerText = icono;

    const etiquetasHoras = [];
    const datosTemperaturas = [];
    for (let i = 0; i < datos.hourly.time.length; i += 3) {
      const fecha = new Date(datos.hourly.time[i]);
      etiquetasHoras.push(
        `${fecha.getDate()}/${fecha.getMonth() + 1} ${fecha.getHours()}:00`,
      );
      datosTemperaturas.push(datos.hourly.temperature_2m[i]);
    }
    actualizarGrafica(etiquetasHoras, datosTemperaturas);
  } catch (error) {
    console.error("Error:", error);
  }
}

function actualizarGrafica(horas, temperaturas) {
  const ctx = document.getElementById("miGrafica").getContext("2d");
  if (chartInstancia) chartInstancia.destroy();
  chartInstancia = new Chart(ctx, {
    type: "line",
    data: {
      labels: horas,
      datasets: [
        {
          label: "Temperatura (ºC)",
          data: temperaturas,
          borderColor: "#3498db",
          backgroundColor: "rgba(52, 152, 219, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
}

map.on("click", function (e) {
  const { lat, lng } = e.latlng;
  marker.setLatLng([lat, lng]);
  consultarClima(lat, lng);
});

navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    map.setView([latitude, longitude], 13);
    marker.setLatLng([latitude, longitude]);
    consultarClima(latitude, longitude);
  },
  () => consultarClima(40.4167, -3.7037),
);
