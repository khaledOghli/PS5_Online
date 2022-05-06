import React from 'react'
import GamesData from '../data/GamesData.json';
import './ComingSoon.css';

function MustSee() {
  return (
    <div className="ps_section">
      <h3>Coming Soon</h3>
      <div className="comingSoon_container" >
      {
        GamesData[0].mustSee.map((game, index) => {
          return (
            
                <div tabIndex={index} className="comingSoon_item shine_effect selectable" key={index}>
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
}

export default MustSee