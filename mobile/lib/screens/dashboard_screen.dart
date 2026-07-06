import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/api_service.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  Map<String, dynamic>? _stats;
  List<dynamic> _students = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final auth = context.read<AuthService>();
    try {
      final stats = await ApiService.getStats(auth);
      final students = await ApiService.getStudents(auth);
      if (mounted) {
        setState(() {
          _stats = stats;
          _students = students;
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

    final theme = Theme.of(context);

    return RefreshIndicator(
      onRefresh: _loadData,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text('Dashboard', style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold, color: const Color(0xFF1a237e))),
          const SizedBox(height: 8),
          Text('Real-time performance overview', style: theme.textTheme.bodyMedium?.copyWith(color: Colors.grey[600])),
          const SizedBox(height: 24),

          // Stats cards
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.5,
            children: [
              _buildStatCard('Avg Score', '${(_stats?['avgOverall'] ?? 0).toStringAsFixed(1)}%', Colors.green),
              _buildStatCard('Attendance', '${(_stats?['avgAttendance'] ?? 0).toStringAsFixed(1)}%', const Color(0xFF00bcd4)),
              _buildStatCard('Records', '${_stats?['totalRecords'] ?? 0}', const Color(0xFF1a237e)),
              _buildStatCard('Students', '${_students.length}', Colors.orange),
            ],
          ),
          const SizedBox(height: 24),

          // Recent students
          Text('Students', style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          ...(_students.take(5).map((s) => Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: const Color(0xFF1a237e),
                child: Text(s['name']?.toString().characters.first ?? '?', style: const TextStyle(color: Colors.white)),
              ),
              title: Text(s['name'] ?? 'Unknown', style: const TextStyle(fontWeight: FontWeight.w600)),
              subtitle: Text('${s['course'] ?? ''} - Sem ${s['semester'] ?? ''}'),
              trailing: const Icon(Icons.chevron_right),
            ),
          ))),
        ],
      ),
    );
  }

  Widget _buildStatCard(String label, String value, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(width: 40, height: 4, decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(2))),
            const SizedBox(height: 12),
            Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color)),
            const SizedBox(height: 4),
            Text(label, style: TextStyle(fontSize: 12, color: Colors.grey[600])),
          ],
        ),
      ),
    );
  }
}
