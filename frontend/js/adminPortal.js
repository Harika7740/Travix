// Admin Command Portal View Renderer
const AdminPortal = {
  activeTab: 'analytics',

  renderSidebar() {
    return `
      <div class="nav-item ${this.activeTab === 'analytics' ? 'active' : ''}" onclick="AdminPortal.setTab('analytics')">
        <i class="fa-solid fa-chart-pie"></i> Analytics & KPIs
      </div>
      <div class="nav-item ${this.activeTab === 'sos-monitor' ? 'active' : ''}" onclick="AdminPortal.setTab('sos-monitor')">
        <i class="fa-solid fa-triangle-exclamation"></i> SOS & Guardian Monitor
      </div>
      <div class="nav-item ${this.activeTab === 'verification' ? 'active' : ''}" onclick="AdminPortal.setTab('verification')">
        <i class="fa-solid fa-user-check"></i> Driver Verification
      </div>
      <div class="nav-item ${this.activeTab === 'tracking' ? 'active' : ''}" onclick="AdminPortal.setTab('tracking')">
        <i class="fa-solid fa-map-location"></i> Live Ride Tracker
      </div>
      <div class="nav-item ${this.activeTab === 'unsafe-zones' ? 'active' : ''}" onclick="AdminPortal.setTab('unsafe-zones')">
        <i class="fa-solid fa-draw-polygon"></i> Unsafe Zones Geofence
      </div>
      <div class="nav-item ${this.activeTab === 'users' ? 'active' : ''}" onclick="AdminPortal.setTab('users')">
        <i class="fa-solid fa-users"></i> Manage Users & Drivers
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    App.refresh();
  },

  renderContent() {
    switch (this.activeTab) {
      case 'analytics': return this.renderAnalyticsView();
      case 'sos-monitor': return this.renderSOSMonitorView();
      case 'verification': return this.renderVerificationView();
      case 'tracking': return this.renderTrackingView();
      case 'unsafe-zones': return this.renderUnsafeZonesView();
      case 'users': return this.renderUsersView();
      default: return this.renderAnalyticsView();
    }
  },

  renderAnalyticsView() {
    return `
      <h2><i class="fa-solid fa-chart-line" style="color:var(--primary);"></i> Platform Performance Analytics</h2>

      <div class="metrics-grid">
        <div class="metric-card" style="border-left:4px solid var(--primary);">
          <div class="metric-icon" style="background:rgba(37,99,235,0.2); color:var(--primary);">
            <i class="fa-solid fa-users"></i>
          </div>
          <div class="metric-info">
            <h4>Total Passengers</h4>
            <p>14,290</p>
          </div>
        </div>

        <div class="metric-card" style="border-left:4px solid var(--success);">
          <div class="metric-icon" style="background:rgba(16,185,129,0.2); color:var(--success);">
            <i class="fa-solid fa-car-on"></i>
          </div>
          <div class="metric-info">
            <h4>Active Drivers</h4>
            <p>1,420</p>
          </div>
        </div>

        <div class="metric-card" style="border-left:4px solid var(--warning);">
          <div class="metric-icon" style="background:rgba(245,158,11,0.2); color:var(--warning);">
            <i class="fa-solid fa-user-clock"></i>
          </div>
          <div class="metric-info">
            <h4>Pending Verification</h4>
            <p>18</p>
          </div>
        </div>

        <div class="metric-card" style="border-left:4px solid var(--danger);">
          <div class="metric-icon" style="background:rgba(239,68,68,0.2); color:var(--danger);">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div class="metric-info">
            <h4>Active SOS Alerts</h4>
            <p>1 Active</p>
          </div>
        </div>
      </div>

      <div style="background:var(--dark-card); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--dark-border); margin-top:1.5rem;">
        <h3>System Status & Security Summary</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-top:0.5rem;">
          All 3 portals operational. Firebase Authentication & Firestore schemas synced. Voice SOS stream listener online.
        </p>
      </div>
    `;
  },

  renderSOSMonitorView() {
    return `
      <h2><i class="fa-solid fa-triangle-exclamation" style="color:var(--danger);"></i> Real-Time SOS & Emergency Feed</h2>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>User</th>
              <th>Trigger Type</th>
              <th>GPS Location</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Emergency Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:rgba(239,68,68,0.1);">
              <td><strong style="color:var(--danger);">#SOS-3301</strong></td>
              <td>Jane Doe (+1234567890)</td>
              <td><span class="badge badge-danger">Voice Phrase Trigger</span></td>
              <td>37.7780, -122.4180</td>
              <td>Just Now</td>
              <td><span class="badge badge-danger">CRITICAL ACTIVE</span></td>
              <td>
                <button class="btn btn-danger" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="AdminPortal.dispatchResponders('SOS-3301')">
                  <i class="fa-solid fa-shield-virus"></i> Dispatch Security & Resolve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },

  renderVerificationView() {
    return `
      <h2><i class="fa-solid fa-user-check"></i> Driver Onboarding Verification</h2>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Vehicle Info</th>
              <th>Plate No.</th>
              <th>Documents Submitted</th>
              <th>Submission Date</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Miller</td>
              <td>Honda Accord (2021)</td>
              <td>TRX-1090</td>
              <td>License, Insurance, BG Check</td>
              <td>2026-07-28</td>
              <td>
                <button class="btn btn-primary" style="padding:0.3rem 0.6rem; font-size:0.8rem;" onclick="App.showToast('Driver John Miller APPROVED', 'success')">
                  <i class="fa-solid fa-check"></i> Approve
                </button>
                <button class="btn btn-danger" style="padding:0.3rem 0.6rem; font-size:0.8rem;" onclick="App.showToast('Driver rejected', 'warning')">
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },

  renderTrackingView() {
    return `
      <h2><i class="fa-solid fa-map-location"></i> Live Fleet & Active Ride Tracker</h2>
      <div class="map-wrapper" style="height:550px;">
        <div id="map"></div>
      </div>
    `;
  },

  renderUnsafeZonesView() {
    return `
      <h2><i class="fa-solid fa-draw-polygon"></i> Unsafe Zone Geofencing Manager</h2>

      <div style="display:grid; grid-template-columns:1fr 350px; gap:1.5rem;">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Zone Name</th>
                <th>Center GPS</th>
                <th>Radius</th>
                <th>Severity</th>
                <th>Active Hours</th>
              </tr>
            </thead>
            <tbody id="zones-table-body">
              <tr>
                <td>Central Metro High-Risk Corridor</td>
                <td>37.7812, -122.4111</td>
                <td>600m</td>
                <td><span class="badge badge-danger">High Severity</span></td>
                <td>22:00 - 05:00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background:var(--dark-card); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--dark-border);">
          <h3>Add Unsafe Geofence</h3>
          <div class="form-group" style="margin-top:1rem;">
            <label>Zone Name</label>
            <input type="text" id="zone-name" class="form-control" placeholder="e.g. Sector 7 Dark Corridor">
          </div>
          <div class="form-group" style="margin-top:0.75rem;">
            <label>Radius (Meters)</label>
            <input type="number" id="zone-radius" class="form-control" value="500">
          </div>
          <button class="btn btn-primary" style="width:100%; margin-top:1.25rem;" onclick="AdminPortal.addZone()">
            <i class="fa-solid fa-plus"></i> Create Geofence Circle
          </button>
        </div>
      </div>
    `;
  },

  renderUsersView() {
    return `
      <h2><i class="fa-solid fa-users"></i> Platform User Directory</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>UID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>usr_99812</td>
              <td>Jane Doe</td>
              <td>user@example.com</td>
              <td>Passenger</td>
              <td><span class="badge badge-success">Active</span></td>
            </tr>
            <tr>
              <td>drv_44102</td>
              <td>Sarah Smith</td>
              <td>driver@example.com</td>
              <td>Driver</td>
              <td><span class="badge badge-success">Verified</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },

  dispatchResponders(alertId) {
    App.showToast(`Emergency responders dispatched to ${alertId}! Alert marked resolved.`, 'success');
    this.setTab('analytics');
  },

  addZone() {
    const name = document.getElementById('zone-name').value;
    const radius = document.getElementById('zone-radius').value;

    if (!name) {
      App.showToast('Please enter zone name', 'error');
      return;
    }

    const tbody = document.getElementById('zones-table-body');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${name}</td>
      <td>37.7780, -122.4180</td>
      <td>${radius}m</td>
      <td><span class="badge badge-danger">High Severity</span></td>
      <td>24/7</td>
    `;
    tbody.appendChild(tr);
    App.showToast(`Unsafe zone geofence '${name}' created!`, 'success');
  }
};
