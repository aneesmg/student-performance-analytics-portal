import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/api_service.dart';
import '../services/theme_service.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic>? _studentProfile;
  List<dynamic> _performance = [];
  bool _loading = true;
  bool _isEditing = false;
  bool _notificationsEnabled = true;

  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadProfile();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
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
          _nameController.text = student['name'] ?? auth.user?['name'] ?? '';
          _phoneController.text = student['phone'] ?? '';
        });
      }
    } catch (e) {
      if (mounted) setState(() => _loading = false);
    }
  }

  void _toggleEdit() {
    setState(() {
      _isEditing = !_isEditing;
      if (!_isEditing) {
        final auth = context.read<AuthService>();
        _nameController.text = _studentProfile?['name'] ?? auth.user?['name'] ?? '';
        _phoneController.text = _studentProfile?['phone'] ?? '';
      }
    });
  }

  void _saveProfile() {
    final auth = context.read<AuthService>();
    if (mounted) {
      setState(() {
        _studentProfile?['name'] = _nameController.text;
        _studentProfile?['phone'] = _phoneController.text;
        _isEditing = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Profile updated'), behavior: SnackBarBehavior.floating),
      );
    }
  }

  void _changePassword() {
    if (_newPasswordController.text.length < 6) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('New password must be at least 6 characters'), backgroundColor: Colors.red, behavior: SnackBarBehavior.floating),
      );
      return;
    }
    if (_newPasswordController.text != _confirmPasswordController.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Passwords do not match'), backgroundColor: Colors.red, behavior: SnackBarBehavior.floating),
      );
      return;
    }
    _currentPasswordController.clear();
    _newPasswordController.clear();
    _confirmPasswordController.clear();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Password changed successfully'), behavior: SnackBarBehavior.floating),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }

    final auth = context.watch<AuthService>();
    final user = auth.user;
    final theme = Theme.of(context);
    final themeService = context.watch<ThemeService>();

    final avgScore = _performance.isEmpty
        ? 0.0
        : _performance.fold<double>(0, (s, p) => s + (p['overallPercentage'] ?? 0).toDouble()) / _performance.length;

    return RefreshIndicator(
      onRefresh: _loadProfile,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Center(
            child: Column(
              children: [
                Stack(
                  children: [
                    CircleAvatar(
                      radius: 40,
                      backgroundColor: const Color(0xFF1a237e),
                      child: Text(
                        (user?['name']?.toString().characters.first ?? 'U').toUpperCase(),
                        style: const TextStyle(fontSize: 32, color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                    ),
                    if (_isEditing)
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: CircleAvatar(
                          radius: 14,
                          backgroundColor: const Color(0xFF00bcd4),
                          child: const Icon(Icons.camera_alt, size: 14, color: Colors.white),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 12),
                if (_isEditing)
                  SizedBox(
                    width: 200,
                    child: TextField(
                      controller: _nameController,
                      textAlign: TextAlign.center,
                      decoration: InputDecoration(
                        hintText: 'Full Name',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      ),
                      style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                    ),
                  )
                else
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

          _buildSectionHeader('Account Information'),
          const SizedBox(height: 8),
          Card(
            child: Column(
              children: [
                _buildInfoTile(Icons.person_outline, 'Name', _nameController.text, editMode: _isEditing, controller: _nameController),
                const Divider(height: 1),
                _buildInfoTile(Icons.phone_outlined, 'Phone', _phoneController.text, editMode: _isEditing, controller: _phoneController),
                const Divider(height: 1),
                _buildInfoTile(Icons.email_outlined, 'Email', _studentProfile?['email'] ?? user?['email'] ?? '', editMode: false),
              ],
            ),
          ),
          if (_isEditing)
            Padding(
              padding: const EdgeInsets.only(top: 12),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: _toggleEdit,
                      style: OutlinedButton.styleFrom(foregroundColor: Colors.red),
                      child: const Text('Cancel'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _saveProfile,
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1a237e), foregroundColor: Colors.white),
                      child: const Text('Save'),
                    ),
                  ),
                ],
              ),
            )
          else
            Padding(
              padding: const EdgeInsets.only(top: 12),
              child: SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: _toggleEdit,
                  icon: const Icon(Icons.edit),
                  label: const Text('Edit Profile'),
                ),
              ),
            ),
          const SizedBox(height: 24),

          _buildSectionHeader('Change Password'),
          const SizedBox(height: 8),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  TextField(
                    controller: _currentPasswordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Current Password',
                      prefixIcon: const Icon(Icons.lock_outlined),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      isDense: true,
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _newPasswordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'New Password',
                      prefixIcon: const Icon(Icons.lock_outlined),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      isDense: true,
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _confirmPasswordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Confirm New Password',
                      prefixIcon: const Icon(Icons.lock_outlined),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      isDense: true,
                    ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _changePassword,
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1a237e), foregroundColor: Colors.white),
                      child: const Text('Update Password'),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          _buildSectionHeader('Preferences'),
          const SizedBox(height: 8),
          Card(
            child: Column(
              children: [
                SwitchListTile(
                  title: const Text('Dark Mode'),
                  subtitle: const Text('Toggle dark theme'),
                  secondary: Icon(themeService.isDark ? Icons.dark_mode : Icons.light_mode, color: const Color(0xFF1a237e)),
                  value: themeService.isDark,
                  onChanged: (_) => themeService.toggleTheme(),
                  activeColor: const Color(0xFF1a237e),
                ),
                const Divider(height: 1),
                SwitchListTile(
                  title: const Text('Push Notifications'),
                  subtitle: const Text('Receive alerts and updates'),
                  secondary: const Icon(Icons.notifications_active, color: Color(0xFF00bcd4)),
                  value: _notificationsEnabled,
                  onChanged: (v) => setState(() => _notificationsEnabled = v),
                  activeColor: const Color(0xFF00bcd4),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

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

  Widget _buildSectionHeader(String title) {
    return Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold, color: const Color(0xFF1a237e)));
  }

  Widget _buildInfoTile(IconData icon, String label, String value, {required bool editMode, TextEditingController? controller}) {
    return ListTile(
      leading: Icon(icon, color: const Color(0xFF1a237e)),
      title: Text(label, style: TextStyle(fontSize: 12, color: Colors.grey[600])),
      subtitle: editMode && controller != null
          ? TextField(
              controller: controller,
              decoration: InputDecoration(
                border: InputBorder.none,
                isDense: true,
                contentPadding: EdgeInsets.zero,
              ),
            )
          : Text(value, style: const TextStyle(fontWeight: FontWeight.w500)),
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
