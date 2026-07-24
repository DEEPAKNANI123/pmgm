import React from 'react';
import { Card } from '../components/Card';
import { mockData } from '../mockData';
import { Users, AlertTriangle, TrendingUp, Mic } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function Overview() {
  const { summaryStats, contractWorkerRisk } = mockData;

  const chartData = contractWorkerRisk.map(cw => ({
    name: cw.name,
    Reliability: cw.reliability_score,
    Risk: cw.attrition_risk
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1>Dashboard Overview</h1>
        <p>High-level metrics across performance, risk, and employee sentiment.</p>
      </header>

      <div className="grid-layout">
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Attendance</p>
              <h2 style={{ fontSize: '2.5rem', margin: '8px 0', color: 'var(--success)' }}>{summaryStats.avgAttendance}%</h2>
            </div>
            <div style={{ padding: '12px', background: 'var(--success-bg)', borderRadius: '12px', color: 'var(--success)' }}>
              <Users size={24} />
            </div>
          </div>
        </Card>
        
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>High Risk Workers</p>
              <h2 style={{ fontSize: '2.5rem', margin: '8px 0', color: 'var(--danger)' }}>{summaryStats.highRiskWorkers}</h2>
            </div>
            <div style={{ padding: '12px', background: 'var(--danger-bg)', borderRadius: '12px', color: 'var(--danger)' }}>
              <AlertTriangle size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active PIPs</p>
              <h2 style={{ fontSize: '2.5rem', margin: '8px 0', color: 'var(--warning)' }}>{summaryStats.activePIPs}</h2>
            </div>
            <div style={{ padding: '12px', background: 'var(--warning-bg)', borderRadius: '12px', color: 'var(--warning)' }}>
              <TrendingUp size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Output</p>
              <h2 style={{ fontSize: '2.5rem', margin: '8px 0', color: 'var(--accent-primary)' }}>{summaryStats.avgOutput}%</h2>
            </div>
            <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
              <TrendingUp size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <Card title="Contract Worker Reliability vs Risk">
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
                <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="Reliability" fill="var(--success)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Risk" fill="var(--danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Voice Reviews">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockData.voiceReviews.map(vr => (
              <div key={vr.id} style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', height: 'fit-content' }}>
                  <Mic size={18} color="var(--accent-primary)" />
                </div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>{vr.employee_id}</h4>
                  <p style={{ fontSize: '0.85rem', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    "{vr.transcript}"
                  </p>
                  <span className={`badge ${vr.sentiment === 'Positive' ? 'success' : 'warning'}`}>
                    {vr.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
