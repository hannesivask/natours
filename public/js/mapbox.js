/* eslint-disable */

export const displayMap = (locations) => {
  var map = L.map('map', {
    zoomControl: false,
  });

  const icon = L.icon({
    iconUrl: '../img/pin.png',
    iconSize: [20, 25],
    iconAnchor: [10, 25],
    popupAnchor: [0, -25],
  });

  L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}',
    {
      minZoom: 0,
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png',
    },
  ).addTo(map);

  const points = [];

  locations.forEach((loc) => {
    points.push([loc.coordinates[1], loc.coordinates[0]]);

    L.marker([loc.coordinates[1], loc.coordinates[0]], { icon })
      .addTo(map)
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
      })
      .openPopup();
  });

  const bounds = L.latLngBounds(points).pad(0.5);

  map.fitBounds(bounds);

  map.scrollWheelZoom.disable();
};
