import React,{useState,useEffect} from 'react'
import './Trophies.css'

const Trophies = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [trophies, setTrophies] = useState({});
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 700);
    },[])
    useEffect(() => {
        setTrophies(props.getGameTrophy);
        console.log('trophies ',props.getGameTrophy);
    },[props.getGameTrophy])
    
  return (
    isLoaded && <div key={trophies} className="animate">
        <div className="trophies_container">
            <div className="trophies_header">
                <div className="trophies_header_progress">
                    <span> Progress </span>
                    <h3> 
                        {   
                            (trophies?.trophy.all - (trophies?.trophy.platinum + trophies?.trophy.gold + trophies?.trophy.silver + trophies?.trophy.bronze) * 10 / 100).toFixed(0)
                        }%
                   
                    </h3>
                </div>
                <div className="trophies_header_earned">
                    <span> Earned </span>
                    <h3>
                    {trophies?.trophy.all}/
                    {
                       (trophies?.trophy.platinum + trophies?.trophy.gold + trophies?.trophy.silver + trophies?.trophy.bronze)
                    }
                    </h3>
                </div>
            </div>
            <div className="trophies_body">
                <div className="trophies_body_gold">
                    <img src="./images/gold_trophy.png" />
                    <span>
                        {trophies?.trophy.gold}
                    </span>
                </div>
                <div className="trophies_body_silver">
                    <img src="./images/silver_trophy.png" />
                    <span>
                        {trophies?.trophy.silver}
                    </span>
                </div>
                <div className="trophies_body_bronze">
                    <img src="./images/bronze_trophy.png" />
                    <span>
                        {trophies?.trophy.bronze}
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Trophies