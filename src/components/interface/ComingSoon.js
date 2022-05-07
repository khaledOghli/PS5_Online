import React, {useState, useRef, useEffect} from 'react'
import GamesData from '../data/GamesData.json';
import classes from './ComingSoon.module.css';

function MustSee(props) {
  const [games,setGames] = useState([]);
  const [firstLoad,setFirstLoad] = useState(false);
  const [itemActive, setItemActive] = useState('');
  const [imageloaded, setImageLoaded] = useState('');
  const [imageindex, setImageIndex] = useState(0);
  const [item, setItem] = useState(games[0]);
  const element2 = useRef();

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(true);
    }, 3800);
  },[])
  const ItemClicked = (event,item,index) => {
    props.getComingSoon(true);
    if(document.querySelector('.selectedActiveItem')) {    
      const activeItem = document.querySelector('.selectedActiveItem');
      activeItem.classList.remove('selectedActiveItem');
      event.currentTarget.classList.remove('selectedActiveItem');  
      setItemActive('');
    }
      playSound('audio-navigation');
      setFirstLoad(true);
    setItemActive('selectedActiveItem');
    event.currentTarget.classList.add('selectedActiveItem');
    imageChanger(item,index);
    moveSlide(index);
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
  const imageChanger = (item,index) => {
    // setImage(item.background);
    // const imageLoader = new Image();
    // imageLoader.src = item.background;
      props.getGameItem(item);
    // imageLoader.onload = () => {

      setImageLoaded(true);
      setItem(item);
      setImageIndex(index);
      props.getImage(item.background);
      props.getImageIndex(index);
    // };

  }
  const moveSlide = (index) => {
    element2.current.style.transform = `translateX(${-107 * (index === 0 ? 0 : index - 1)}px)`;
  }
  if (props.isPsStore) {
    return (
      firstLoad && <div className="ps_section">
        <h3>Coming Soon</h3>
        <div ref={element2} className={`${classes.comingSoon_container}`} >
        {
          props.isPsStore && GamesData[0].mustSee.map((game, index) => {
            return (
              <div 
                style={{ "--comingsoon-order": (games.length + index) }}
                onClick={(e) => ItemClicked(e,game,index)} tabIndex={index} 
                className={`${classes.comingSoon_item} shine_effect selectable`}
                key={index}>
                {/* <img loading="lazy" className="comingSoon_img" src={game.image} alt="game" /> */}
                <figure data-bg={`${game.image}?$800px$`} className="media-block__figure" aria-labelledby="fig-caption-">
                      <picture className="media-block__img lozad lazy-loaded" data-alt="Hogwarts Legacy" data-loaded="true">
                          <source srcSet={`${game.image}?$1200px$`} media="(min-width: 768px)" />
                          <source srcSet={`${game.image}?$800px$`} media="(min-width: 320px)" />
                          <noscript>
                            <img src={`${game.image}?$native$`} alt="Hogwarts Legacy"/>
                          </noscript>
                          <img alt="Hogwarts Legacy" />
                      </picture>
                      <figcaption>
                        <span>
                          Platform
                        </span>
                        <h4>
                          Name
                        </h4>
                      </figcaption>
                </figure>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  } else {
    return ('')
  }
}
export default MustSee