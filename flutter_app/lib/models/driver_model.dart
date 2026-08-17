class DriverModel {
  final String uid;
  final String email;
  final String fullName;
  final String phone;
  final String gender;
  final String verificationStatus; // "pending", "approved", "rejected"
  final bool isOnline;
  final String vehicleMakeModel;
  final String plateNumber;
  final double rating;

  DriverModel({
    required this.uid,
    required this.email,
    required this.fullName,
    required this.phone,
    required this.gender,
    required this.verificationStatus,
    required this.isOnline,
    required this.vehicleMakeModel,
    required this.plateNumber,
    required this.rating,
  });

  factory DriverModel.fromMap(Map<String, dynamic> map, String id) {
    final vehicle = map['vehicle'] as Map<String, dynamic>? ?? {};
    return DriverModel(
      uid: id,
      email: map['email'] ?? '',
      fullName: map['fullName'] ?? '',
      phone: map['phone'] ?? '',
      gender: map['gender'] ?? 'unspecified',
      verificationStatus: map['verificationStatus'] ?? 'pending',
      isOnline: map['isOnline'] ?? false,
      vehicleMakeModel: "${vehicle['make'] ?? ''} ${vehicle['model'] ?? ''}",
      plateNumber: vehicle['plateNumber'] ?? '',
      rating: (map['rating'] as num?)?.toDouble() ?? 5.0,
    );
  }
}
