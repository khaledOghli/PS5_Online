import React, {Fragment,useState} from 'react'
import navigation_audio from './../../media/sounds/PS5/Navigation.mp3'

function Sounds(props) {
 
  return (
    <Fragment>
      <audio id="audio-navigation">
          <source id="src_mp3" type="audio/mp3" src={navigation_audio}/>
          <source id="src_ogg" type="audio/ogg" src=""/>
          <object id="audio_object" type="audio/x-mpeg" width="200px" height="45px" data={navigation_audio}>
              <param id="param_src" name="src" value={navigation_audio} />
              <param id="param_src" name="src" value={navigation_audio} />
              <param name="autoplay" value="false" />
              <param name="autostart" value="false" />
          </object>
      </audio>    
      <audio id="audio-game" loop>
          <source id="src_mp3" type="audio/mp3" src={props.gameAudio}/>
          <source id="src_ogg" type="audio/ogg" src=""/>
          <object id="audio_object" type="audio/x-mpeg" width="200px" height="45px" data={props.gameAudio}>
              <param id="param_src" name="src" value={props.gameAudio} />
              <param id="param_src" name="src" value={props.gameAudio} />
              <param name="autoplay" value="false" />
              <param name="autostart" value="false" />
          </object>
      </audio>   
    </Fragment>
  )
}

export default Sounds