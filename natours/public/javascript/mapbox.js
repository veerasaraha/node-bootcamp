console.log('hello from the client side');

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken = 'pk.eyJ1IjoidmVlcmEtMTUwNSIsImEiOiJja21hc2ZyaG8xdWl4MnBvanVobTY5Y2xvIn0.hd8eSt8wyoVMbz8NLkWMlA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/veera-1505/ckmc2ml6rkgkc17p6nstrlctg',
  scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 10,
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((location) => {
  // Create Maker

  const el = document.createElement('div');
  el.className = 'marker';

  // Add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(location.coordinates)
    .addTo(map);

  // Add Popup

  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(location.coordinates)
    .setHTML(`<p>Day ${location.day} : ${location.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
