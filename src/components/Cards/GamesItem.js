import React, {useState, useRef, useEffect, createRef, useReducer} from 'react'
import Sounds from '../../shared/Sounds/Sounds';
import classes from './GamesItem.module.css'
import gamesList from './../data/GamesData.json'

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Keyboard } from "swiper";
// import 'swiper/css';



console.table(gamesList);
// const games = gamesList;
 

function selectDisk(state, action) {
  console.log('state : ', state)
  console.log('action : ', action)

}

function Item(props) {
  const [games,setGames] = useState([]);
  const [firstLoad,setFirstLoad] = useState(false);
  const [itemActive, setItemActive] = useState('');
  const [imageloaded, setImageLoaded] = useState('');
  const [imageindex, setImageIndex] = useState(0);
  const [item, setItem] = useState(games[1]);
  const [audioFinished, setAudioFinished] = useState(true);
  const arrLength = gamesList.length;
  const element = useRef();

  const [state, dispatch] = useReducer(selectDisk);


  async function setGamesList() {
    setGames(gamesList);
  }
  useEffect(() => {
    setTimeout(async () => {
       await setGamesList();
       const el = element.current.querySelectorAll('.'+classes.ps_games_item_container)[0];
       el.click();

    }, 1000);
 
  }, []);

  const divImg = {
    backgroundImage: `url(${itemActive.image})`,
  };

  const imageChanger = (item,index) => {
    // setImage(item.background);
    // const imageLoader = new Image();
    // imageLoader.src = item.background;
    props.getGameItem(games[index]);
    // imageLoader.onload = () => {

      setImageLoaded(true);
      setItem(item);
      setImageIndex(index);
      props.getImageIndex(index);
      playGameSound(games[index].song);
    // };

  }
  const ItemClicked = (event,item,index) => {
    if(document.querySelector('.selectedActiveItem')) {    
      const activeItem = document.querySelector('.selectedActiveItem');
      activeItem.classList.remove(classes.active,'selectedActiveItem');
      setItemActive('');
      event.currentTarget.classList.remove(classes.active);  
    }
    if(firstLoad == true) {
      playSound('audio-navigation');
    } else {
      setFirstLoad(true);
    }
    setItemActive('selectedActiveItem');
    event.currentTarget.classList.add(classes.active,'selectedActiveItem');
    imageChanger(item,index);
    moveSlide(index);
  }
  const ItemLeave = (event,item) => {
    if(imageloaded) {
      setItemActive('');
      event.currentTarget.classList.remove(classes.active);
      // props.getImage('');
    }
  }
  const playSound = (id) => {
    const audioNavigation = document.getElementById(id);
    audioNavigation.volume = 1;
    audioNavigation.currentTime = 0;
    audioNavigation.play()
    // audio.onloadeddata = function() {
    //   audio.currentTime = 0;
    //   audio.play()
    // };
  }
  const fadeAudioOut = (audio,song) => {
    const fadeAudioOut = setInterval(() => {
      if (audio.volume !== 0) {
        audio.volume -= 0.01;
      }
      if (audio.volume < 0.1 && audio.volume > 0.01) {
        clearInterval(fadeAudioOut);
        setAudioFinished(true);
        if(song == "") {
          audio.src = "";
        }
      }
    }, 10);
  }
  const fadeAudioIn = (audio) => {
    audio.volume = 0;
    setAudioFinished(false);
    const fadeAudioIn = setInterval(() => {
      audio.volume += 0.1;
      if (audio.volume >= 0.6) {
        clearInterval(fadeAudioIn);
      }
    }, 200);
  }
  const playGameSound = async (song) => {
    const audio = document.getElementById('audio-game');
    if (song != "") {
      if (!audioFinished) {
        fadeAudioOut(audio,song)
      }
      setTimeout(() => {
        audio.src = song;
        audio.currentTime = 0;
        audio.load();
        audio.play();
        audio.volume = 1;
        fadeAudioIn(audio);
      }, 712);
    } 
    else {
      console.log("fade")
      fadeAudioOut(audio,song);
    }
  }
  document.onkeydown = checkKey;
  
  const moveSlide = (index) => {
    element.current.style.transform = `translateX(${-107 * (index === 0 ? 0 : index - 1)}px)`;
  }
  const moveRight = () => {
    const activeItem = document.querySelector('.selectedActiveItem') || 0;
    playSound('audio-navigation');
    if(activeItem.nextSibling != null) {    
      activeItem.classList.remove(classes.active,'selectedActiveItem');
      activeItem.nextSibling.classList.add(classes.active,'selectedActiveItem');
      // imageChanger(item,imageindex + 1);
      // element.current.style.transform = `translateX(${-107 * (imageindex + 1)}px)`;
      return imageindex + 1
    }
    else if(activeItem === 0){
      document.querySelectorAll('.game_item')[0].classList.add(classes.active,'selectedActiveItem');
      // imageChanger(item,imageindex);
    }
  }
  const moveLeft = () => {
    const activeItem = document.querySelector('.selectedActiveItem') || 0;
    // element.current.style.transform = `translateX(${-107 * (imageindex === 0 ? 0 : imageindex - 1)}px)`;

    playSound('audio-navigation');
    if(activeItem.previousSibling != null) {    
      activeItem.classList.remove(classes.active,'selectedActiveItem');
      activeItem.previousSibling.classList.add(classes.active,'selectedActiveItem');
      // imageChanger(item,imageindex - 1);
      return imageindex - 1;
    }
    else if(activeItem === 0){
      document.querySelectorAll('.game_item')[0].classList.add(classes.active,'selectedActiveItem');
      imageChanger(item,imageindex);
    }
  }

  const moveDown = () => {
    const activeItem     = document.querySelector('.selectedActiveItem');
    const currentSection = activeItem.closest('.ps_section');
    let nextSection = currentSection.nextSibling;
    let nextSelectable = nextSection.querySelector('.selectable') || 0;

    let loop = true;
    while(nextSection && loop) {
      if(nextSection.classList.contains('ps_section')) {
        loop = false;
      }
      else {
        nextSection = nextSection.nextSibling;
        nextSelectable = nextSection.querySelector('.selectable');
      }
    }
    playSound('audio-navigation');
    if(activeItem != null) {    
      activeItem.classList.remove(classes.active,'selectedActiveItem');
      nextSelectable.classList.add(classes.active,'selectedActiveItem');
      window.scrollTo({
        top: nextSection.offsetTop ,
        left: 0,
        behavior: 'smooth'
      });
      // imageChanger(item,imageindex + 1);
      // element.current.style.transform = `translateX(${-107 * (imageindex + 1)}px)`;
      // return imageindex + 1
    }
   

  }

  const moveUp = () => {
    const activeItem     = document.querySelector('.selectedActiveItem');
    const currentSection = activeItem.closest('.ps_section');
    let prevSection = currentSection.previousSibling;
    let prevSelectable = prevSection.querySelector('.selectable') || 0;

    let loop = true;
    while(prevSection && loop) {
      if(prevSection.classList.contains('ps_section')) {
        loop = false;
      }
      else {
        prevSection = prevSection.previousSibling;
        prevSelectable = prevSection.querySelector('.selectable');
      }
    }
    playSound('audio-navigation');
    if(activeItem != null) {    
      activeItem.classList.remove(classes.active,'selectedActiveItem');
      prevSelectable.classList.add(classes.active,'selectedActiveItem');
      window.scrollTo({
        top: prevSection.offsetTop ,
        left: 0,
        behavior: 'smooth'
      });
      // imageChanger(item,imageindex + 1);
      // element.current.style.transform = `translateX(${-107 * (imageindex + 1)}px)`;
      // return imageindex + 1
    }
   

  }

  function checkKey(e) {
  
      e = e || window.event;
  
      if (e.keyCode === 38) {
          // up arrow
          console.log('up');
          e.preventDefault();
          moveUp();
      }
      else if (e.keyCode === 40) {
          // down arrow
          console.log('down');
          e.preventDefault();
          moveDown();
      }
      else if (e.keyCode === 37) {
         // left arrow
         console.log('left');
        moveLeft();
      }
      else if (e.keyCode === 39) {
         // right arrow
         console.log('right');
          moveRight();

      }
  
  }

  return (

   <div className={`${classes.ps_games_row} ps_section`}>
      <div ref={element} className={classes.ps_games_container}>
        {
          games.map((item,index) => (
            
              <div
                    style={{ "--animation-order": (games.length - index) }}
                    onClick={(e) => ItemClicked(e,item,index)}
                    // onClick={(e) => dispatch({event:e,item:item,index:index})}
                    className={`${classes.ps_games_item_container  } game_item selectable` }
                    key={item.id}>
                <span className={classes.ps_games_item_border}></span>
                <div className={classes.ps_games_item + ' '+ classes.show} >
                  <div className={classes.ps_games_item_image + ' shine_effect'}>
                    {item.image && <img loading="lazy" width={item.id == 1 ? '60%' : '100%'} height={item.id == 1 ? '60%' : '100%'} src={item.image} alt={item.name} /> }
                  </div>
                </div>
                <div className={classes.ps_games_item_name}>
                  { item.generation && <span className={classes.ps_games_item_gen}>
                    {item.generation}
                  </span>
                  }
                  {item.name}
                </div>
              </div>
             
            
          ))
        }
      </div>
   </div>
  )
}

export default Item