import React, {useEffect,useState} from 'react'
import gamesList from './../data/GamesData.json'
import classes from './GameInfo.module.css'
import {FiMoreHorizontal} from 'react-icons/fi'
import Trophies from '../Trophies/Trophies';

const games = gamesList;

function GameInfo(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 3300);
    },[])
  return (
    isLoaded && <div className={`${props.getGameInfo.description ? classes.gameInfo_container + ' ps_section' : classes.gameInfo_container } `}>
      <div key={props.getGameInfo.logo} className={`${classes.animate +' '+ classes.flex_50}`}>
        <div className={classes.game_info}>
          {
              props.getGameInfo.logo && <img key={props.getGameInfo.logo} className={`${props.getGameInfo.logo ? classes.game_logo :'' }`} src={props.getGameInfo.logo} />
          }
        </div>

       { props.getGameInfo.description && 
        <div className={classes.gameInfo_details}>
            <p>
              {
                props.getGameInfo.description
              }
            </p>
            <div className={classes.more_info_buttons}>
              <button className={`play_btn shine_effect selectable`}>
                Play Game
              </button>
              <div>
                <button className={`more_btn shine_effect selectable`}>
                  <FiMoreHorizontal />
                </button>
              </div>
            </div>
        </div>
        }

      </div>
       {
       props.getGameInfo.trophy && 
       <Trophies key={props.getGameInfo.id} getGameTrophy={props.getGameInfo} /> 
       }
    </div>
    
  )
}

export default GameInfo