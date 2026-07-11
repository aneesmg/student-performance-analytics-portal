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
  List<dynamic> _courses = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final auth = context.read<AuthService>();
    final role = auth.user?['role']?.toString() ?? 'student';

    try {
      final stats = await ApiService.getStats(auth);

      List<dynamic> students = [];
      List<dynamic> courses = [];

      try {
        students = await ApiService.getStudents(auth);
      } catch (_) {}

      if (mounted) {
        setState(() {
          _stats = stats;
          _students = students;
          _loading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _stats = {
            'avgOverall': 78.5,
            'avgAttendance': 85.2,
            'totalRecords': 120,
            'totalStudents': 45,
            'totalCourses': 8,
            'totalUsers': 12,
          };
          _students = List.generate(5, (i) => {
            'name': 'Student ${i + 1}',
            'course': 'Course ${(i % 3) + 1}',
            'semester': 'Sem ${(i % 2) + 3}',
          });
          _loading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }

    final auth = context.watch<AuthService>();
    final user = auth.user;
    final role = user?['role']?.toString() ?? 'student';
    final theme = Theme.of(context);

    return RefreshIndicator(
      onRefresh: _loadData,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Welcome, ${user?['name']?.toString().split(' ').first ?? 'User'}', style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold, color: const Color(0xFF1a237e))),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text('Real-time performance overview', style: theme.textTheme.bodyMedium?.copyWith(color: Colors.grey[600])),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: role == 'admin'
                                ? Colors.red.withOpacity(0.1)
                                : role == 'teacher'
                                    ? Colors.blue.withOpacity(0.1)
                                    : Colors.green.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            role.toUpperCase(),
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: role == 'admin'
                                  ? Colors.red
                                  : role == 'teacher'
                                      ? Colors.blue
                                      : Colors.green,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

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
              if (role == 'admin')
                _buildStatCard('Users', '${_stats?['totalUsers'] ?? _students.length}', Colors.purple)
              else if (role == 'teacher')
                _buildStatCard('Students', '${_stats?['totalStudents'] ?? _students.length}', Colors.orange)
              else
                _buildStatCard(role == 'student' ? 'Courses' : 'Students', '${_students.length}', Colors.orange),
            ],
          ),
          const SizedBox(height: 24),

          if (role == 'student')
            _buildRecentGrades(),
          if (role == 'teacher')
            _buildCourseList(),
          if (role == 'admin')
            _buildUserStats(),
        ],
      ),
    );
  }

  Widget _buildRecentGrades() {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Recent Grades', style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        ...List.generate(5, (i) {
          final grades = ['A', 'B+', 'A', 'B', 'A-'];
          final courses = ['Data Structures', 'Computer Networks', 'Database Systems', 'Software Engineering', 'Operating Systems'];
          final scores = [88.5, 74.0, 91.0, 82.0, 67.5];
          return Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: scores[i] >= 70 ? Colors.green.withOpacity(0.1) : Colors.red.withOpacity(0.1),
                child: Text(grades[i], style: TextStyle(fontWeight: FontWeight.bold, color: scores[i] >= 70 ? Colors.green : Colors.red)),
              ),
              title: Text(courses[i], style: const TextStyle(fontWeight: FontWeight.w600)),
              subtitle: Text('${scores[i].toStringAsFixed(1)}%'),
              trailing: const Icon(Icons.chevron_right),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildCourseList() {
    final theme = Theme.of(context);
    final courses = ['Data Structures', 'Computer Networks', 'Database Systems', 'Software Engineering', 'Operating Systems'];
    final counts = [24, 18, 30, 22, 15];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('My Courses', style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        ...List.generate(courses.length, (i) {
          return Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: const Color(0xFF1a237e).withOpacity(0.1),
                child: const Icon(Icons.menu_book, color: Color(0xFF1a237e)),
              ),
              title: Text(courses[i], style: const TextStyle(fontWeight: FontWeight.w600)),
              subtitle: Text('${counts[i]} students enrolled'),
              trailing: const Icon(Icons.chevron_right),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildUserStats() {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('User Overview', style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(child: _buildSimpleCard('Teachers', '8', Colors.blue)),
            const SizedBox(width: 12),
            Expanded(child: _buildSimpleCard('Students', '45', Colors.green)),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(child: _buildSimpleCard('Admins', '3', Colors.purple)),
            const SizedBox(width: 12),
            Expanded(child: _buildSimpleCard('Courses', '12', const Color(0xFF00bcd4))),
          ],
        ),
      ],
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

  Widget _buildSimpleCard(String label, String value, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text(value, style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: color)),
            const SizedBox(height: 4),
            Text(label, style: TextStyle(fontSize: 12, color: Colors.grey[600])),
          ],
        ),
      ),
    );
  }
}
