# 🌦️ Mapa del Tiempo Interactivo

Aplicación web interactiva que muestra información meteorológica en tiempo real utilizando un mapa interactivo. Los usuarios pueden consultar el clima de cualquier ubicación haciendo clic en el mapa.

## ✨ Características

- 🗺️ **Mapa Interactivo**: Visualiza el mapa mundial y selecciona cualquier ubicación
- 📍 **Geolocalización**: Detecta automáticamente tu ubicación actual al cargar la página
- 🌡️ **Datos en Tiempo Real**: Muestra información meteorológica actualizada
  - Temperatura actual
  - Humedad relativa
  - Presión atmosférica
  - Velocidad y dirección del viento
  - Precipitación
  - Icono visual según las condiciones climáticas
- 📊 **Gráfico de Pronóstico**: Visualización de temperatura para los próximos 5 días (cada 3 horas)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y diseño responsivo
- **JavaScript (ES6+)**: Lógica de la aplicación y manejo de APIs
- **[Leaflet.js](https://leafletjs.com/)**: Librería para mapas interactivos
- **[Chart.js](https://www.chartjs.org/)**: Visualización de gráficos
- **[Open-Meteo API](https://open-meteo.com/)**: API gratuita de datos meteorológicos
- **[OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/)**: Geocodificación inversa para obtener nombres de ciudades

## 📦 Estructura del Proyecto

```
graficos-interactivos-v2/
│
├── index.html      # Estructura principal de la página
├── style.css       # Estilos y diseño
├── script.js       # Lógica de la aplicación
└── README.md       # Documentación del proyecto
```

## 🚀 Instalación y Uso

### Opción 1: Uso Local

1. **Clona o descarga el repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd graficos-interactivos-v2
   ```

2. **Abre el archivo `index.html` en tu navegador**:
   - Doble clic en el archivo
   - O arrastra el archivo al navegador
   - O usa el comando (si tienes Python instalado):
     ```bash
     python -m http.server 8000
     ```
     Luego visita `http://localhost:8000`

### Opción 2: Servidor Web

Puedes alojar los archivos en cualquier servidor web (Apache, Nginx, etc.) o servicio de hosting estático (GitHub Pages, Netlify, Vercel).

## 💡 Cómo Usar

1. **Al cargar la página**:
   - La aplicación solicitará permiso para acceder a tu ubicación
   - Si aceptas, mostrará automáticamente el clima de tu ubicación actual

2. **Para consultar otra ubicación**:
   - Haz clic en cualquier punto del mapa
   - El marcador se moverá a esa ubicación
   - Los datos meteorológicos se actualizarán automáticamente

3. **Visualización de datos**:
   - El panel superior muestra los datos meteorológicos actuales
   - El gráfico inferior muestra el pronóstico de temperatura para 5 días

## 🔧 Personalización

### Cambiar la Ubicación Inicial

En `script.js`, línea 1:

```javascript
var map = L.map("map").setView([40.4167, -3.7037], 13);
// Cambia [latitud, longitud] y el nivel de zoom (13)
```

### Modificar el Estilo del Mapa

En `script.js`, líneas 5-7, puedes cambiar el proveedor de tiles:

```javascript
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);
```

Otros proveedores disponibles:

- CartoDB: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`
- CartoDB Dark: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`

### Personalizar Colores

Modifica los valores en `style.css`:

- Fondo principal: `background-color` en `body`
- Color de datos: `.valor { color: #3498db; }`
- Colores del gráfico: En `script.js`, función `actualizarGrafica()`

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles (diseño responsivo)

## 🌐 APIs Utilizadas

### Open-Meteo API

- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Límites**: Sin necesidad de API key, uso gratuito
- **Documentación**: [open-meteo.com](https://open-meteo.com/en/docs)

### OpenStreetMap Nominatim

- **Endpoint**: `https://nominatim.openstreetmap.org/reverse`
- **Límites**: 1 petición por segundo
- **Política de uso**: [Nominatim Usage Policy](https://operations.osmfoundation.org/policies/nominatim/)

## 🐛 Solución de Problemas

### El mapa no se muestra

- Verifica tu conexión a Internet
- Comprueba la consola del navegador para errores
- Asegúrate de que las CDN de Leaflet y Chart.js estén accesibles

### La geolocalización no funciona

- Verifica que tu navegador tenga permisos de ubicación
- La geolocalización requiere HTTPS (excepto en localhost)
- Algunos navegadores bloquean la geolocalización en archivos `file://`

### Los datos no se cargan

- Verifica tu conexión a Internet
- Las APIs pueden estar temporalmente no disponibles
- Comprueba la consola del navegador para mensajes de error

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado como proyecto educativo para 2º DAW (Desarrollo de Aplicaciones Web)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`)
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

- El proyecto usa la API gratuita de Open-Meteo que no requiere autenticación
- Los iconos del clima se asignan según el código meteorológico de la API
- El gráfico muestra un punto cada 3 horas para mayor claridad
- Se implementa geolocalización con fallback a Madrid (España) como ubicación predeterminada

---

⭐ Si te ha gustado este proyecto, ¡dale una estrella!
