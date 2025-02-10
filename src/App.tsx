import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PermissionRequestApp } from './components/Permission/PermissionRequestApp';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AdminComponent } from './components/Admin/AdminComponent';
import { RequestProvider } from './context/RequestContext';
import { 
  HelpContent, 
  UserJourney, 
  UserGuide, 
  AdminGuide 
} from './components/Help';

function App() {
  return (
    <RequestProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<PermissionRequestApp />} />
            <Route path="/help" element={<HelpContent />} />
            <Route path="/help/journey" element={<UserJourney />} />
            <Route path="/help/user-guide" element={<UserGuide />} />
            <Route path="/help/admin-guide" element={<AdminGuide />} />
            <Route path="/admin" element={<AdminComponent />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </RequestProvider>
  );
}

export default App;