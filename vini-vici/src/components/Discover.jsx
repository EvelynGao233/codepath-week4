import React, { useState, useEffect } from 'react';
import '../components/Discover.css'
function Discover({ bannedAttributes, setBannedAttributes }) {
  const [cat, setCat] = useState(null);

  useEffect(() => {
    fetchRandomCat();
  }, [bannedAttributes]);

  const fetchRandomCat = async () => {
    const API_KEY = 'live_mIox3ce2ebCbmrjBjgAXQxhya305J771cDQn3i20j5hjCGlpvVgChqkcvWcb5cg0';
    const breedsResponse = await fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': API_KEY
      }
    });

    const allBreeds = await breedsResponse.json();
    const allowedBreeds = allBreeds.filter(breed => !bannedAttributes.includes(breed.id));
    const randomBreed = allowedBreeds[Math.floor(Math.random() * allowedBreeds.length)];

    if (!randomBreed) {
      console.error('No allowed breeds available');
      return;
    }

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}&limit=1`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    const [data] = await response.json();

    const randomCat = {
      name: randomBreed.name,
      temperament: randomBreed.temperament,
      weight: randomBreed.weight.metric,
      origin: randomBreed.origin,
      life_span: randomBreed.life_span,
      imageUrl: data.url
    };

    setCat(randomCat);
  };

  const banAttribute = attrValue => {
    setBannedAttributes(prev => [...prev, attrValue]);
  };

  if (!cat) return <div>Loading...</div>;

  return (
    <div className='body'>
      <h1>{cat.name}</h1>
      {cat.imageUrl && <img src={cat.imageUrl} alt={cat.name} />}
      <div className="temperament" onClick={() => banAttribute(cat.temperament)}>Temperament: {cat.temperament}</div>
      <div className="weight" onClick={() => banAttribute(cat.weight)}>Weight: {cat.weight}</div>
      <div className="origin" onClick={() => banAttribute(cat.origin)}>Origin: {cat.origin}</div>
      <div className="life" onClick={() => banAttribute(cat.life_span)}>Life_span: {cat.life_span}</div>
      <button onClick={fetchRandomCat}>Discover</button>
    </div>
  );
}

export default Discover;