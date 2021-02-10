import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Hack pour Leaflet pour faire apparaitre le marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default (payload) => {
    let lat = payload.lat;      //console.log("payload dans 'MapCreation.js'", payload); //TEST
    let lon = payload.lon;

    //var container = L.DomUtil.get(id); // Check si un élément du DOM avec cet id existe déjà...
    var container = L.DomUtil.get('map'); // Check si un élément du DOM avec cet id existe déjà...
    if(container != null){ container._leaflet_id = null } //...Si c'est le cas, on rend possible le fait de passer de nouveau le même id pour la création de la carte

    
    let macarte = L.map('map');
    macarte.setView([lat, lon], 7);
    // ou
    // macarte = L.map('map').setView([lat, lon], 7);

    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);

    // Ajout d'un marqueur
    L.marker([lat, lon]).addTo(macarte);
}