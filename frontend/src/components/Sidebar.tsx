
import { LayoutDashboard, Activity, AlertTriangle, Mic } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'performance', label: 'Performance Monitoring', icon: <Activity size={20} /> },
    { id: 'risk', label: 'Risk Dashboard', icon: <AlertTriangle size={20} /> },
    { id: 'voice', label: 'Voice Reviews', icon: <Mic size={20} /> },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{ padding: '0 12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 'bold'
        }}>
          P
        </div>
        <h2 style={{ margin: 0, fontSize: '1.25rem', letterSpacing: '1px' }}>PMGM</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: 'var(--radius-md)',
              border: 'none', cursor: 'pointer',
              background: activeTab === item.id ? 'var(--accent-glow)' : 'transparent',
              color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              transition: 'var(--transition)',
              textAlign: 'left',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              fontWeight: activeTab === item.id ? 600 : 500,
            }}
            onMouseOver={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
