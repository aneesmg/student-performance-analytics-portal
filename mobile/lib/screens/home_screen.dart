import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/theme_service.dart';
import 'login_screen.dart';
import 'profile_screen.dart';
import 'dashboard_screen.dart';
import 'performance_detail_screen.dart';
import 'notifications_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  void _logout() {
    context.read<AuthService>().logout();
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (_) => const LoginScreen()),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthService>();
    final themeService = context.watch<ThemeService>();
    final user = auth.user;
    final role = user?['role']?.toString() ?? 'student';

    final screens = _buildScreens(role);
    final navItems = _buildNavItems(role);

    if (_currentIndex >= screens.length) {
      _currentIndex = 0;
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('SPAP'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const NotificationsScreen()));
            },
          ),
          Padding(
            padding: const EdgeInsets.only(right: 4),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: Colors.white24,
              child: Text(
                (user?['name']?.toString().characters.first ?? 'U').toUpperCase(),
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          IconButton(
            icon: Icon(themeService.isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: () => themeService.toggleTheme(),
            tooltip: 'Toggle theme',
          ),
          IconButton(icon: const Icon(Icons.logout), onPressed: _logout),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
        selectedItemColor: const Color(0xFF1a237e),
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        items: navItems,
      ),
    );
  }

  List<Widget> _buildScreens(String role) {
    switch (role) {
      case 'admin':
        return const [
          DashboardScreen(),
          DashboardScreen(),
          ProfileScreen(),
        ];
      case 'teacher':
        return [
          const DashboardScreen(),
          PerformanceDetailScreen(student: {
            'name': 'Mock Student',
            '_id': 'STU001',
            'course': 'Computer Science',
          }),
          const ProfileScreen(),
        ];
      case 'student':
      default:
        return [
          const DashboardScreen(),
          PerformanceDetailScreen(student: {
            'name': user?['name'] ?? 'Student',
            '_id': user?['id'] ?? 'STU001',
            'course': 'General',
          }),
          const ProfileScreen(),
        ];
    }
  }

  List<BottomNavigationBarItem> _buildNavItems(String role) {
    switch (role) {
      case 'admin':
        return const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.supervisor_account), label: 'Users'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ];
      case 'teacher':
        return const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.school), label: 'Students'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ];
      case 'student':
      default:
        return const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.grade), label: 'Grades'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ];
    }
  }

  String? get user => context.read<AuthService>().user?['name']?.toString();
}
