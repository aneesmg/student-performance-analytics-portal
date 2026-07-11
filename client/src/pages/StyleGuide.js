import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  UsersIcon, UserIcon, BookOpenIcon, GraduationIcon, GradeIcon, AttendanceIcon,
  SettingsIcon, LogoutIcon, SearchIcon, FilterIcon, PlusIcon, EditIcon, TrashIcon,
  CheckCircleIcon, AlertCircleIcon, TrendingUpIcon, BookIcon, ClockIcon, MenuIcon,
  XIcon, SchoolIcon, BarChartIcon, PieChartIcon, DownloadIcon, ChevronDownIcon,
  MailIcon, LockIcon, EyeIcon, EyeOffIcon, ChevronLeftIcon, DashboardIcon, SortIcon,
  LoginIcon, BellIcon, MoonIcon, SunIcon, PaletteIcon, NotificationIcon
} from '../components/Icons';
import './StyleGuide.css';

const SectionTitle = ({ children }) => <h2 className="sg-section-title">{children}</h2>;
const SubTitle = ({ children }) => <h3 className="sg-subtitle">{children}</h3>;

const colors = [
  { name: '--primary', value: '#1a237e' },
  { name: '--primary-light', value: '#534bae' },
  { name: '--primary-dark', value: '#0d1b3e' },
  { name: '--secondary', value: '#00bcd4' },
  { name: '--accent', value: '#ff6f00' },
  { name: '--success', value: '#2e7d32' },
  { name: '--warning', value: '#f9a825' },
  { name: '--danger', value: '#c62828' },
];

const neutralColors = [
  { name: '--bg', value: '#f0f2f5' },
  { name: '--card-bg', value: '#ffffff' },
  { name: '--text-primary', value: '#1a1a2e' },
  { name: '--text-secondary', value: '#6b7280' },
  { name: '--text-light', value: '#9e9e9e' },
  { name: '--border', value: '#e5e7eb' },
];

const sgIcons = [
  { name: 'DashboardIcon', icon: DashboardIcon },
  { name: 'UsersIcon', icon: UsersIcon },
  { name: 'UserIcon', icon: UserIcon },
  { name: 'BookOpenIcon', icon: BookOpenIcon },
  { name: 'GraduationIcon', icon: GraduationIcon },
  { name: 'GradeIcon', icon: GradeIcon },
  { name: 'AttendanceIcon', icon: AttendanceIcon },
  { name: 'SettingsIcon', icon: SettingsIcon },
  { name: 'LogoutIcon', icon: LogoutIcon },
  { name: 'SearchIcon', icon: SearchIcon },
  { name: 'FilterIcon', icon: FilterIcon },
  { name: 'SortIcon', icon: SortIcon },
  { name: 'PlusIcon', icon: PlusIcon },
  { name: 'EditIcon', icon: EditIcon },
  { name: 'TrashIcon', icon: TrashIcon },
  { name: 'CheckCircleIcon', icon: CheckCircleIcon },
  { name: 'AlertCircleIcon', icon: AlertCircleIcon },
  { name: 'TrendingUpIcon', icon: TrendingUpIcon },
  { name: 'BookIcon', icon: BookIcon },
  { name: 'ClockIcon', icon: ClockIcon },
  { name: 'MenuIcon', icon: MenuIcon },
  { name: 'XIcon', icon: XIcon },
  { name: 'SchoolIcon', icon: SchoolIcon },
  { name: 'BarChartIcon', icon: BarChartIcon },
  { name: 'PieChartIcon', icon: PieChartIcon },
  { name: 'DownloadIcon', icon: DownloadIcon },
  { name: 'ChevronDownIcon', icon: ChevronDownIcon },
  { name: 'ChevronLeftIcon', icon: ChevronLeftIcon },
  { name: 'MailIcon', icon: MailIcon },
  { name: 'LockIcon', icon: LockIcon },
  { name: 'EyeIcon', icon: EyeIcon },
  { name: 'EyeOffIcon', icon: EyeOffIcon },
  { name: 'LoginIcon', icon: LoginIcon },
  { name: 'BellIcon', icon: BellIcon },
  { name: 'MoonIcon', icon: MoonIcon },
  { name: 'SunIcon', icon: SunIcon },
  { name: 'PaletteIcon', icon: PaletteIcon },
  { name: 'NotificationIcon', icon: NotificationIcon },
];

