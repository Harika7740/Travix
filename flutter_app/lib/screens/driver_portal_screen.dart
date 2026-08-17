import 'package:flutter/material.dart';

class DriverPortalScreen extends StatefulWidget {
  const DriverPortalScreen({super.key});

  @override
  State<DriverPortalScreen> createState() => _DriverPortalScreenState();
}

class _DriverPortalScreenState extends State<DriverPortalScreen> {
  bool _isOnline = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("TRAVIX - Driver Portal"),
        actions: [
          Row(
            children: [
              Text(_isOnline ? "ONLINE" : "OFFLINE", style: TextStyle(color: _isOnline ? Colors.green : Colors.red, fontWeight: FontWeight.bold)),
              Switch(
                value: _isOnline,
                onChanged: (v) => setState(() => _isOnline = v),
              ),
            ],
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                _buildMetricCard("Today's Earnings", "\$184.50", Icons.attach_money, Colors.green),
                const SizedBox(width: 16),
                _buildMetricCard("Completed Trips", "12 Rides", Icons.car_repair, Colors.blue),
                const SizedBox(width: 16),
                _buildMetricCard("Rating", "4.9 ★", Icons.star, Colors.amber),
              ],
            ),
            const SizedBox(height: 24),
            Card(
              child: ListTile(
                title: const Text("Incoming Dispatch Request: Jane Doe"),
                subtitle: const Text("Market St ➔ Union Square • 4.2 km • \$18.50"),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Ride Accepted! Navigation started.")));
                      },
                      child: const Text("Accept"),
                    ),
                    const SizedBox(width: 8),
                    OutlinedButton(
                      onPressed: () {},
                      child: const Text("Decline"),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMetricCard(String title, String val, IconData icon, Color color) {
    return Expanded(
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              Icon(icon, color: color, size: 36),
              const SizedBox(height: 8),
              Text(title, style: const TextStyle(color: Colors.grey)),
              Text(val, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            ],
          ),
        ),
      ),
    );
  }
}
