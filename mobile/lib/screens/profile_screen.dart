import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/api_service.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic>? _studentProfile;
  List<dynamic> _performance = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadProfile();
  }

  Future<void> _loadProfile() async {
    final auth = context.read<AuthService>();
    final userId = auth.user?['id'] ?? '';

    if (userId.isEmpty) {
      if (mounted) setState(() => _loading = false);
      return;
    }

    try {
      final student = await ApiService.getStudentById(auth, userId);
      final perf = await ApiService.getPerformance(auth, student['_id'] ?? userId);
      if (mounted) {
        setState(() {
          _studentProfile = student;
          _performance = perf;
          _loading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }

    final auth = context.watch<AuthService>();
    final user = auth.user;
    final theme = Theme.of(context);

    final avgScore = _performance.isEmpty
        ? 0.0
        : _performance.fold<double>(0, (s, p) => s + (p['overallPercentage'] ?? 0).toDouble()) / _performance.length;

    return RefreshIndicator(
      onRefresh: _loadProfile,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Profile header
          Center(
            child: Column(
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor: const Color(0xFF1a237e),
                  child: Text(
                    (user?['name']?.toString().characters.first ?? 'U').toUpperCase(),
                    style: const TextStyle(fontSize: 32, color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(height: 12),
                Text(_studentProfile?['name'] ?? user?['name'] ?? 'User', style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
                Text(_studentProfile?['email'] ?? user?['email'] ?? '', style: TextStyle(color: Colors.grey[600])),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(color: const Color(0xFF1a237e).withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
                  child: Text(user?['role']?.toString().toUpperCase() ?? 'STUDENT', style: const TextStyle(color: Color(0xFF1a237e), fontWeight: FontWeight.bold, fontSize: 12)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Stats grid
          Row(
            children: [
              Expanded(child: _buildInfoCard('Avg Score', '${avgScore.toStringAsFixed(1)}%', Colors.green)),
              const SizedBox(width: 12),
              Expanded(child: _buildInfoCard('Records', '${_performance.length}', const Color(0xFF00bcd4))),
              const SizedBox(width: 12),
              Expanded(child: _buildInfoCard('Course', _studentProfile?['course'] ?? 'N/A', const Color(0xFF1a237e))),
            ],
          ),
          const SizedBox(height: 24),

          // Performance table
          Text('Performance Records', style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          if (_performance.isEmpty)
            const Card(child: Padding(padding: EdgeInsets.all(32), child: Center(child: Text('No records available'))))
          else
            ...List.generate(_performance.length, (i) {
              final p = _performance[i];
              return Card(
                margin: const EdgeInsets.only(bottom: 8),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(p['course'] ?? 'General', style: const TextStyle(fontWeight: FontWeight.w600)),
                            const SizedBox(height: 4),
                            Text('Sem ${p['semester'] ?? 'N/A'}', style: TextStyle(color: Colors.grey[600], fontSize: 12)),
                          ],
                        ),
                      ),
                      Column(
                        children: [
                          Text('${p['overallPercentage'] ?? 0}%', style: TextStyle(fontWeight: FontWeight.bold, color: (p['overallPercentage'] ?? 0) >= 60 ? Colors.green : Colors.red)),
                          Text(p['grade'] ?? 'N/A', style: TextStyle(color: Colors.grey[600], fontSize: 12)),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            }),
        ],
      ),
    );
  }

  Widget _buildInfoCard(String label, String value, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: color)),
            const SizedBox(height: 4),
            Text(label, style: TextStyle(fontSize: 11, color: Colors.grey[600])),
          ],
        ),
      ),
    );
  }
}
