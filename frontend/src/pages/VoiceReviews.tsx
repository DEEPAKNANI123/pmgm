
import { Card } from '../components/Card';
import { mockData } from '../mockData';
import { Mic, ThumbsUp, ThumbsDown, UserCheck } from 'lucide-react';

export function VoiceReviews() {
  const { voiceReviews } = mockData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1>WhatsApp Voice Reviews</h1>
        <p>AI-processed voice reviews capturing sentiment, strengths, and areas of improvement.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {voiceReviews.map(review => (
          <Card key={review.id}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: '0 0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <Mic size={24} color="var(--accent-primary)" />
                </div>
                <span className={`badge ${review.sentiment === 'Positive' ? 'success' : 'warning'}`}>
                  {review.sentiment}
                </span>
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0 }}>Employee: {review.employee_id}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lang: {review.language}</span>
                </div>
                
                <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', marginBottom: '16px', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                  "{review.transcript}"
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--success)' }}>
                      <ThumbsUp size={16} /> Strengths
                    </h4>
                    <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)' }}>
                      {review.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--warning)' }}>
                      <ThumbsDown size={16} /> Areas for Improvement
                    </h4>
                    {review.improvements.length > 0 ? (
                      <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)' }}>
                        {review.improvements.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    ) : (
                      <p style={{ color: 'var(--text-muted)', margin: 0 }}>None identified.</p>
                    )}
                  </div>

                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-primary)' }}>
                      <UserCheck size={16} /> Competencies
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {review.competencies.map((c, i) => (
                        <span key={i} className={`badge ${c.rating === 'High' ? 'success' : c.rating === 'Low' ? 'danger' : 'accent'}`}>
                          {c.name}: {c.rating}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
