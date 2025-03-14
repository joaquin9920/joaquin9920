import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdList from './components/AdList';
import AdDetail from './components/AdDetail';
import AdForm from './components/AdForm';
import AdminPanel from './components/AdminPanel';
import WeatherWidget from './components/WeatherWidget';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>ConectAzuero</h1>
        <WeatherWidget />
        <Routes>
          <Route path="/" element={<AdList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ad/:id" element={<AdDetail />} />
          <Route path="/new-ad" element={<AdForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
