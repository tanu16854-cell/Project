function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      document.getElementById("locationBox").innerText = "Geolocation not supported.";
    }
  
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(data => {
          const address = data.display_name;
          document.getElementById("locationBox").innerText = `📍 ${address}`;
        })
        .catch(() => {
          document.getElementById("locationBox").innerText = `📍 Location found: ${lat}, ${lon}`;
        });
    }
    function error(err) {
      document.getElementById("locationBox").innerText = "📍 Location access denied.";
    }
  }
  getLocation();
  