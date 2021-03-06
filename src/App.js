import { useState, Fragment } from 'react'
import './App.css'
import Header from './components/interface/Header'
import Background from './components/interface/screens/Background'
import GamesItem from './components/Cards/GamesItem'
import GameInfo from './components/interface/GameInfo'
import ComingSoon from './components/interface/ComingSoon'
import Sounds from './shared/Sounds/Sounds';
import Loader from './components/interface/screens/Loader';
function App() {
  const [imageSrc, setimageSrc] = useState('');
  const [imageIndex, setimageIndex] = useState(false);
  const [gameAudio, setGameAudio] = useState('');
  const [gameItem, setgameItem] = useState('');
  const [loader, setloader] = useState(true);

     
  return (
    <Fragment>
      <Sounds gameSound={gameAudio}/>
      {
      // loader ? <Loader getstate={loader} getLoaderState={setloader} /> : 
        <>
          <Background imageindex={imageIndex} imagesrc={imageSrc}></Background>
          <Header />
          <GamesItem getGameItem={setgameItem} getGameAudio={setGameAudio} getImageIndex={setimageIndex} getImage={setimageSrc} />
          <GameInfo getGameInfo={gameItem} />
          <ComingSoon />
          
        </>
  
      }
      
    </Fragment>
  )
}

export default App
