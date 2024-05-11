import classes from "./Controls.module.css"

import Submit from "./Submit"
import Reset from "./Reset"
import Lives from "./Lives"

function Controls(props){
    return <div className={classes.controls}>
        <Submit submitHandler={props.submitHandler}/>
        <Reset resetHandler={props.resetHandler}/>
        <Lives lifeJustLost={props.lifeJustLost} numLives={props.numLives}/>
    </div>
}

export default Controls