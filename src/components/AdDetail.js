import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function AdDetail() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      const docRef = doc(db, "ads", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAd({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchAd();
  }, [id]);

  if (!ad) {
    return <div>Cargando anuncio...</div>;
  }

  return (
    <div className="container">
      <h2>{ad.title}</h2>
      {ad.imageUrl && <img src={ad.imageUrl} alt={ad.title} style={{maxWidth:'400px'}} />}
      <p>{ad.description}</p>
      <p><strong>Ubicación:</strong> {ad.location}</p>
      <p><Link to="/">← Volver a la lista de anuncios</Link></p>
    </div>
  );
}

export default AdDetail;
