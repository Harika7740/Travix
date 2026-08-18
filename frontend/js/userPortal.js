// User / Passenger Portal View Renderer
const UserPortal = {
  activeTab: 'booking',

  renderSidebar() {
    return `
      <div class="nav-item ${this.activeTab === 'booking' ? 'active' : ''}" onclick="UserPortal.setTab('booking')">
        <i class="fa-solid fa-map-location-dot"></i> Book a Ride
      </div>
      <div class="nav-item ${this.activeTab === 'history' ? 'active' : ''}" onclick="UserPortal.setTab('history')">
        <i class="fa-solid fa-clock-rotate-left"></i> Ride History & Invoices
      </div>
      <div class="nav-item ${this.activeTab === 'safety' ? 'active' : ''}" onclick="UserPortal.setTab('safety')">
        <i class="fa-solid fa-shield-cat"></i> Safety & Guardian Mode
      </div>
      <div class="nav-item ${this.activeTab === 'contacts' ? 'active' : ''}" onclick="UserPortal.setTab('contacts')">
        <i class="fa-solid fa-address-book"></i> Emergency Contacts
      </div>
      <div class="nav-item ${this.activeTab === 'settings' ? 'active' : ''}" onclick="UserPortal.setTab('settings')">
        <i class="fa-solid fa-gear"></i> Account Settings
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    App.refresh();
  },

  renderContent() {
    switch (this.activeTab) {
      case 'booking': return this.renderBookingView();
      case 'history': return this.renderHistoryView();
      case 'safety': return this.renderSafetyView();
      case 'contacts': return this.renderContactsView();
      case 'settings': return this.renderSettingsView();
      default: return this.renderBookingView();
    }
  },

  renderBookingView() {
    return `
      <h2><i class="fa-solid fa-bolt" style="color:var(--primary);"></i> Book Your Safe Ride</h2>
      <div class="user-portal-grid">
        <div class="map-card-container">
          <div id="map" style="height: 100%; width: 100%; min-height: 520px; border-radius: 16px;"></div>
        </div>
        <div class="booking-control-card">
          <h3><i class="fa-solid fa-location-dot"></i> Route & Options</h3>
          
          <div class="form-group" style="margin-top: 0.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <label>PICKUP LOCATION</label>
              <button class="btn btn-secondary" onclick="App.detectLiveLocation()" style="padding:0.2rem 0.5rem; font-size:0.75rem;">
                <i class="fa-solid fa-location-crosshairs"></i> Detect Live
              </button>
            </div>
            <input type="text" id="pickup-input" class="form-input" value="MG Road, Bengaluru, Karnataka, India" onchange="App.geocodeInputAddress(this.value, true)" />
          </div>

          <div class="form-group">
            <label>DROPOFF DESTINATION</label>
            <input type="text" id="dropoff-input" class="form-input" value="Indiranagar 100ft Road, Bengaluru, Karnataka, India" onchange="App.geocodeInputAddress(this.value, false)" />
          </div>

          <!-- Uber Vehicle Category Selector -->
          <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-top:0.5rem; display:block;">CHOOSE VEHICLE CATEGORY</label>
          
          <div class="vehicle-options-list">
            <div class="vehicle-card" onclick="UserPortal.selectVehicle(this, 'Uber Auto', '85.00')">
              <div class="vehicle-details">
                <div class="vehicle-icon-box"><i class="fa-solid fa-truck-monster"></i></div>
                <div class="vehicle-info">
                  <h4>Uber Auto <span class="badge badge-secondary" style="font-size:0.65rem;">3 seats</span></h4>
                  <p>Fast auto-rickshaw • 3 mins away</p>
                </div>
              </div>
              <div class="vehicle-price-box">
                <div class="vehicle-price">₹85.00</div>
                <div class="vehicle-eta">3 mins away</div>
              </div>
            </div>

            <div class="vehicle-card" onclick="UserPortal.selectVehicle(this, 'Uber Go Mini', '140.00')">
              <div class="vehicle-details">
                <div class="vehicle-icon-box"><i class="fa-solid fa-car-side"></i></div>
                <div class="vehicle-info">
                  <h4>Uber Go / Mini <span class="badge badge-secondary" style="font-size:0.65rem;">4 seats</span></h4>
                  <p>Affordable hatchbacks • 2 mins away</p>
                </div>
              </div>
              <div class="vehicle-price-box">
                <div class="vehicle-price">₹140.00</div>
                <div class="vehicle-eta">2 mins away</div>
              </div>
            </div>

            <div class="vehicle-card selected" onclick="UserPortal.selectVehicle(this, 'TRAVIX Women Safe Premier', '240.00')">
              <div class="vehicle-details">
                <div class="vehicle-icon-box"><i class="fa-solid fa-shield-cat"></i></div>
                <div class="vehicle-info">
                  <h4>TRAVIX Safe Premier <span class="badge badge-success" style="font-size:0.65rem;">Female Verified</span></h4>
                  <p>Tata Nexon EV • Guardian Live Stream</p>
                </div>
              </div>
              <div class="vehicle-price-box">
                <div class="vehicle-price">₹240.00</div>
                <div class="vehicle-eta">3 mins away</div>
              </div>
            </div>

            <div class="vehicle-card" onclick="UserPortal.selectVehicle(this, 'Uber Premier XL', '380.00')">
              <div class="vehicle-details">
                <div class="vehicle-icon-box"><i class="fa-solid fa-truck-pickup"></i></div>
                <div class="vehicle-info">
                  <h4>Uber XL / SUV <span class="badge badge-secondary" style="font-size:0.65rem;">6 seats</span></h4>
                  <p>Spacious SUV rides • 4 mins away</p>
                </div>
              </div>
              <div class="vehicle-price-box">
                <div class="vehicle-price">₹380.00</div>
                <div class="vehicle-eta">4 mins away</div>
              </div>
            </div>
          </div>

          <!-- Payment Options Selector -->
          <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; display:block;">PAYMENT METHOD</label>
          <div class="payment-selector-bar">
            <div class="payment-tab active" onclick="UserPortal.selectPayment(this, 'UPI (GPay / PhonePe)')">
              <i class="fa-solid fa-mobile-screen"></i> UPI
            </div>
            <div class="payment-tab" onclick="UserPortal.selectPayment(this, 'Card ending in 4242')">
              <i class="fa-solid fa-credit-card"></i> Card
            </div>
            <div class="payment-tab" onclick="UserPortal.selectPayment(this, 'Cash / Wallet')">
              <i class="fa-solid fa-wallet"></i> Cash
            </div>
          </div>

          <button class="btn btn-primary" onclick="UserPortal.confirmRideRequest()" style="width:100%; font-size:1.05rem; padding:0.9rem;">
            <i class="fa-solid fa-bolt"></i> Confirm TRAVIX Ride
          </button>
        </div>
      </div>
    `;
  },

  renderHistoryView() {
    return `
      <h2><i class="fa-solid fa-receipt"></i> Ride History & Download Invoices</h2>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Ride ID</th>
              <th>Date & Time</th>
              <th>Driver</th>
              <th>Pickup & Dropoff</th>
              <th>Fare</th>
              <th>Safety Flags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>#TRX-8819</strong></td>
              <td>2026-07-28 22:30</td>
              <td>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" style="width:28px; height:28px; border-radius:50%;">
                  Sarah Smith (Toyota Camry)
                </div>
              </td>
              <td>Market St ➔ Union Square</td>
              <td><strong>$18.50</strong> <span class="badge badge-success">Paid</span></td>
              <td><span class="badge badge-warning">Guardian Mode</span></td>
              <td>
                <button class="btn btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="UserPortal.downloadInvoice('TRX-8819', 'Sarah Smith', '18.50', '2026-07-28')">
                  <i class="fa-solid fa-file-pdf"></i> Download PDF Invoice
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>#TRX-7710</strong></td>
              <td>2026-07-26 14:15</td>
              <td>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" style="width:28px; height:28px; border-radius:50%;">
                  Elena Rostova (Honda Civic)
                </div>
              </td>
              <td>SFO Airport ➔ Downtown SF</td>
              <td><strong>$34.00</strong> <span class="badge badge-success">Paid</span></td>
              <td><span class="badge badge-success">Female Match</span></td>
              <td>
                <button class="btn btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="UserPortal.downloadInvoice('TRX-7710', 'Elena Rostova', '34.00', '2026-07-26')">
                  <i class="fa-solid fa-file-pdf"></i> Download PDF Invoice
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },

  renderSafetyView() {
    return `
      <h2><i class="fa-solid fa-shield-cat" style="color:var(--secondary);"></i> Personal Safety & Guardian Preferences</h2>

      <div class="metrics-grid">
        <div class="metric-card" style="border-left:4px solid var(--secondary);">
          <div class="metric-icon" style="background:rgba(236,72,153,0.2); color:var(--secondary);">
            <i class="fa-solid fa-microphone-lines"></i>
          </div>
          <div class="metric-info">
            <h4>Voice SOS Keyword</h4>
            <p style="font-size:1.2rem;">"TRAVIX HELP"</p>
          </div>
        </div>

        <div class="metric-card" style="border-left:4px solid var(--primary);">
          <div class="metric-icon" style="background:rgba(37,99,235,0.2); color:var(--primary);">
            <i class="fa-solid fa-moon"></i>
          </div>
          <div class="metric-info">
            <h4>Night Mode Protection</h4>
            <p style="font-size:1.2rem;">Active (10 PM - 6 AM)</p>
          </div>
        </div>

        <div class="metric-card" style="border-left:4px solid var(--success);">
          <div class="metric-icon" style="background:rgba(16,185,129,0.2); color:var(--success);">
            <i class="fa-solid fa-user-group"></i>
          </div>
          <div class="metric-info">
            <h4>Guardian Mode Status</h4>
            <p style="font-size:1.2rem;">1 Contact Connected</p>
          </div>
        </div>
      </div>

      <div style="background:var(--dark-card); padding:2rem; border-radius:var(--radius-md); border:1px solid var(--dark-border); display:flex; flex-direction:column; gap:1.5rem;">
        <h3>Safety Controls</h3>
        
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Enable Voice SOS Detection</strong>
            <p style="color:var(--text-muted); font-size:0.85rem;">Automatically triggers SOS if emergency phrase is spoken during a trip</p>
          </div>
          <label class="switch">
            <input type="checkbox" checked onchange="App.showToast('Voice SOS setting updated', 'success')">
            <span class="slider"></span>
          </label>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Automatic Live Location Link to Guardians</strong>
            <p style="color:var(--text-muted); font-size:0.85rem;">Dispatches SMS link to your emergency contacts when ride starts</p>
          </div>
          <label class="switch">
            <input type="checkbox" checked onchange="App.showToast('Guardian Auto-share updated', 'success')">
            <span class="slider"></span>
          </label>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>Unsafe Zone Geofence Alerts</strong>
            <p style="color:var(--text-muted); font-size:0.85rem;">Receive warning notifications when route passes high-incident zones</p>
          </div>
          <label class="switch">
            <input type="checkbox" checked onchange="App.showToast('Geofence alerts active', 'success')">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `;
  },

  renderContactsView() {
    return `
      <h2><i class="fa-solid fa-address-book"></i> Emergency Contacts</h2>

      <div style="display:grid; grid-template-columns: 1fr 350px; gap:1.5rem;">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Relationship</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="contacts-table-body">
              <tr>
                <td><strong>Sarah Doe</strong></td>
                <td>+1 (555) 019-2831</td>
                <td>Sister</td>
                <td><span class="badge badge-success">Verified Guardian</span></td>
                <td><button class="btn btn-danger" style="padding:0.3rem 0.6rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i></button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background:var(--dark-card); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--dark-border);">
          <h3>Add Emergency Contact</h3>
          <div class="form-group" style="margin-top:1rem;">
            <label>Full Name</label>
            <input type="text" id="contact-name" class="form-control" placeholder="e.g. John Doe">
          </div>
          <div class="form-group" style="margin-top:0.75rem;">
            <label>Phone Number</label>
            <input type="text" id="contact-phone" class="form-control" placeholder="+1 (555) 000-0000">
          </div>
          <div class="form-group" style="margin-top:0.75rem;">
            <label>Relationship</label>
            <input type="text" id="contact-relation" class="form-control" placeholder="e.g. Parent / Spouse">
          </div>
          <button class="btn btn-primary" onclick="UserPortal.addContact()" style="width:100%; margin-top:1.25rem;">
            <i class="fa-solid fa-plus"></i> Save Contact
          </button>
        </div>
      </div>
    `;
  },

  renderSettingsView() {
    return `
      <h2><i class="fa-solid fa-gear"></i> Account & Privacy Settings</h2>
      <div style="background:var(--dark-card); padding:2rem; border-radius:var(--radius-md); border:1px solid var(--dark-border); max-width:650px;">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" class="form-control" value="Jane Doe">
        </div>
        <div class="form-group" style="margin-top:1rem;">
          <label>Email Address</label>
          <input type="email" class="form-control" value="user@example.com" readonly>
        </div>
        <div class="form-group" style="margin-top:1rem;">
          <label>Phone Number</label>
          <input type="text" class="form-control" value="+1234567890">
        </div>
        <div class="form-group" style="margin-top:1rem;">
          <label>Gender</label>
          <select class="form-control">
            <option selected>Female</option>
            <option>Male</option>
            <option>Other / Prefer not to say</option>
          </select>
        </div>
        <button class="btn btn-primary" style="margin-top:1.5rem;" onclick="App.showToast('Profile updated successfully', 'success')">
          Save Changes
        </button>
      </div>
    `;
  },

  confirmRideRequest() {
    const bookingPanel = document.querySelector('.booking-control-card') || document.querySelector('.booking-panel');
    if (!bookingPanel) return;

    // Render Live Uber Tracking Dashboard in panel
    bookingPanel.innerHTML = `
      <div class="live-tracking-card" id="live-tracking-dashboard">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge badge-success" id="trip-status-badge"><i class="fa-solid fa-spinner fa-spin"></i> MATCHING DRIVER</span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;" id="trip-id-badge">TRX-9982</span>
        </div>

        <div class="radar-pulse" id="radar-animation">
          <i class="fa-solid fa-shield-halved" style="color:var(--primary); font-size:1.5rem;"></i>
        </div>

        <div class="driver-info-header" id="driver-card" style="display:none;">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" class="driver-avatar" alt="Driver Profile">
          <div class="driver-details">
            <h4 id="driver-name">Ananya Sharma (Verified)</h4>
            <p id="driver-vehicle">White Tata Nexon EV (KA-01-EQ-4921)</p>
            <div style="color:#f59e0b; font-size:0.8rem; margin-top:0.2rem;">
              <i class="fa-solid fa-star"></i> 4.95 Rating • <span style="color:#10b981; font-weight:bold;">998 Trips</span>
            </div>
          </div>
        </div>

        <div class="live-trip-metrics">
          <div class="metric-pill">
            <label>ESTIMATED ETA</label>
            <span id="metric-eta">--</span>
          </div>
          <div class="metric-pill">
            <label>DISTANCE</label>
            <span id="metric-dist">4.8 km</span>
          </div>
          <div class="metric-pill">
            <label>SPEED</label>
            <span id="metric-speed">0 km/h</span>
          </div>
        </div>

        <div style="background:rgba(16,185,129,0.1); border:1px solid #10b981; padding:0.75rem; border-radius:var(--radius-sm); font-size:0.8rem; color:#10b981; display:flex; align-items:center; gap:0.5rem;">
          <i class="fa-solid fa-circle-dot fa-beat"></i>
          <span><strong>GUARDIAN LIVE STREAM ACTIVE</strong> • Contacts notified</span>
        </div>
      </div>
    `;

    // Trigger full Uber ride simulation
    App.startUberRideSimulation(
      (progress) => {
        const statusBadge = document.getElementById('trip-status-badge');
        const radarAnim = document.getElementById('radar-animation');
        const driverCard = document.getElementById('driver-card');
        const etaEl = document.getElementById('metric-eta');
        const distEl = document.getElementById('metric-dist');
        const speedEl = document.getElementById('metric-speed');

        if (progress.status === 'SEARCHING_DRIVER') {
          if (statusBadge) statusBadge.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> FINDING DRIVER';
        } else if (progress.status === 'DRIVER_ASSIGNED' || progress.status === 'DRIVER_ARRIVED' || progress.status === 'RIDE_STARTED') {
          if (radarAnim) radarAnim.style.display = 'none';
          if (driverCard) driverCard.style.display = 'flex';

          if (statusBadge) {
            let label = progress.status.replace('_', ' ');
            statusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${label}`;
          }

          if (etaEl) etaEl.innerText = progress.eta || '--';
          if (distEl) distEl.innerText = progress.distance || '--';
          if (speedEl) speedEl.innerText = progress.speed || '--';
        }
      },
      (totalDistKm) => {
        // Complete callback: Show Uber Trip Completion Modal
        UserPortal.showTripCompletionModal(totalDistKm);
      }
    );
  },

  showTripCompletionModal(totalDistKm = 4.8) {
    const destAddr = App.currentDropoff ? App.currentDropoff.address : 'Indiranagar 100ft Road, Bengaluru';
    const vehName = App.selectedVehicle ? App.selectedVehicle.name : 'TRAVIX Safe Premier';
    const farePrice = App.selectedVehicle ? App.selectedVehicle.price : '240.00';
    const distText = typeof totalDistKm === 'number' ? `${totalDistKm} km` : '4.8 km';

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div style="width:60px; height:60px; background:#dcfce7; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem auto; color:#16a34a; font-size:2rem;">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2 style="font-size:1.5rem; color:var(--text-main); margin-bottom:0.25rem;">You Have Arrived!</h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">📍 Destination: <strong>${destAddr}</strong></p>

        <div style="background:var(--dark-bg); border:1px solid var(--dark-border); padding:1rem; border-radius:var(--radius-sm); margin:1.25rem 0; text-align:left;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
            <span style="color:var(--text-muted);">Total Trip Fare (${vehName}):</span>
            <strong style="font-size:1.25rem; color:#60a5fa;">₹${farePrice}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
            <span>Distance Traveled: ${distText}</span>
            <span>Duration: ~12 mins</span>
          </div>
        </div>

        <p style="font-size:0.85rem; font-weight:600; color:var(--text-main);">Rate your experience with Ananya Sharma:</p>
        <div class="star-rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>

        <div style="display:flex; gap:0.75rem; margin-top:1.5rem;">
          <button class="btn btn-secondary" onclick="UserPortal.downloadInvoice('TRX-9982', 'Ananya Sharma', '${farePrice}', '2026-08-18')" style="flex:1;">
            <i class="fa-solid fa-file-pdf"></i> Download PDF Receipt
          </button>
          <button class="btn btn-primary" onclick="document.querySelector('.modal-overlay').remove(); App.refresh();" style="flex:1;">
            Done
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  downloadInvoice(id, driver, amount, date) {
    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write(`
      <html>
        <head>
          <title>TRAVIX Invoice #${id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1e293b; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #2563eb; }
            .section { margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }
            .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">TRAVIX RIDE INVOICE</div>
              <p>Safety-First Mobility Inc.</p>
            </div>
            <div>
              <p><strong>Invoice ID:</strong> #${id}</p>
              <p><strong>Date:</strong> ${date}</p>
            </div>
          </div>
          <div class="section">
            <p><strong>Passenger:</strong> Jane Doe</p>
            <p><strong>Driver:</strong> ${driver}</p>
            <p><strong>Payment Status:</strong> PAID (Card ending in 4242)</p>
          </div>
          <table>
            <thead>
              <tr><th>Description</th><th>Qty</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Base Ride Fare</td><td>1</td><td>$5.00</td></tr>
              <tr><td>Distance & Time Charge</td><td>1</td><td>$10.50</td></tr>
              <tr><td>Safety & Night Protection Fee</td><td>1</td><td>$3.00</td></tr>
            </tbody>
          </table>
          <div class="total">Total Paid: $${amount}</div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
  },

  addContact() {
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const relation = document.getElementById('contact-relation').value;

    if (!name || !phone) {
      App.showToast('Please enter contact name and phone number', 'error');
      return;
    }

    const tbody = document.getElementById('contacts-table-body');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${name}</strong></td>
      <td>${phone}</td>
      <td>${relation || 'Family'}</td>
      <td><span class="badge badge-success">Verified Guardian</span></td>
      <td><button class="btn btn-danger" style="padding:0.3rem 0.6rem; font-size:0.75rem;"><i class="fa-solid fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
    App.showToast(`Emergency contact ${name} added successfully!`, 'success');
  },

  selectVehicle(cardElement, name, price) {
    document.querySelectorAll('.vehicle-card').forEach(el => el.classList.remove('selected'));
    cardElement.classList.add('selected');
    App.selectedVehicle = { name, price };
    App.showToast(`Selected ${name} (Fare: ₹${price})`, 'info');
  },

  selectPayment(tabElement, method) {
    document.querySelectorAll('.payment-tab').forEach(el => el.classList.remove('active'));
    tabElement.classList.add('active');
    App.selectedPayment = method;
    App.showToast(`Payment method updated to ${method}`, 'info');
  }
};
