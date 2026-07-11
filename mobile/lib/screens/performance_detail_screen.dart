import 'package:flutter/material.dart';

class PerformanceDetailScreen extends StatefulWidget {
  final Map<String, dynamic> student;

  const PerformanceDetailScreen({super.key, required this.student});

  @override
  State<PerformanceDetailScreen> createState() => _PerformanceDetailScreenState();
}

class _PerformanceDetailScreenState extends State<PerformanceDetailScreen> {
  List<Map<String, dynamic>> _records = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadRecords();
  }

  Future<void> _loadRecords() async {
    await Future.delayed(const Duration(milliseconds: 500));
    if (mounted) {
      setState(() {
        _records = [
          {'course': 'Data Structures', 'score': 88.5, 'grade': 'A', 'attendance': 92, 'semester': 'Sem 4'},
          {'course': 'Computer Networks', 'score': 74.0, 'grade': 'B+', 'attendance': 78, 'semester': 'Sem 4'},
          {'course': 'Database Systems', 'score': 91.0, 'grade': 'A', 'attendance': 95, 'semester': 'Sem 4'},
          {'course': 'Software Engineering', 'score': 82.0, 'grade': 'B+', 'attendance': 88, 'semester': 'Sem 3'},
          {'course': 'Operating Systems', 'score': 67.5, 'grade': 'B', 'attendance': 85, 'semester': 'Sem 3'},
        ];
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final s = widget.student;

    if (_loading) {
      return Scaffold(
        appBar: AppBar(title: const Text('Performance Details')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final avgScore = _records.isEmpty
        ? 0.0
        : _records.fold<double>(0, (sum, r) => sum + (r['score'] as double)) / _records.length;
    final avgAttendance = _records.isEmpty
        ? 0.0
        : _records.fold<double>(0, (sum, r) => sum + (r['attendance'] as num).toDouble()) / _records.length;
    final bestRecord = _records.isEmpty
        ? null
        : _records.reduce((a, b) => (a['score'] as double) > (b['score'] as double) ? a : b);
    final totalRecords = _records.length;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Performance Details'),
        backgroundColor: const Color(0xFF1a237e),
        foregroundColor: Colors.white,
      ),
      body: RefreshIndicator(
        onRefresh: _loadRecords,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 30,
                      backgroundColor: const Color(0xFF1a237e),
                      child: Text(
                        (s['name']?.toString().characters.first ?? '?').toUpperCase(),
                        style: const TextStyle(fontSize: 24, color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(s['name'] ?? 'Unknown', style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
                          const SizedBox(height: 4),
                          Text('ID: ${s['_id'] ?? s['id'] ?? 'N/A'}', style: TextStyle(color: Colors.grey[600], fontSize: 13)),
                          if (s['course'] != null)
                            Text(s['course'], style: TextStyle(color: Colors.grey[600], fontSize: 13)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1.6,
              children: [
                _buildStatCard('Average Score', '${avgScore.toStringAsFixed(1)}%', Colors.green),
                _buildStatCard('Attendance', '${avgAttendance.toStringAsFixed(1)}%', const Color(0xFF00bcd4)),
                _buildStatCard('Best Grade', bestRecord?['grade'] ?? 'N/A', const Color(0xFF1a237e)),
                _buildStatCard('Total Records', '$totalRecords', Colors.orange),
              ],
            ),
            const SizedBox(height: 20),
            Text('Performance Records', style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            ...List.generate(_records.length, (i) {
              final r = _records[i];
              final score = r['score'] as num;
              final attendance = r['attendance'] as num;
              return Card(
                margin: const EdgeInsets.only(bottom: 8),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(r['course'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: score >= 70 ? Colors.green.withOpacity(0.1) : Colors.red.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              '${r['grade'] ?? ''}',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: score >= 70 ? Colors.green : Colors.red,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          _buildRecordChip(Icons.assignment_turned_in, 'Score: ${score.toStringAsFixed(1)}%', Colors.green),
                          const SizedBox(width: 12),
                          _buildRecordChip(Icons.people, 'Att: $attendance%', attendance >= 80 ? Colors.green : Colors.orange),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(r['semester'] ?? '', style: TextStyle(color: Colors.grey[500], fontSize: 12)),
                    ],
                  ),
                ),
              );
            }),
          ],
        ),
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
            Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color)),
            const SizedBox(height: 4),
            Text(label, style: TextStyle(fontSize: 12, color: Colors.grey[600])),
          ],
        ),
      ),
    );
  }

  Widget _buildRecordChip(IconData icon, String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: color),
          const SizedBox(width: 4),
          Text(text, style: TextStyle(fontSize: 12, color: color, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}
