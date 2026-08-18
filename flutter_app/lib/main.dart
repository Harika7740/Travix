import 'package:flutter/material.dart';
import 'screens/user_portal_screen.dart';
import 'screens/driver_portal_screen.dart';
import 'screens/admin_dashboard_screen.dart';

void main() {
  runApp(const TravixApp());
}

class TravixApp extends StatelessWidget {
  const TravixApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TRAVIX Web App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.blue,
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const PortalSelectionScreen(),
        '/user': (context) => const UserPortalScreen(),
        '/driver': (context) => const DriverPortalScreen(),
        '/admin': (context) => const AdminDashboardScreen(),
      },
    );
  }
}

class PortalSelectionScreen extends StatelessWidget {
  const PortalSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          maxWidth: 480,
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.shield, size: 64, color: Colors.blueAccent),
              const SizedBox(height: 16),
              const Text("TRAVIX", style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold)),
              const Text("Safety-First Ride-Hailing Platform", style: TextStyle(color: Colors.grey)),
              const SizedBox(height: 32),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
                onPressed: () => Navigator.pushNamed(context, '/user'),
                icon: const Icon(Icons.person),
                label: const Text("Launch User Portal"),
              ),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50), backgroundColor: Colors.blue.shade800),
                onPressed: () => Navigator.pushNamed(context, '/driver'),
                icon: const Icon(Icons.drive_eta),
                label: const Text("Launch Driver Portal"),
              ),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50), backgroundColor: Colors.indigo.shade900),
                onPressed: () => Navigator.pushNamed(context, '/admin'),
                icon: const Icon(Icons.admin_panel_settings),
                label: const Text("Launch Admin Dashboard"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
