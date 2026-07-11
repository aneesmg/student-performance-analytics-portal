import 'package:flutter/material.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  final List<Map<String, dynamic>> _notifications = [
    {'title': 'Grade Posted', 'message': 'Your Data Structures grade has been updated.', 'type': 'success', 'time': '2 hours ago', 'isRead': false},
    {'title': 'Attendance Warning', 'message': 'Your attendance in Computer Networks is below 80%.', 'type': 'warning', 'time': '1 day ago', 'isRead': false},
    {'title': 'New Course Material', 'message': 'New module added to Database Systems.', 'type': 'info', 'time': '3 days ago', 'isRead': true},
    {'title': 'System Update', 'message': 'Portal will be down for maintenance on Saturday.', 'type': 'error', 'time': '5 days ago', 'isRead': true},
  ];

  void _markAllRead() {
    setState(() {
      for (final n in _notifications) {
        n['isRead'] = true;
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('All notifications marked as read'), behavior: SnackBarBehavior.floating),
    );
  }

  IconData _iconForType(String type) {
    switch (type) {
      case 'success':
        return Icons.check_circle;
      case 'warning':
        return Icons.warning_amber;
      case 'error':
        return Icons.error;
      case 'info':
      default:
        return Icons.info_outline;
    }
  }

  Color _colorForType(String type) {
    switch (type) {
      case 'success':
        return Colors.green;
      case 'warning':
        return Colors.orange;
      case 'error':
        return Colors.red;
      case 'info':
      default:
        return const Color(0xFF00bcd4);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final unreadCount = _notifications.where((n) => n['isRead'] == false).length;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        backgroundColor: const Color(0xFF1a237e),
        foregroundColor: Colors.white,
        actions: [
          if (unreadCount > 0)
            TextButton.icon(
              onPressed: _markAllRead,
              icon: const Icon(Icons.done_all, color: Colors.white),
              label: const Text('Mark all read', style: TextStyle(color: Colors.white)),
            ),
        ],
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: _notifications.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (context, i) {
          final n = _notifications[i];
          final isRead = n['isRead'] as bool;
          final type = n['type'] as String;
          final color = _colorForType(type);

          return Card(
            child: InkWell(
              borderRadius: BorderRadius.circular(12),
              onTap: () {
                if (!isRead) {
                  setState(() => n['isRead'] = true);
                }
              },
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: color.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(_iconForType(type), color: color, size: 24),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: Text(n['title'] ?? '', style: TextStyle(fontWeight: isRead ? FontWeight.normal : FontWeight.bold, fontSize: 15)),
                              ),
                              if (!isRead)
                                Container(
                                  width: 8,
                                  height: 8,
                                  decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFF00bcd4)),
                                ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Text(n['message'] ?? '', style: TextStyle(color: Colors.grey[600], fontSize: 13)),
                          const SizedBox(height: 6),
                          Text(n['time'] ?? '', style: TextStyle(color: Colors.grey[400], fontSize: 11)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
