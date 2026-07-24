import { useState } from 'react';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { PerformanceMonitoring } from './pages/PerformanceMonitoring';
import { RiskDashboard } from './pages/RiskDashboard';
import { VoiceReviews } from './pages/VoiceReviews';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'performance':
        return <PerformanceMonitoring />;
      case 'risk':
        return <RiskDashboard />;
      case 'voice':
        return <VoiceReviews />;
      default:
        return <Overview />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
