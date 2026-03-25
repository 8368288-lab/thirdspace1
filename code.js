// =============================
// 📍 MAP SETUP
// =============================

// Academy at Palumbo coordinates
const schoolCoords = [39.940467528873874, -75.16107494563319];

// Create map
const map = L.map('map').setView(schoolCoords, 14);

// Add map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);


// =============================
// 🎨 ICONS (COLOR-CODED)
// =============================

const cafeIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32]
});

const parkIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [32, 32]
});

const programIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [32, 32]
});

const schoolIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  iconSize: [40, 40]
});


// =============================
// ⭐ SCHOOL MARKER
// =============================

const schoolMarker = L.marker(schoolCoords, { icon: schoolIcon }).addTo(map);

schoolMarker
  .bindPopup("<b>Academy at Palumbo</b><br>Your starting point")
  .openPopup();

// Highlight circle
L.circle(schoolCoords, {
  color: 'yellow',
  fillColor: '#ffff99',
  fillOpacity: 0.3,
  radius: 600
}).addTo(map);


// =============================
// 📌 PLACES DATA
// =============================

const places = [

  // ☕ CAFES
  {
    name: "Chapterhouse Cafe",
    coords: [39.9421, -75.1573],
    distance: "0.3 miles",
    hours: "8am - 8pm",
    link: "https://chapterhousecafe.com",
    type: "cafe"
  },
  {
    name: "Shot Tower Coffee",
    coords: [39.93800210286099, -75.15322304123153],
    distance: "0.5 miles",
    hours: "7am - 5pm",
    link: "https://shottowercoffee.com",
    type: "cafe"
  },

  // 🌳 PARKS
  {
    name: "Seger Park",
    coords: [39.943808335493486, -75.15934024563298],
    distance: "0.3 miles",
    hours: "7am - 10pm",
    link: "https://segerpark.org/",
    type: "park"
  },
  {
    name: "Franklin Square Park",
    coords: [39.9558, -75.1503],
    distance: "1.4 miles",
    hours: "6am - 9pm",
    link: "https://historicphiladelphia.org/franklin-square-2/",
    type: "park"
  },

  // 🎨 PROGRAMS / THIRD SPACES
  {
    name: "Ginger Arts Center",
    coords: [39.9607384825606, -75.1579024051516],
    distance: "1.1 miles",
    hours: "Thurs-Fri (3pm-6pm), Sat-Sun (10am-6pm)",
    link: "https://www.instagram.com/gingerartscenter",
    type: "program"
  },
  {
    name: "Fleisher Art Memorial Teen Lounge",
    coords: [39.9397, -75.1553],
    distance: "0.4 miles",
    hours: "Mon-Thurs (9am-9:30pm), Fri (9am-5pm), Sat (9am-3pm)",
    link: "https://fleisher.community/programs/teen-lounge/",
    type: "program"
  },
  {
    name: "Yeah Philly",
    coords: [39.9503, -75.2287],
    distance: "4.1 miles",
    hours: "Weekdays (2pm-10pm)",
    link: "https://yeahphilly.org/about/",
    type: "program"
  },
  {
    name: "Asian Arts Initiative",
    coords: [39.9580, -75.1592],
    distance: "0.8 miles",
    hours: "Weekdays (2pm-6pm)",
    link: "https://asianartsinitiative.org",
    type: "program"
  },
  {
    name: "Philadelphia Chinatown Development Center",
    coords: [39.9576, -75.1557],
    distance: "0.7 miles",
    hours: "Weekdays (3pm-6pm)",
    link: "https://chinatown-pcdc.org",
    type: "program"
  },
  {
    name: "TGR Learning Lab",
    coords: [39.96940998585406, -75.2642565302898],
    distance: "7.3 miles",
    hours: "Day and Time specific workshops",
    link: "https://philadelphia.tgrlearninglab.org/for-students/",
    type: "program"
  },
  {
    name: "Field Teen Center",
    coords: [39.9574, -75.1735],
    distance: "1.2 miles",
    hours: "Mon-Thurs (9am-7pm), Fri-Sat (9am-5pm)",
    link: "https://libwww.freelibrary.org/locations/departments/field-teen-center",
    type: "program"
  }

];


// =============================
// 🔁 ADD MARKERS
// =============================

places.forEach(place => {

  let icon;

  if (place.type === "cafe") {
    icon = cafeIcon;
  } else if (place.type === "park") {
    icon = parkIcon;
  } else if (place.type === "program") {
    icon = programIcon;
  }

  const marker = L.marker(place.coords, { icon: icon }).addTo(map);

  marker.bindPopup(`
    <b>${place.name}</b><br><br>
    Type: ${place.type}<br>
    Distance: ${place.distance}<br>
    Hours: ${place.hours}<br><br>
    <i>Click for website</i>
  `);

  marker.on('mouseover', function () {
    this.openPopup();
  });

  marker.on('mouseout', function () {
    this.closePopup();
  });

  marker.on('click', function () {
    window.open(place.link, '_blank');
  });

});



const legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div");

  div.innerHTML = `
    <div style="
      background: white;
      padding: 12px;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
      font-size: 18px;
    ">
      <b>Legend</b><br>
      🔴 Cafe<br>
      🟢 Park<br>
      🔵 Program<br>
      🟡 School
    </div>
  `;

  return div;
};

legend.addTo(map);

const recenterControl = L.control({ position: 'topleft' });

recenterControl.onAdd = function () {
  const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

  div.innerHTML = `
    <a href="#" title="Recenter Map">⌖</a>
  `;

  // Prevent map drag when clicking button
  L.DomEvent.disableClickPropagation(div);

  // Recenter map on click
  div.onclick = function () {
    map.flyTo(schoolCoords, 15);
  };

  return div;
};

recenterControl.addTo(map);
