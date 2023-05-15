import L from 'leaflet';

export const pointerIcon = (icon) => new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: icon,
  iconAnchor: [12.5, 25],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 30),
  className: 'leaflet-div-icon'
});