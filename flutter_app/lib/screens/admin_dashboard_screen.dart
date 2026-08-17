import 'package:flutter/material.dart';

class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("TRAVIX - Admin Command Dashboard"),
        backgroundColor: Colors.indigo,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Security & Operations Control Center", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            Card(
              color: Colors.red.shade900.withOpacity(0.3),
              child: ListTile(
                leading: const Icon(Icons.warning, color: Colors.redAccent, size: 36),
                title: const Text("CRITICAL SOS ALERT (#SOS-3301)", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.redAccent)),
                subtitle: const Text("User: Jane Doe • Voice Keyword Triggered at 37.7780, -122.4180"),
                trailing: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Emergency Responders Dispatched. SOS Resolved.")));
                  },
                  icon: const Icon(Icons.shield),
                  label: const Text("Dispatch & Resolve"),
                ),
              ),
            ),
            const SizedBox(height: 24),
            const Text("Pending Driver Verifications", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Card(
              child: ListTile(
                leading: const CircleAvatar(child: Text("JM")),
                title: const Text("John Miller (Honda Accord TRX-1090)"),
                subtitle: const Text("Documents: License, Insurance, Background Check Submitted"),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    ElevatedButton(onPressed: () {}, child: const Text("Approve")),
                    const SizedBox(width: 8),
                    OutlinedButton(onPressed: () {}, child: const Text("Reject")),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
