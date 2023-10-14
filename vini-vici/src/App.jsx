import { useState } from 'react'
import Discover from './components/Discover.jsx';
import BanList from './components/BanList.jsx';

function App() {
  const ACCESS_KEY = import.meta.env.CAT_APP_ACCESS_KEY;
  const [bannedAttributes, setBannedAttributes] = useState([]);

  return (
    <div className="container">
      <h1>Veni-Vici Discover cute cats!</h1>
    <div className="wrapper">
        <div className="discover">
            <Discover bannedAttributes={bannedAttributes} setBannedAttributes={setBannedAttributes} />
        </div>
        <div className="ban">
            <BanList bannedAttributes={bannedAttributes} />
        </div>
    </div>
</div>
  )
}

export default App
