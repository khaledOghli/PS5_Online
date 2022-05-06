import React from 'react'
import './Trophies.css'

const Trophies = () => {
  return (
    <div>
        <div className="trophies_container">
            <div className="trophies_header">
                <div className="trophies_header_progress">
                    <span> Progress </span>
                    <h3> 62% </h3>
                </div>
                <div className="trophies_header_earned">
                    <span> Earned </span>
                    <h3>34/50</h3>
                </div>
            </div>
            <div className="trophies_body">
                <div className="trophies_body_gold">
                    <img src="./images/gold_trophy.png" />
                    <span>
                        1
                    </span>
                </div>
                <div className="trophies_body_silver">
                    <img src="./images/silver_trophy.png" />
                    <span>
                        6
                    </span>
                </div>
                <div className="trophies_body_bronze">
                    <img src="./images/bronze_trophy.png" />
                    <span>
                        12
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Trophies