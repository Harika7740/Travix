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

  simulateRideAnimation() {
    if (!this.driverMarker) return;
    let step = 0;
    const points = [
      [37.7749, -122.4194],
      [37.7760, -122.4190],
      [37.7780, -122.4180],
      [37.7800, -122.4172],
      [37.7833, -122.4167]
    ];

    const interval = setInterval(() => {
      step++;
      if (step < points.length) {
        this.driverMarker.setLatLng(points[step]);
        this.map.panTo(points[step]);
      } else {
        clearInterval(interval);
        App.showToast('Destination Reached! Trip completed safely.', 'success');
      }
    }, 1500);
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
