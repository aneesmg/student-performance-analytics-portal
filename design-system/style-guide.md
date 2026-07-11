# SPAP Design System

## Overview
The Student Performance Analytics Portal (SPAP) design system provides a consistent visual language across the application. It includes reusable components, design tokens, and guidelines for developers.

## Design Tokens

### Colors
| Token | Light | Dark |
|-------|-------|------|
| `--primary` | #1a237e | #818cf8 |
| `--primary-light` | #534bae | #a5b4fc |
| `--primary-dark` | #0d1b3e | #4f46e5 |
| `--secondary` | #00bcd4 | #22d3ee |
| `--accent` | #ff6f00 | #fb923c |
| `--success` | #2e7d32 | #4ade80 |
| `--warning` | #f9a825 | #facc15 |
| `--danger` | #c62828 | #f87171 |
| `--bg` | #f0f2f5 | #0f172a |
| `--card-bg` | #ffffff | #1e293b |
| `--text-primary` | #1a1a2e | #e2e8f0 |
| `--text-secondary` | #6b7280 | #94a3b8 |
| `--border` | #e5e7eb | #334155 |

### Typography
- Font family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Base: 16px, 1.6 line-height
- Headings: 26px (h1), 20px (h2), 16px (h3)

### Spacing
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

## Components

### 1. Buttons
- `.btn` - Base button class
- `.btn-primary` - Primary action (#1a237e background)
- `.btn-secondary` - Secondary action (#00bcd4)
- `.btn-accent` - Accent action (#ff6f00)
- `.btn-outline` - Outlined style
- `.btn-danger` - Destructive action
- `.btn-sm` - Small variant
- Supports icon + text layout with `gap: 8px`

### 2. Cards
- `.card` - White container with shadow and 10px radius
- `.card-header` - Flex header with title and actions
- `.card-badge` - Count/label badge
- `.stat-card` - Dashboard stat card with icon
- `.course-card` - Course display card

### 3. Tables
- `.data-table` - Full-width table with styled headers
- Sortable columns with sort indicators
- Alternate row hover state
- `.cell-primary`, `.cell-code`, `.cell-muted` variants
- Grade badges: `.grade-badge`, `.grade-a` through `.grade-f`

### 4. Forms
- `.form-group` - Label + input wrapper
- `.input-wrapper` - Icon + input container with border
- `.filter-select-sm`, `.filter-select-md` - Select dropdowns
- `.grade-input` - Compact number input
- `.search-input-wrapper` - Search field with icon

### 5. Navigation
- `.sidebar` - Fixed left sidebar with gradient background
- `.sidebar-link` - Nav item with hover/active states
- `.sidebar-user` - User profile section
- `.sidebar-mobile-toggle` - Mobile hamburger menu

### 6. Status Indicators
- `.status-dot` - Colored circle (green=active, gray=inactive)
- `.role-badge.role-student` - Green background
- `.role-badge.role-teacher` - Blue background
- `.role-badge.role-admin` - Purple background

### 7. Charts & Progress
- `.progress-bar-sm` - Thin progress bar
- `.monthly-chart` - Bar chart container
- `.month-bar` - Individual chart bar
- `.metric-bar-track` - System metric bar
- `.grade-bars` - Grade distribution bars

### 8. Alerts & Notifications
- `.alert` - Alert container with left border color
- Type variants: success (green), error (red), warning (yellow), info (blue)
- `.notifications-header-bar` - Notification list header
- `.notification-item` - Individual notification row
- Unread indicator dot

### 9. Icons
30+ SVG icons in `components/Icons.js` following Feather icon style:
- Navigation: Dashboard, Users, User, BookOpen, Graduation
- Actions: Plus, Edit, Trash, Search, Filter, Sort, Download
- Status: CheckCircle, AlertCircle, TrendingUp, Clock
- UI: Menu, X, ChevronLeft, ChevronDown, Bell, Moon, Sun

### 10. Theme Support
- Light mode: Default (`:root` CSS variables)
- Dark mode: `[data-theme="dark"]` attribute override
- Toggle via `.theme-toggle-btn` in Settings

## Layout
- Dashboard: Sidebar (260px) + Main content area
- Max content width: 1200px (`.container`)
- Responsive breakpoints: 1024px, 768px, 640px
- Mobile: Sidebar becomes overlay with hamburger toggle

## Accessibility
- Focus-visible outlines on interactive elements
- Semantic HTML structure
- High contrast mode compatible
- Keyboard navigable sidebar

## Usage
Import global CSS in `index.js`:
```js
import './styles/global.css';
```

Use components from `components/` directory:
```js
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/Button';
```
