// Driver Portal View Renderer
const DriverPortal = {
  activeTab: 'dashboard',
  isOnline: true,

  renderSidebar() {
    return `
      <div class="nav-item ${this.activeTab === 'dashboard' ? 'active' : ''}" onclick="DriverPortal.setTab('dashboard')">
        <i class="fa-solid fa-gauge"></i> Driver Dashboard
      </div>
      <div class="nav-item ${this.activeTab === 'trips' ? 'active' : ''}" onclick="DriverPortal.setTab('trips')">
        <i class="fa-solid fa-route"></i> Assigned Trips
      </div>
      <div class="nav-item ${this.activeTab === 'earnings' ? 'active' : ''}" onclick="DriverPortal.setTab('earnings')">
        <i class="fa-solid fa-wallet"></i> Earnings & Ratings
      </div>
      <div class="nav-item ${this.activeTab === 'verification' ? 'active' : ''}" onclick="DriverPortal.setTab('verification')">
        <i class="fa-solid fa-file-contract"></i> Verification Documents
      </div>
      <div class="nav-item ${this.activeTab === 'profile' ? 'active' : ''}" onclick="DriverPortal.setTab('profile')">
        <i class="fa-solid fa-id-card"></i> Vehicle & Profile
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    App.refresh();
  },

  renderContent() {
    switch (this.activeTab) {
      case 'dashboard': return this.renderDashboardView();
      case 'trips': return this.renderTripsView();
      case 'earnings': return this.renderEarningsView();
      case 'verification': return this.renderVerificationView();
      case 'profile': return this.renderProfileView();
      default: return this.renderDashboardView();
    }
  },

  renderDashboardView() {
    return `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2><i class="fa-solid fa-steering-wheel"></i> Driver Control Hub</h2>
        <div style="display:flex; align-items:center; gap:1rem; background:var(--dark-card); padding:0.5rem 1.25rem; border-radius:999px; border:1px solid var(--dark-border);">
          <span>Online Dispatch Status</span>
          <label class="switch">
            <input type="checkbox" id="driver-status-toggle" ${this.isOnline ? 'checked' : ''} onchange="DriverPortal.toggleOnlineStatus(this.checked)">
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon" style="background:rgba(16,185,129,0.2); color:var(--success);">
            <i class="fa-solid fa-dollar-sign"></i>
          </div>
          <div class="metric-info">
            <h4>Today's Earnings</h4>
            <p>$184.50</p>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon" style="background:rgba(37,99,235,0.2); color:var(--primary);">
            <i class="fa-solid fa-car-side"></i>
          </div>
          <div class="metric-info">
            <h4>Completed Trips</h4>
            <p>12 Rides</p>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon" style="background:rgba(245,158,11,0.2); color:var(--warning);">
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="metric-info">
            <h4>Driver Rating</h4>
            <p>4.9 ★</p>
          </div>
        </div>
      </div>

      <div style="background:var(--dark-card); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--dark-border);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h3>Incoming Dispatch Alerts</h3>
          <button class="btn btn-primary" onclick="DriverPortal.simulateRideOffer()">
            <i class="fa-solid fa-bell"></i> Simulate Test Dispatch
          </button>
        </div>

        <div id="dispatch-alert-container">
          <div style="text-align:center; padding:2rem; color:var(--text-muted);">
            <i class="fa-solid fa-satellite-dish" style="font-size:2rem; margin-bottom:0.5rem; color:var(--primary);"></i>
            <p>Scanning for nearby ride requests in San Francisco...</p>
          </div>
        </div>
      </div>
    `;
  },

  renderTripsView() {
    let rowsHtml = '';
    if (App.rideHistory && App.rideHistory.length > 0) {
      App.rideHistory.forEach(ride => {
        rowsHtml += `
          <tr>
            <td><strong>#${ride.id}</strong></td>
            <td>${ride.passenger || 'Jane Doe'} ★ 4.95</td>
            <td>${ride.pickup}</td>
            <td>${ride.dropoff}</td>
            <td><strong>₹${ride.fare}</strong></td>
            <td><span class="badge badge-success">🔑 PIN ${ride.pin} Verified</span></td>
            <td>
              <button class="btn btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="App.showToast('Navigating trip #${ride.id}...', 'info')">
                <i class="fa-solid fa-location-arrow"></i> Completed
              </button>
            </td>
          </tr>
        `;
      });
    } else {
      rowsHtml = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No assigned trips yet.</td></tr>`;
    }

    return `
      <h2><i class="fa-solid fa-route"></i> Assigned Driver Trips</h2>
      
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Passenger</th>
              <th>Pickup Address</th>
              <th>Destination</th>
              <th>Fare</th>
              <th>Safety Verification</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  },

  renderEarningsView() {
    return `
      <h2><i class="fa-solid fa-wallet"></i> Driver Earnings & Passenger Reviews</h2>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
        <div style="background:var(--dark-card); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--dark-border);">
          <h3>Weekly Breakdown</h3>
          <div style="font-size:2rem; font-weight:800; color:var(--success); margin:1rem 0;">$1,240.00</div>
          <p style="color:var(--text-muted); font-size:0.9rem;">Payout scheduled for Monday via Direct Deposit</p>
        </div>

        <div style="background:var(--dark-card); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--dark-border);">
          <h3>Recent Passenger Feedback</h3>
          <div style="margin-top:1rem; border-bottom:1px solid var(--dark-border); padding-bottom:0.75rem;">
            <div>★★★★★ - "Super smooth ride and felt very safe during night trip!"</div>
            <span style="font-size:0.75rem; color:var(--text-muted);">- Jane D.</span>
          </div>
        </div>
      </div>
    `;
  },

  renderVerificationView() {
    return `
      <h2><i class="fa-solid fa-file-contract"></i> Verification Documents</h2>

      <div style="background:var(--dark-card); padding:2rem; border-radius:var(--radius-md); border:1px solid var(--dark-border); display:flex; flex-direction:column; gap:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Driver License (Front & Back)</strong>
            <p style="font-size:0.8rem; color:var(--text-muted);">State ID / Driver license document</p>
          </div>
          <span class="badge badge-success">Verified</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Vehicle Registration & Insurance</strong>
            <p style="font-size:0.8rem; color:var(--text-muted);">Valid registration certificate</p>
          </div>
          <span class="badge badge-success">Verified</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Background Security Check</strong>
            <p style="font-size:0.8rem; color:var(--text-muted);">Criminal & safety check screening</p>
          </div>
          <span class="badge badge-success">Passed</span>
        </div>
      </div>
    `;
  },

  renderProfileView() {
    return `
      <h2><i class="fa-solid fa-id-card"></i> Vehicle & Driver Profile</h2>
      <div style="background:var(--dark-card); padding:2rem; border-radius:var(--radius-md); border:1px solid var(--dark-border); max-width:600px;">
        <div class="form-group">
          <label>Driver Full Name</label>
          <input type="text" class="form-control" value="Sarah Smith">
        </div>
        <div class="form-group" style="margin-top:1rem;">
          <label>Vehicle Make & Model</label>
          <input type="text" class="form-control" value="Toyota Camry (2022)">
        </div>
        <div class="form-group" style="margin-top:1rem;">
          <label>License Plate Number</label>
          <input type="text" class="form-control" value="TRX-8899">
        </div>
        <button class="btn btn-primary" style="margin-top:1.5rem;" onclick="App.showToast('Vehicle details saved', 'success')">Save Vehicle Info</button>
      </div>
    `;
  },

  toggleOnlineStatus(val) {
    this.isOnline = val;
    App.showToast(`Driver status: ${val ? 'ONLINE & Receiving Dispatches' : 'OFFLINE'}`, val ? 'success' : 'warning');
  },

  simulateRideOffer() {
    const container = document.getElementById('dispatch-alert-container');
    if (!container) return;

    container.innerHTML = `
      <div style="background:rgba(37,99,235,0.15); border:2px solid var(--primary); border-radius:var(--radius-md); padding:1.5rem; animation:slide-in 0.3s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h4 style="color:#60a5fa;"><i class="fa-solid fa-bell"></i> NEW RIDE REQUEST DETECTED</h4>
          <span class="badge badge-warning">Expires in 15s</span>
        </div>
        
        <div style="margin:1rem 0; display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div>
            <strong>Passenger:</strong> Jane Doe (★ 4.95)<br>
            <strong>Distance:</strong> 4.2 km (12 mins)
          </div>
          <div>
            <strong>Fare:</strong> $18.50<br>
            <strong>Safety Match:</strong> Female Priority
          </div>
        </div>

        <div style="display:flex; gap:1rem;">
          <button class="btn btn-primary" style="flex:1;" onclick="DriverPortal.acceptRide()">
            <i class="fa-solid fa-check"></i> Accept Trip
          </button>
          <button class="btn btn-danger" style="flex:1;" onclick="DriverPortal.rejectRide()">
            <i class="fa-solid fa-xmark"></i> Decline
          </button>
        </div>
      </div>
    `;
  },

  acceptRide() {
    App.showToast('Trip accepted! Pickup navigation started.', 'success');
    this.setTab('trips');
  },

  rejectRide() {
    App.showToast('Trip declined. Re-routing dispatch to nearby drivers.', 'info');
    const container = document.getElementById('dispatch-alert-container');
    if (container) {
      container.innerHTML = `<p style="text-align:center; padding:1.5rem; color:var(--text-muted);">Trip declined.</p>`;
    }
  }
};
