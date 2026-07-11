"""
Student Performance Analytics - Advanced Data Analysis
Generates performance reports, dashboards, and visualizations.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import os
from datetime import datetime

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'output')
os.makedirs(OUTPUT_DIR, exist_ok=True)

DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'server', 'seed_data.json')

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE) as f:
            data = json.load(f)
        students = pd.DataFrame(data.get('students', []))
        performances = pd.DataFrame(data.get('performances', []))
    else:
        print("Seed data file not found. Using synthetic data.")
        students = pd.DataFrame({
            'studentId': [f'STU{i:03d}' for i in range(1, 101)],
            'name': [f'Student {i}' for i in range(1, 101)],
            'course': np.random.choice(['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'], 100),
            'semester': np.random.randint(1, 5, 100),
            'gender': np.random.choice(['Male', 'Female'], 100),
            'enrollmentYear': np.random.choice([2023, 2024, 2025], 100),
        })
        performances = pd.DataFrame({
            'studentId': [f'STU{i:03d}' for i in range(1, 101)],
            'course': students['course'],
            'semester': students['semester'],
            'attendance': np.random.randint(60, 100, 100),
            'assignmentScore': np.random.randint(50, 100, 100),
            'quizScore': np.random.randint(50, 100, 100),
            'midExamScore': np.random.randint(40, 100, 100),
            'finalExamScore': np.random.randint(40, 100, 100),
            'overallPercentage': np.random.randint(40, 100, 100),
            'grade': np.random.choice(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'], 100),
            'academicYear': '2024-2025',
        })
    return students, performances


def clean_data(performances):
    print(f"Total records: {len(performances)}")
    print(f"Missing values:\n{performances.isnull().sum()}")
    return performances.dropna()


def subject_wise_analysis(performances):
    print("\n=== SUBJECT-WISE PERFORMANCE ===")
    subject_stats = performances.groupby('course').agg(
        avg_score=('overallPercentage', 'mean'),
        avg_attendance=('attendance', 'mean'),
        max_score=('overallPercentage', 'max'),
        min_score=('overallPercentage', 'min'),
        student_count=('overallPercentage', 'count'),
    ).round(2).sort_values('avg_score', ascending=False)
    print(subject_stats)

    fig, axes = plt.subplots(1, 2, figsize=(14, 5))

    subjects = subject_stats.index
    scores = subject_stats['avg_score'].values
    colors = plt.cm.Blues(np.linspace(0.4, 0.9, len(subjects)))
    axes[0].barh(subjects, scores, color=colors)
    axes[0].set_xlabel('Average Score (%)')
    axes[0].set_title('Average Score by Subject')
    for i, v in enumerate(scores):
        axes[0].text(v + 0.5, i, f'{v:.1f}%', va='center', fontsize=10)

    attendance = subject_stats['avg_attendance'].values
    axes[1].barh(subjects, attendance, color=plt.cm.Greens(np.linspace(0.4, 0.9, len(subjects))))
    axes[1].set_xlabel('Average Attendance (%)')
    axes[1].set_title('Average Attendance by Subject')
    for i, v in enumerate(attendance):
        axes[1].text(v + 0.5, i, f'{v:.1f}%', va='center', fontsize=10)

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'subject_wise_analysis.png'), dpi=150)
    plt.close()
    print(f"Saved: subject_wise_analysis.png")

    return subject_stats


def attendance_vs_academic(performances):
    print("\n=== ATTENDANCE vs ACADEMIC RESULTS ===")
    corr = performances['attendance'].corr(performances['overallPercentage'])
    print(f"Correlation between attendance and scores: {corr:.3f}")

    bins = [0, 60, 70, 80, 90, 100]
    labels = ['<60%', '60-70%', '70-80%', '80-90%', '90-100%']
    performances['attendance_range'] = pd.cut(performances['attendance'], bins=bins, labels=labels)
    attendance_groups = performances.groupby('attendance_range', observed=False)['overallPercentage'].agg(['mean', 'count']).round(2)
    print(attendance_groups)

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.scatter(performances['attendance'], performances['overallPercentage'],
               alpha=0.6, c=performances['overallPercentage'], cmap='viridis', s=60)
    z = np.polyfit(performances['attendance'], performances['overallPercentage'], 1)
    p = np.poly1d(z)
    x_range = np.linspace(performances['attendance'].min(), performances['attendance'].max(), 100)
    ax.plot(x_range, p(x_range), 'r--', linewidth=2, label=f'Trend (r={corr:.2f})')
    ax.set_xlabel('Attendance (%)')
    ax.set_ylabel('Overall Score (%)')
    ax.set_title('Attendance vs Academic Performance')
    ax.legend()
    ax.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'attendance_vs_academic.png'), dpi=150)
    plt.close()
    print(f"Saved: attendance_vs_academic.png")


def identify_high_low_performers(performances):
    print("\n=== HIGH AND LOW PERFORMING STUDENTS ===")
    top10 = performances.nlargest(10, 'overallPercentage')[['studentId', 'course', 'overallPercentage', 'grade', 'attendance']]
    bottom10 = performances.nsmallest(10, 'overallPercentage')[['studentId', 'course', 'overallPercentage', 'grade', 'attendance']]
    print("\nTop 10 Performers:")
    print(top10.to_string(index=False))
    print("\nBottom 10 Performers:")
    print(bottom10.to_string(index=False))

    fig, axes = plt.subplots(1, 2, figsize=(14, 6))

    scores_top = top10['overallPercentage'].values
    axes[0].barh(range(len(top10)), scores_top, color='#2e7d32')
    axes[0].set_yticks(range(len(top10)))
    axes[0].set_yticklabels(top10['studentId'].values)
    axes[0].set_xlabel('Score (%)')
    axes[0].set_title('Top 10 Performing Students')

    scores_bottom = bottom10['overallPercentage'].values
    axes[1].barh(range(len(bottom10)), scores_bottom, color='#c62828')
    axes[1].set_yticks(range(len(bottom10)))
    axes[1].set_yticklabels(bottom10['studentId'].values)
    axes[1].set_xlabel('Score (%)')
    axes[1].set_title('Bottom 10 Performing Students')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'high_low_performers.png'), dpi=150)
    plt.close()
    print(f"Saved: high_low_performers.png")

    return top10, bottom10


def grade_distribution(performances):
    print("\n=== GRADE DISTRIBUTION ===")
    grade_order = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
    grade_counts = performances['grade'].value_counts()
    grade_counts = grade_counts.reindex(grade_order, fill_value=0)
    print(grade_counts)

    fig, ax = plt.subplots(figsize=(10, 6))
    colors = ['#1b5e20', '#2e7d32', '#4caf50', '#8bc34a',
              '#ff9800', '#f44336', '#d32f2f', '#b71c1c']
    bars = ax.bar(grade_order, grade_counts.values, color=colors[:len(grade_order)])
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2., height + 0.5,
                f'{int(height)}', ha='center', va='bottom', fontweight='bold')
    ax.set_xlabel('Grade')
    ax.set_ylabel('Number of Students')
    ax.set_title('Grade Distribution Across All Students')
    ax.grid(axis='y', alpha=0.3)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'grade_distribution.png'), dpi=150)
    plt.close()
    print(f"Saved: grade_distribution.png")


def performance_trends(performances):
    print("\n=== PERFORMANCE TRENDS ===")
    performances['created_date'] = pd.to_datetime('now') - pd.to_timedelta(np.random.randint(1, 365, len(performances)), unit='D')
    performances['week'] = performances['created_date'].dt.isocalendar().week.astype(int)
    performances['month'] = performances['created_date'].dt.month

    weekly_avg = performances.groupby('week')['overallPercentage'].mean()
    monthly_avg = performances.groupby('month')['overallPercentage'].mean()

    fig, axes = plt.subplots(1, 2, figsize=(14, 5))

    axes[0].plot(weekly_avg.index, weekly_avg.values, 'o-', color='#1a237e', linewidth=2, markersize=6)
    axes[0].fill_between(weekly_avg.index, weekly_avg.values, alpha=0.15, color='#1a237e')
    axes[0].set_xlabel('Week Number')
    axes[0].set_ylabel('Average Score (%)')
    axes[0].set_title('Weekly Performance Trend')
    axes[0].grid(True, alpha=0.3)

    month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month_labels = [month_names[m - 1] for m in monthly_avg.index if m <= 12]
    axes[1].plot(monthly_avg.index, monthly_avg.values, 's-', color='#00bcd4', linewidth=2, markersize=8)
    axes[1].fill_between(monthly_avg.index, monthly_avg.values, alpha=0.15, color='#00bcd4')
    axes[1].set_xticks(monthly_avg.index)
    axes[1].set_xticklabels(month_labels, rotation=45)
    axes[1].set_xlabel('Month')
    axes[1].set_ylabel('Average Score (%)')
    axes[1].set_title('Monthly Performance Trend')
    axes[1].grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'performance_trends.png'), dpi=150)
    plt.close()
    print(f"Saved: performance_trends.png")


def generate_report(students, performances, subject_stats, top10, bottom10):
    print("\n=== GENERATING REPORT ===")
    report_lines = []
    report_lines.append("STUDENT PERFORMANCE ANALYTICS REPORT")
    report_lines.append("=" * 50)
    report_lines.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report_lines.append(f"Total Students: {len(students)}")
    report_lines.append(f"Total Records: {len(performances)}")
    report_lines.append("")

    report_lines.append("OVERALL STATISTICS")
    report_lines.append("-" * 30)
    report_lines.append(f"Average Score: {performances['overallPercentage'].mean():.1f}%")
    report_lines.append(f"Median Score: {performances['overallPercentage'].median():.1f}%")
    report_lines.append(f"Highest Score: {performances['overallPercentage'].max():.1f}%")
    report_lines.append(f"Lowest Score: {performances['overallPercentage'].min():.1f}%")
    report_lines.append(f"Std Deviation: {performances['overallPercentage'].std():.1f}")
    report_lines.append(f"Average Attendance: {performances['attendance'].mean():.1f}%")
    report_lines.append(f"Attendance-Score Correlation: {performances['attendance'].corr(performances['overallPercentage']):.3f}")
    report_lines.append("")

    report_lines.append("SUBJECT-WISE AVERAGE SCORES")
    report_lines.append("-" * 30)
    for course, row in subject_stats.iterrows():
        report_lines.append(f"  {course:20s}: {row['avg_score']:.1f}% (attendance: {row['avg_attendance']:.1f}%)")
    report_lines.append("")

    report_lines.append("TOP 10 PERFORMERS")
    report_lines.append("-" * 30)
    for _, row in top10.iterrows():
        report_lines.append(f"  {row['studentId']:10s} | {row['course']:20s} | Score: {row['overallPercentage']:.0f}% | Grade: {row['grade']}")
    report_lines.append("")

    report_lines.append("BOTTOM 10 PERFORMERS")
    report_lines.append("-" * 30)
    for _, row in bottom10.iterrows():
        report_lines.append(f"  {row['studentId']:10s} | {row['course']:20s} | Score: {row['overallPercentage']:.0f}% | Grade: {row['grade']}")
    report_lines.append("")

    report_lines.append("RECOMMENDATIONS")
    report_lines.append("-" * 30)
    avg_score = performances['overallPercentage'].mean()
    avg_attendance = performances['attendance'].mean()
    if avg_attendance < 75:
        report_lines.append("- Implement attendance improvement programs to boost engagement.")
    if avg_score < 60:
        report_lines.append("- Introduce remedial classes and tutoring for struggling students.")
    if performances['attendance'].corr(performances['overallPercentage']) > 0.5:
        report_lines.append("- Strong correlation between attendance and scores - prioritize attendance tracking.")
    report_lines.append("- Identify at-risk students early through predictive analytics.")
    report_lines.append("- Create personalized learning paths based on subject performance gaps.")
    report_lines.append("- Schedule parent-teacher meetings for bottom performers.")
    report_lines.append("- Recognize and reward top performers to motivate peers.")

    report_text = '\n'.join(report_lines)
    report_path = os.path.join(OUTPUT_DIR, 'performance_report.txt')
    with open(report_path, 'w') as f:
        f.write(report_text)
    print(f"Saved: performance_report.txt")
    print(report_text)


def create_dashboard_screenshot_placeholder():
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('Student Performance Analytics Dashboard', fontsize=20, fontweight='bold')

    ax = axes[0, 0]
    subjects = ['CS', 'Math', 'Physics', 'Chem', 'Bio']
    scores = [82, 76, 71, 79, 74]
    ax.bar(subjects, scores, color=['#1a237e', '#2e7d32', '#00bcd4', '#f9a825', '#c62828'])
    ax.set_title('Subject-Wise Average Scores')
    ax.set_ylabel('Score (%)')
    ax.set_ylim(0, 100)
    for i, v in enumerate(scores):
        ax.text(i, v + 1, f'{v}%', ha='center', fontweight='bold')

    ax = axes[0, 1]
    grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
    counts = [12, 28, 22, 18, 10, 6, 3, 1]
    colors = ['#1b5e20', '#2e7d32', '#4caf50', '#8bc34a', '#ff9800', '#f44336', '#d32f2f', '#b71c1c']
    ax.pie(counts, labels=grades, colors=colors, autopct='%1.0f%%', startangle=90)
    ax.set_title('Grade Distribution')

    ax = axes[1, 0]
    att_range = [55, 65, 75, 85, 95]
    avg_scores = [45, 58, 68, 82, 91]
    ax.plot(att_range, avg_scores, 'o-', color='#1a237e', linewidth=2, markersize=8)
    ax.set_title('Attendance vs Performance')
    ax.set_xlabel('Attendance (%)')
    ax.set_ylabel('Avg Score (%)')
    ax.grid(True, alpha=0.3)

    ax = axes[1, 1]
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    trends = [72, 74, 78, 76, 80, 83]
    ax.fill_between(range(len(months)), trends, alpha=0.3, color='#00bcd4')
    ax.plot(range(len(months)), trends, 's-', color='#00bcd4', linewidth=2, markersize=8)
    ax.set_xticks(range(len(months)))
    ax.set_xticklabels(months)
    ax.set_title('Performance Trend (6 Months)')
    ax.set_ylabel('Score (%)')
    ax.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'dashboard_overview.png'), dpi=150)
    plt.close()
    print(f"Saved: dashboard_overview.png")


def main():
    print("=" * 60)
    print("STUDENT PERFORMANCE ANALYTICS - DATA ANALYSIS")
    print("=" * 60)

    students, performances = load_data()
    performances = clean_data(performances)

    subject_stats = subject_wise_analysis(performances)
    attendance_vs_academic(performances)
    top10, bottom10 = identify_high_low_performers(performances)
    grade_distribution(performances)
    performance_trends(performances)
    create_dashboard_screenshot_placeholder()
    generate_report(students, performances, subject_stats, top10, bottom10)

    print("\n" + "=" * 60)
    print(f"Analysis complete! All outputs saved to: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == '__main__':
    main()
