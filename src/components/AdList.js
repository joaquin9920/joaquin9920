import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';

function AdList() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "ads"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAds(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <h2>Anuncios Recientes</h2>
      {ads.map(ad => (
        <div key={ad.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{ad.title}</h3>
          <p>{ad.description.substring(0, 100)}...</p>
          {ad.imageUrl && <img src={ad.imageUrl} alt={ad.title} style={{maxWidth:'200px'}} />}
          <p><Link to={`/ad/${ad.id}`}>Ver detalles</Link></p>
        </div>
      ))}
    </div>
  );
}

export default AdList;
