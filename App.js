import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Login from './components/Login';
import AdList from './components/AdList';
import AdDetail from './components/AdDetail';
import AdForm from './components/AdForm';
import AdminPanel from './components/AdminPanel';
import WeatherWidget from './components/WeatherWidget';

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingAuth) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header>
          <h1>ConectAzuero</h1>
          <nav>
            {user ? (
              <>
                <button onClick={() => signOut(auth)}>Cerrar sesión</button>
              </>
            ) : (
              <a href="/login">Iniciar sesión</a>
            )}
          </nav>
        </header>
        <WeatherWidget />
        <Routes>
          <Route path="/" element={<AdList user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ad/:id" element={<AdDetail user={user} />} />
          <Route path="/new-ad" element={user ? <AdForm user={user} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user ? <AdminPanel user={user} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
