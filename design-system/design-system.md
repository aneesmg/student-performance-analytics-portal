# SPAP Design System

## Overview
The Student Performance Analytics Portal design system provides a consistent, reusable set of UI components and design patterns.

---

## 1. Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#1a237e` | Headers, primary buttons, links |
| `--primary-light` | `#534bae` | Hover states |
| `--primary-dark` | `#000051` | Navbar, footer |
| `--secondary` | `#00bcd4` | Accents, highlights |
| `--accent` | `#ff6f00` | Call-to-action buttons |
| `--success` | `#2e7d32` | Positive metrics |
| `--warning` | `#f9a825` | Medium alerts |
| `--danger` | `#c62828` | Errors, low performance |
| `--bg` | `#f5f7fa` | Page background |
| `--card-bg` | `#ffffff` | Card backgrounds |
| `--text-primary` | `#212121` | Body text |
| `--text-secondary` | `#616161` | Subtext |
| `--text-light` | `#9e9e9e` | Placeholder text |

### Typography
- **Font**: Inter (sans-serif)
- **Headings**: 700-800 weight
- **Body**: 400 weight
- **Monospace**: For IDs and codes

### Spacing
- Base unit: 4px
- Container max-width: 1200px
- Card padding: 24px
- Section padding: 80px

---

## 2. Component Library

### Buttons
```css
.btn-primary     /* Solid primary background */
.btn-secondary   /* Solid secondary background */
.btn-accent      /* Solid accent background */
.btn-outline     /* Border-only primary */
.btn-danger      /* Solid danger background */
.btn-sm          /* Small size variant */
```

### Cards
```css
.card            /* White background, shadow, rounded corners */
```

### Form Elements
```css
.form-group      /* Label + input wrapper */
.form-row        /* Two-column grid for paired inputs */
.form-select     /* Styled select dropdown */
input[type="text"], input[type="email"], input[type="password"]
```

### Grade Badges
```css
.grade-badge     /* Inline grade indicator */
.grade-a         /* Green - A grade */
.grade-b         /* Blue - B grade */
.grade-c         /* Orange - C grade */
.grade-d         /* Red - D grade */
.grade-f         /* Dark red - F grade */
```

### Performance Card (Reusable)
- Compact variant (inline with avatar)
- Detailed variant (full info with progress bars)
- Color-coded score indicators

---

## 3. Screen Designs

### Login Screen
- Centered card layout
- Email + password inputs
- Remember me checkbox
- Forgot password link
- Registration CTA

### Registration Screen
- Full name, email, password, confirm password
- Role selector (Student, Teacher, Admin)
- Terms acceptance checkbox

### Dashboard Screen
- Stats cards grid (4 columns)
- Grade distribution bar chart
- Recent performance table
- Responsive: 2-column grid on mobile

### Profile Screen
- Avatar + personal info card
- Stats grid (avg score, attendance, grade, records)
- Performance records table
- Back navigation

### Student Search Screen
- Search bar with icon
- Course filter dropdown
- Sortable table columns (click to sort)
- Row-level actions (View profile)

---

## 4. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|---------------|
| Desktop | >768px | Full multi-column grids |
| Tablet/Mobile | ≤768px | Single column, stacked layout, hidden sidebar content, hamburger menu |

---

## 5. Animation Patterns

| Animation | Duration | Trigger |
|-----------|----------|---------|
| `slideUp` | 0.5s | Cards, page sections |
| `fadeInRow` | 0.3s | Table rows on load |
| `dropDown` | 0.2s | User menu dropdown |
| `pageFadeIn` | 0.4s | Page transitions |
| `spin` | 0.6-0.8s | Loading spinners |
| `hover: translateY(-2px)` | 0.3s | Card hover |
| `transform: translateX(-4px)` | 0.3s | Back button hover |

---

## 6. Accessibility
- Focus-visible outlines on all interactive elements
- Semantic HTML structure
- Adequate color contrast ratios
- Responsive text sizing
- ARIA labels where needed

---

## 7. File Structure
```
client/src/
  context/        # AuthContext (user state management)
  components/     # Navbar, Footer, PrivateRoute, PerformanceCard
  pages/          # Home, About, Dashboard, Reports, Contact,
                  # Login, Register, ForgotPassword, ResetPassword,
                  # Profile, StudentSearch
  services/       # API client with axios interceptors
  styles/         # Global CSS with design tokens
```
