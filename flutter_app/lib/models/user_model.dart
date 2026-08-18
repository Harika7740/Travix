class UserModel {
  final String uid;
  final String email;
  final String fullName;
  final String phone;
  final String gender;
  final String role;
  final bool voiceSosEnabled;
  final bool guardianModeAutoStart;
  final bool nightModeProtection;

  UserModel({
    required this.uid,
    required this.email,
    required this.fullName,
    required this.phone,
    required this.gender,
    required this.role,
    this.voiceSosEnabled = true,
    this.guardianModeAutoStart = true,
    this.nightModeProtection = true,
  });

  factory UserModel.fromMap(Map<String, dynamic> map, String id) {
    final prefs = map['safetyPreferences'] as Map<String, dynamic>? ?? {};
    return UserModel(
      uid: id,
      email: map['email'] ?? '',
      fullName: map['fullName'] ?? '',
      phone: map['phone'] ?? '',
      gender: map['gender'] ?? 'unspecified',
      role: map['role'] ?? 'passenger',
      voiceSosEnabled: prefs['voiceSosEnabled'] ?? true,
      guardianModeAutoStart: prefs['guardianModeAutoStart'] ?? true,
      nightModeProtection: prefs['nightModeProtection'] ?? true,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'email': email,
      'fullName': fullName,
      'phone': phone,
      'gender': gender,
      'role': role,
      'safetyPreferences': {
        'voiceSosEnabled': voiceSosEnabled,
        'guardianModeAutoStart': guardianModeAutoStart,
        'nightModeProtection': nightModeProtection,
      }
    };
  }
}
