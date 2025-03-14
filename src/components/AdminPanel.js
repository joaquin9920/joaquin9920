import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function AdminPanel() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const querySnap = await getDocs(collection(db, "ads"));
      setAds(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAds();
  }, []);

  const handleDelete = async (adId) => {
    await deleteDoc(doc(db, "ads", adId));
    setAds(ads.filter(ad => ad.id !== adId));
  };

  return (
    <div className="container">
      <h2>Panel de Administración</h2>
      {ads.map(ad => (
        <div key={ad.id}>
          <strong>{ad.title}</strong>
          <button onClick={() => handleDelete(ad.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
