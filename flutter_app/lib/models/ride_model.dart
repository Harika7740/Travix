class RideModel {
  final String rideId;
  final String passengerId;
  final String driverId;
  final String status;
  final String pickupAddress;
  final String dropoffAddress;
  final double fareAmount;
  final bool femalePriority;
  final bool guardianActive;

  RideModel({
    required this.rideId,
    required this.passengerId,
    required this.driverId,
    required this.status,
    required this.pickupAddress,
    required this.dropoffAddress,
    required this.fareAmount,
    required this.femalePriority,
    required this.guardianActive,
  });

  factory RideModel.fromMap(Map<String, dynamic> map, String id) {
    final fare = map['fare'] as Map<String, dynamic>? ?? {};
    final pickup = map['pickup'] as Map<String, dynamic>? ?? {};
    final dropoff = map['dropoff'] as Map<String, dynamic>? ?? {};
    final safety = map['safetyFlags'] as Map<String, dynamic>? ?? {};

    return RideModel(
      rideId: id,
      passengerId: map['passengerId'] ?? '',
      driverId: map['driverId'] ?? '',
      status: map['status'] ?? 'requested',
      pickupAddress: pickup['address'] ?? '',
      dropoffAddress: dropoff['address'] ?? '',
      fareAmount: (fare['amount'] as num?)?.toDouble() ?? 0.0,
      femalePriority: safety['femalePriorityRequested'] ?? false,
      guardianActive: safety['guardianModeActive'] ?? false,
    );
  }
}
