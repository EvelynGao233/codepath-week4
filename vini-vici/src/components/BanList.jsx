import React from 'react';
import '../components/BanList.css'

function BanList({ bannedAttributes }) {
  return (
    <> <h2>BanList</h2>
    <ul>
      {bannedAttributes.map(attr => (
        <li key={attr}>{attr}</li>
      ))}
    </ul>
    </>

  );
}

export default BanList;