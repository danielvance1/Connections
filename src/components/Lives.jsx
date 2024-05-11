import classes from "./Lives.module.css"

import { FaHeart } from "react-icons/fa";

function Lives(props){
    return <div className={props.lifeJustLost ? classes.livesDamage : classes.lives}>
        {props.numLives}&nbsp;<FaHeart style={{ color: 'red' }}/>
    </div>
}

export default Lives