const StyleGuide = () => {
  return (
    <DashboardLayout title="Design System" subtitle="Style guide for developers">
      <div className="style-guide">

        <div className="sg-section">
          <SectionTitle>Colors</SectionTitle>
          <SubTitle>Brand Colors</SubTitle>
          <div className="sg-color-grid">
            {colors.map(c => (
              <div key={c.name} className="sg-color-card">
                <div className="sg-color-swatch" style={{ background: c.value }} />
                <span className="sg-color-name">{c.name}</span>
                <span className="sg-color-value">{c.value}</span>
              </div>
            ))}
          </div>
          <SubTitle>Neutral Colors</SubTitle>
          <div className="sg-color-grid">
            {neutralColors.map(c => (
              <div key={c.name} className="sg-color-card">
                <div className="sg-color-swatch" style={{ background: c.value }} />
                <span className="sg-color-name">{c.name}</span>
                <span className="sg-color-value">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sg-section">
          <SectionTitle>Typography</SectionTitle>
          <div className="sg-typography">
            <div className="sg-type-row"><span className="sg-type-label">h1</span><span className="sg-type-sample h1">The quick brown fox</span></div>
            <div className="sg-type-row"><span className="sg-type-label">h2</span><span className="sg-type-sample h2">The quick brown fox</span></div>
            <div className="sg-type-row"><span className="sg-type-label">h3</span><span className="sg-type-sample h3">The quick brown fox</span></div>
            <div className="sg-type-row"><span className="sg-type-label">body</span><span className="sg-type-sample body">The quick brown fox jumps over the lazy dog.</span></div>
            <div className="sg-type-row"><span className="sg-type-label">small</span><span className="sg-type-sample small">The quick brown fox jumps over the lazy dog.</span></div>
          </div>
        </div>

        <div className="sg-section">
          <SectionTitle>Spacing</SectionTitle>
          <div className="sg-spacing-grid">
            {[4, 8, 12, 16, 20, 24, 32, 40, 48].map(p => (
              <div key={p} className="sg-spacing-row">
                <span className="sg-spacing-label">{p}px</span>
                <div className="sg-spacing-bar" style={{ width: p }} />
              </div>
            ))}
          </div>
        </div>

        <div className="sg-section">
          <SectionTitle>Buttons</SectionTitle>
          <SubTitle>Variants</SubTitle>
          <div className="sg-button-row">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-danger">Danger</button>
          </div>
          <SubTitle>Sizes</SubTitle>
          <div className="sg-button-row">
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary">Default</button>
            <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 16 }}>Large</button>
          </div>
          <SubTitle>With Icons</SubTitle>
          <div className="sg-button-row">
            <button className="btn btn-primary"><PlusIcon size={16} /> Add New</button>
            <button className="btn btn-outline"><EditIcon size={16} /> Edit</button>
            <button className="btn btn-danger"><TrashIcon size={16} /> Delete</button>
            <button className="btn btn-secondary"><DownloadIcon size={16} /> Download</button>
          </div>
        </div>

        <div className="sg-section">
          <SectionTitle>Cards</SectionTitle>
          <div className="sg-card-row">
            <div className="card sg-demo-card">
              <h3>Default Card</h3>
              <p>Basic card with shadow and padding.</p>
            </div>
            <div className="card sg-demo-card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h3>Highlight Card</h3>
              <p>Card with left accent border.</p>
            </div>
          </div>
        </div>

        <div className="sg-section">
          <SectionTitle>Form Elements</SectionTitle>
          <SubTitle>Inputs</SubTitle>
          <div className="sg-form-grid">
            <div className="form-group">
              <label>Text Input</label>
              <input type="text" placeholder="Enter text..." className="sg-input" />
            </div>
            <div className="form-group">
              <label>Email Input</label>
              <input type="email" placeholder="email@example.com" className="sg-input" />
            </div>
            <div className="form-group">
              <label>Select</label>
              <select className="sg-select">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div className="form-group">
              <label>Textarea</label>
              <textarea className="sg-textarea" rows={3} placeholder="Write something..." />
            </div>
          </div>
        </div>

        <div className="sg-section">
          <SectionTitle>Tables</SectionTitle>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cell-primary">Ayesha Khan</td>
                  <td>ayesha@example.com</td>
                  <td><span className="role-badge role-student">Student</span></td>
                  <td><span className="status-indicator active"><span className="status-dot active" />Active</span></td>
                </tr>
                <tr>
                  <td className="cell-primary">Bilal Ahmed</td>
                  <td>bilal@example.com</td>
                  <td><span className="role-badge role-teacher">Teacher</span></td>
                  <td><span className="status-indicator active"><span className="status-dot active" />Active</span></td>
                </tr>
                <tr>
                  <td className="cell-primary">Sana Malik</td>
                  <td>sana@example.com</td>
                  <td><span className="role-badge role-admin">Admin</span></td>
                  <td><span className="status-indicator inactive"><span className="status-dot inactive" />Inactive</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="sg-section">
          <SectionTitle>Alerts</SectionTitle>
          <div className="sg-alert-list">
            <div className="sg-alert success">
              <CheckCircleIcon size={18} />
              <span>Success alert! Operation completed.</span>
            </div>
            <div className="sg-alert error">
              <AlertCircleIcon size={18} />
              <span>Error alert! Something went wrong.</span>
            </div>
            <div className="sg-alert warning">
              <AlertCircleIcon size={18} />
              <span>Warning alert! Please check your input.</span>
            </div>
            <div className="sg-alert info">
              <BellIcon size={18} />
              <span>Info alert! New update available.</span>
            </div>
          </div>
        </div>

        <div className="sg-section">
          <SectionTitle>Icons</SectionTitle>
          <div className="sg-icon-grid">
            {sgIcons.map(({ name, icon: Icon }) => (
              <div key={name} className="sg-icon-item">
                <Icon size={22} />
                <span className="sg-icon-name">{name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default StyleGuide;
