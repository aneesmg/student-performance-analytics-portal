import 'dart:convert';
import 'package:http/http.dart' as http;
import 'auth_service.dart';

class ApiService {
  static const String _baseUrl = 'http://10.0.2.2:5000/api';

  static Future<Map<String, String>> _headers(AuthService auth) async {
    return {
      'Content-Type': 'application/json',
      'x-auth-token': auth.token ?? '',
    };
  }

  static Future<List<dynamic>> getStudents(AuthService auth, {String? search, String? course}) async {
    final queryParams = <String, String>{};
    if (search != null) queryParams['search'] = search;
    if (course != null && course.isNotEmpty) queryParams['course'] = course;

    final uri = Uri.parse('$_baseUrl/students').replace(queryParameters: queryParams.isNotEmpty ? queryParams : null);
    final response = await http.get(uri, headers: await _headers(auth));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['students'] ?? [];
    }
    throw Exception('Failed to load students');
  }

  static Future<Map<String, dynamic>> getStudentById(AuthService auth, String id) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/students/$id'),
      headers: await _headers(auth),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception('Student not found');
  }

  static Future<List<dynamic>> getPerformance(AuthService auth, String studentId) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/performance/$studentId'),
      headers: await _headers(auth),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data is List ? data : [];
    }
    throw Exception('Failed to load performance');
  }

  static Future<Map<String, dynamic>> getStats(AuthService auth) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/performance/stats'),
      headers: await _headers(auth),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception('Failed to load stats');
  }
}
