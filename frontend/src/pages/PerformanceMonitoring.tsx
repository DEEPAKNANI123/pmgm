
import { Card } from '../components/Card';
import { mockData } from '../mockData';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function PerformanceMonitoring() {
  const { performanceMetrics } = mockData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1>Performance Monitoring</h1>
        <p>Daily performance monitor tracking attendance, output, and quality. Automatically detects declines.</p>
      </header>

      <Card title="Employee Performance Roster">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 500 }}>Employee</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 500 }}>Attendance</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 500 }}>Output Score</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 500 }}>Rejection Rate</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {performanceMetrics.map(emp => (
                <tr key={emp.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{emp.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{emp.id}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ color: emp.attendance_percentage < 85 ? 'var(--danger)' : 'var(--success)' }}>
                      {emp.attendance_percentage}%
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ color: emp.output_score < 80 ? 'var(--warning)' : 'inherit' }}>
                      {emp.output_score}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ color: emp.rejection_rate > 10 ? 'var(--danger)' : 'inherit' }}>
                      {emp.rejection_rate}%
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {emp.declineDetected ? (
                      <span className="badge danger" style={{ display: 'flex', gap: '4px' }}>
                        <AlertCircle size={14} /> Decline Detected
                      </span>
                    ) : (
                      <span className="badge success" style={{ display: 'flex', gap: '4px' }}>
                        <CheckCircle2 size={14} /> Healthy
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {performanceMetrics.filter(e => e.declineDetected).map(emp => (
        <Card key={`pip-${emp.id}`} title={`Performance Improvement Plan (PIP): ${emp.name}`}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h4 style={{ color: 'var(--danger)', marginBottom: '8px' }}>AI Analysis Root Cause</h4>
              <p style={{ marginBottom: '16px' }}>{emp.rootCause}</p>
              
              <h4 style={{ marginBottom: '8px' }}>Recommended Actions</h4>
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)' }}>
                {emp.recommendedActions?.map((act, i) => <li key={i}>{act}</li>)}
              </ul>
            </div>
            
            <div style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Generated 30-Day PIP</h4>
              <p style={{ marginBottom: '16px', fontSize: '0.9rem' }}><strong>Goal:</strong> {emp.pip?.goal}</p>
              
              <h5 style={{ marginBottom: '8px', fontSize: '0.85rem' }}>Weekly Targets</h5>
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                {emp.pip?.weekly_targets.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              
              <button className="btn btn-primary" style={{ width: '100%' }}>Create Darwinbox Task</button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
