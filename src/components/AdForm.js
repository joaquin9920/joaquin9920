import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function AdForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "ads"), { title, description, location });
      setSuccess(true);
      setTitle('');
      setDescription('');
      setLocation('');
    } catch (err) {
      console.error("Error al publicar anuncio:", err);
    }
  };

  return (
    <div className="container">
      <h2>Publicar Nuevo Anuncio</h2>
      {success && <p style={{color: 'green'}}>✅ Anuncio publicado con éxito.</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="text" placeholder="Ubicación" value={location} onChange={e => setLocation(e.target.value)} />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default AdForm;
