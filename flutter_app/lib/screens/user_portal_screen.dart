import 'package:flutter/material.dart';

class UserPortalScreen extends StatefulWidget {
  const UserPortalScreen({super.key});

  @override
  State<UserPortalScreen> createState() => _UserPortalScreenState();
}

class _UserPortalScreenState extends State<UserPortalScreen> {
  bool _femalePriority = true;
  bool _guardianMode = true;
  int _selectedTabIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.shield_outlined, color: Colors.blueAccent),
            SizedBox(width: 8),
            Text("TRAVIX - Passenger Portal", style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("🚨 CRITICAL VOICE SOS ACTIVATED! Location broadcast dispatched.")),
              );
            },
            icon: const Icon(Icons.warning, color: Colors.white),
            label: const Text("VOICE SOS", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: _selectedTabIndex,
            onDestinationSelected: (index) => setState(() => _selectedTabIndex = index),
            labelType: NavigationRailLabelType.all,
            destinations: const [
              NavigationRailDestination(icon: Icon(Icons.local_taxi), label: Text("Book Ride")),
              NavigationRailDestination(icon: Icon(Icons.history), label: Text("History")),
              NavigationRailDestination(icon: Icon(Icons.security), label: Text("Safety")),
              NavigationRailDestination(icon: Icon(Icons.contacts), label: Text("Contacts")),
            ],
          ),
          const VerticalDivider(thickness: 1, width: 1),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: _selectedTabIndex == 0 ? _buildBookingView() : _buildHistoryView(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBookingView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text("Book Your Safe Ride", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                const TextField(decoration: InputDecoration(labelText: "Pickup Address", prefixIcon: Icon(Icons.my_location))),
                const SizedBox(height: 12),
                const TextField(decoration: InputDecoration(labelText: "Dropoff Destination", prefixIcon: Icon(Icons.location_on))),
                const SizedBox(height: 16),
                SwitchListTile(
                  title: const Text("Female Driver Priority"),
                  subtitle: const Text("Match verified female drivers for night safety"),
                  value: _femalePriority,
                  onChanged: (v) => setState(() => _femalePriority = v),
                ),
                SwitchListTile(
                  title: const Text("Guardian Mode"),
                  subtitle: const Text("Auto-share live tracking link with emergency contacts"),
                  value: _guardianMode,
                  onChanged: (v) => setState(() => _guardianMode = v),
                ),
                const SizedBox(height: 16),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Requesting TRAVIX Ride... Driver Sarah Smith assigned!")),
                    );
                  },
                  icon: const Icon(Icons.car_rental),
                  label: const Text("Request TRAVIX Ride (\$18.50)"),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildHistoryView() {
    return ListView(
      children: [
        const Text("Ride History & Invoices", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        ListTile(
          tileColor: Colors.grey.shade900,
          leading: const Icon(Icons.directions_car, color: Colors.blueAccent),
          title: const Text("Market St ➔ Union Square (#TRX-8819)"),
          subtitle: const Text("2026-07-28 • Driver: Sarah Smith • \$18.50"),
          trailing: IconButton(
            icon: const Icon(Icons.picture_as_pdf, color: Colors.green),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Downloading PDF Invoice...")));
            },
          ),
        ),
      ],
    );
  }
}
