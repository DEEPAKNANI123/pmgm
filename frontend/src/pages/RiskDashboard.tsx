import React from 'react';
import { Card } from '../components/Card';
import { mockData } from '../mockData';
import { ShieldAlert, Info } from 'lucide-react';

export function RiskDashboard() {
  const { contractWorkerRisk } = mockData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1>Contract Worker Risk Scoring</h1>
        <p>Dashboard for contract workers highlighting attrition risks and reliability scores.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {contractWorkerRisk.map(worker => (
          <Card key={worker.id} style={{ borderTop: worker.attrition_risk > 30 ? '4px solid var(--danger)' : '4px solid var(--success)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0 }}>{worker.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{worker.id}</span>
              </div>
              {worker.attrition_risk > 30 ? (
                <span className="badge danger"><ShieldAlert size={14} style={{ marginRight: '4px' }} /> High Risk</span>
              ) : (
                <span className="badge success">Low Risk</span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div style={{ flex: 1, background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: worker.reliability_score > 80 ? 'var(--success)' : 'var(--warning)' }}>
                  {worker.reliability_score.toFixed(1)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reliability Score</div>
              </div>
              <div style={{ flex: 1, background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: worker.attrition_risk > 30 ? 'var(--danger)' : 'var(--success)' }}>
                  {worker.attrition_risk.toFixed(1)}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attrition Risk</div>
              </div>
            </div>

            <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <strong style={{ color: 'var(--text-secondary)' }}>Risk Summary:</strong>
                <p style={{ margin: '4px 0 0 0' }}>{worker.risk_summary}</p>
              </div>
              <div>
                <strong style={{ color: 'var(--text-secondary)' }}>Probable Cause:</strong>
                <p style={{ margin: '4px 0 0 0' }}>{worker.attrition_cause}</p>
              </div>
              <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  <Info size={16} /> Recommended Action
                </div>
                <p style={{ margin: 0 }}>{worker.recommended_action}</p>
              </div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
               <button className="btn btn-primary" style={{ width: '100%' }}>Intervention Workflow</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
