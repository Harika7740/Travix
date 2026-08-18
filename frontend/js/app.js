// TRAVIX Master Application Coordinator
const App = {
  currentPortal: 'user',
  map: null,
  driverMarker: null,

  init() {
    this.refresh();
  },

  refresh() {
    const sidebarEl = document.getElementById('app-sidebar');
    const mainEl = document.getElementById('main-content');

    if (this.currentPortal === 'user') {
      sidebarEl.innerHTML = UserPortal.renderSidebar();
      mainEl.innerHTML = UserPortal.renderContent();
    } else if (this.currentPortal === 'driver') {
      sidebarEl.innerHTML = DriverPortal.renderSidebar();
      mainEl.innerHTML = DriverPortal.renderContent();
    } else if (this.currentPortal === 'admin') {
      sidebarEl.innerHTML = AdminPortal.renderSidebar();
      mainEl.innerHTML = AdminPortal.renderContent();
    }

    // Initialize Map if map element is present in DOM
    setTimeout(() => {
      this.initMap();
    }, 100);
  },

  initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Destroy existing instance if present
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    // Bengaluru MG Road default coordinates
    const indiaCenter = [12.9716, 77.5946];
    this.map = L.map('map').setView(indiaCenter, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap & TRAVIX Safety Grid'
    }).addTo(this.map);

    // Pickup & Dropoff Markers
    const pickupMarker = L.marker([12.9716, 77.5946]).addTo(this.map).bindPopup('<b>Pickup:</b> MG Road, Bengaluru, Karnataka, India').openPopup();
    const dropoffMarker = L.marker([12.9780, 77.6400]).addTo(this.map).bindPopup('<b>Dropoff:</b> Indiranagar 100ft Road, Bengaluru, Karnataka, India');

    // Route line
    const routeLine = L.polyline([
      [12.9716, 77.5946],
      [12.9750, 77.6100],
      [12.9780, 77.6400]
    ], { color: '#2563eb', weight: 5, opacity: 0.8 }).addTo(this.map);

    // Driver vehicle marker
    const carIcon = L.divIcon({
      className: 'custom-car-icon',
      html: `<div style="background:#ec4899; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px rgba(236,72,153,0.8);"><i class="fa-solid fa-car"></i></div>`,
      iconSize: [32, 32]
    });
    this.driverMarker = L.marker([12.9725, 77.5980], { icon: carIcon }).addTo(this.map).bindPopup('<b>Driver Ananya Sharma</b><br>White Tata Nexon EV (KA-01-EQ-4921)');

    // Unsafe Zone Circle
    L.circle([12.9810, 77.6080], {
      color: '#ef4444',
      fillColor: '#f87171',
      fillOpacity: 0.25,
      radius: 400
    }).addTo(this.map).bindPopup('⚠️ <b>Unsafe Zone Alert:</b> Central Metro Corridor');
  },

  startUberRideSimulation(onProgressCallback, onCompleteCallback) {
    if (!this.driverMarker) return;

    // Step 1: SEARCHING_DRIVER
    App.showToast('🔍 Searching for nearest verified female driver...', 'info');
    if (onProgressCallback) onProgressCallback({ status: 'SEARCHING_DRIVER', message: 'Finding nearby verified drivers...' });

    // Step 2: DRIVER_ASSIGNED (after 2 seconds)
    setTimeout(() => {
      App.showToast('✅ Driver Assigned: Ananya Sharma (Tata Nexon EV KA-01-EQ-4921)', 'success');
      if (onProgressCallback) onProgressCallback({
        status: 'DRIVER_ASSIGNED',
        driverName: 'Ananya Sharma (Verified)',
        vehicle: 'White Tata Nexon EV (KA-01-EQ-4921)',
        eta: '3 mins',
        distance: '4.8 km',
        speed: '38 km/h'
      });

      // Move vehicle to pickup location
      this.driverMarker.setLatLng([12.9716, 77.5946]);
      this.map.panTo([12.9716, 77.5946]);

      // Step 3: DRIVER_ARRIVED (after 4 seconds)
      setTimeout(() => {
        App.showToast('🚖 Driver arrived at MG Road, Bengaluru!', 'success');
        if (onProgressCallback) onProgressCallback({
          status: 'DRIVER_ARRIVED',
          driverName: 'Ananya Sharma (Verified)',
          vehicle: 'White Tata Nexon EV (KA-01-EQ-4921)',
          eta: 'Arrived',
          distance: '4.8 km',
          speed: '0 km/h'
        });

        // Step 4: RIDE_STARTED & LIVE TRACKING (after 6 seconds)
        setTimeout(() => {
          App.showToast('🚀 Ride Started! Tracking live route to Indiranagar 100ft Road', 'success');

          const routePoints = [
            { lat: 12.9716, lng: 77.5946, distance: '4.8 km', eta: '12 mins', speed: '36 km/h' },
            { lat: 12.9730, lng: 77.6000, distance: '4.1 km', eta: '10 mins', speed: '42 km/h' },
            { lat: 12.9745, lng: 77.6100, distance: '3.3 km', eta: '8 mins', speed: '45 km/h' },
            { lat: 12.9760, lng: 77.6200, distance: '2.4 km', eta: '5 mins', speed: '48 km/h' },
            { lat: 12.9772, lng: 77.6310, distance: '1.2 km', eta: '3 mins', speed: '40 km/h' },
            { lat: 12.9780, lng: 77.6400, distance: '0.0 km', eta: 'Arrived', speed: '0 km/h' }
          ];

          let pointIdx = 0;
          const trackingInterval = setInterval(() => {
            pointIdx++;
            if (pointIdx < routePoints.length) {
              const pt = routePoints[pointIdx];
              this.driverMarker.setLatLng([pt.lat, pt.lng]);
              this.map.panTo([pt.lat, pt.lng]);

              if (onProgressCallback) onProgressCallback({
                status: 'RIDE_STARTED',
                driverName: 'Ananya Sharma (Verified)',
                vehicle: 'White Tata Nexon EV (KA-01-EQ-4921)',
                eta: pt.eta,
                distance: pt.distance,
                speed: pt.speed
              });
            } else {
              clearInterval(trackingInterval);
              App.showToast('🎉 Ride Completed! You have safely arrived at Indiranagar 100ft Road.', 'success');
              if (onCompleteCallback) onCompleteCallback();
            }
          }, 2000);

        }, 2000);

      }, 2000);

    }, 2000);
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconClass = 'fa-circle-info';
    let borderColor = 'var(--primary)';
    if (type === 'success') { iconClass = 'fa-circle-check'; borderColor = 'var(--success)'; }
    if (type === 'warning') { iconClass = 'fa-triangle-exclamation'; borderColor = 'var(--warning)'; }
    if (type === 'error') { iconClass = 'fa-circle-xmark'; borderColor = 'var(--danger)'; }

    toast.style.borderLeftColor = borderColor;
    toast.innerHTML = `<i class="fa-solid ${iconClass}" style="color:${borderColor}; font-size:1.25rem;"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
};

function switchPortal(portal) {
  App.currentPortal = portal;

  document.querySelectorAll('.portal-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-portal-${portal}`).classList.add('active');

  const nameEl = document.getElementById('header-user-name');
  if (portal === 'user') nameEl.innerText = 'Jane Doe (Passenger)';
  if (portal === 'driver') nameEl.innerText = 'Sarah Smith (Driver)';
  if (portal === 'admin') nameEl.innerText = 'Admin Command Center';

  App.refresh();
}

function triggerGlobalSOS() {
  App.showToast('🚨 CRITICAL VOICE SOS ACTIVATED! Location broadcast to Emergency Contacts & Admin Command.', 'error');
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
