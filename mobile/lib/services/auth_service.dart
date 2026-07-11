import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService extends ChangeNotifier {
  String? _token;
  Map<String, dynamic>? _user;
  bool _loading = false;

  static const String _baseUrl = 'http://10.0.2.2:5000/api/auth';

  String? get token => _token;
  Map<String, dynamic>? get user => _user;
  bool get isAuthenticated => _token != null;
  bool get loading => _loading;

  AuthService() {
    _loadSavedAuth();
  }

  Future<void> _loadSavedAuth() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('token');
    final userData = prefs.getString('user');
    if (userData != null) {
      _user = jsonDecode(userData);
    }
    notifyListeners();
  }

  Future<void> _saveAuth(String token, Map<String, dynamic> user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
    await prefs.setString('user', jsonEncode(user));
    _token = token;
    _user = user;
    notifyListeners();
  }

  Future<String?> login(String email, String password) async {
    _loading = true;
    notifyListeners();

    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        await _saveAuth(data['token'], data['user']);
        _loading = false;
        notifyListeners();
        return null;
      } else {
        _loading = false;
        notifyListeners();
        final data = jsonDecode(response.body);
        return data['message'] ?? 'Login failed';
      }
    } catch (e) {
      _loading = false;
      notifyListeners();
      return 'Connection error. Please try again.';
    }
  }

  Future<String?> register(String name, String email, String password, String role) async {
    _loading = true;
    notifyListeners();

    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': name,
          'email': email,
          'password': password,
          'role': role,
        }),
      );

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        await _saveAuth(data['token'], data['user']);
        _loading = false;
        notifyListeners();
        return null;
      } else {
        _loading = false;
        notifyListeners();
        final data = jsonDecode(response.body);
        return data['message'] ?? 'Registration failed';
      }
    } catch (e) {
      _loading = false;
      notifyListeners();
      return 'Connection error. Please try again.';
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('user');
    _token = null;
    _user = null;
    notifyListeners();
  }
}
