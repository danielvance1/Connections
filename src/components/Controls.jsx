import classes from "./Controls.module.css"

import Submit from "./Submit"

function Controls(props){
    return <div className={classes.controls}>
        <Submit submitHandler={props.submitHandler}/>
    </div>
}

export default Controls