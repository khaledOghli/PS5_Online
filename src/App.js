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
  const [isComingSoon, setisComingSoon] = useState(false);
  const [isPsStoreSelected, setisPsStoreSelected] = useState(false);

  return (
    <Fragment>
      <Sounds gameSound={gameAudio}/>
      {
      loader ? <Loader getstate={loader} getLoaderState={setloader} /> : 
        <>
          <Background comingSoonSelected={isComingSoon}  imageindex={imageIndex} imagesrc={imageSrc}></Background>
          <Header />
          <GamesItem getPsStore={setisPsStoreSelected} getComingSoon={setisComingSoon}  getGameItem={setgameItem} getGameAudio={setGameAudio} getImageIndex={setimageIndex} getImage={setimageSrc} />
          <GameInfo getGameInfo={gameItem} />
          <ComingSoon getComingSoon={setisComingSoon} isPsStore={isPsStoreSelected} getGameItem={setgameItem} getImageIndex={setimageIndex} getImage={setimageSrc} />
          
        </>
  
      }
      
    </Fragment>
  )
}

export default App
