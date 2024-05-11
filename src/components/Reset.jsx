import classes from "./Reset.module.css"

function Reset(props){
    return <div className={classes.reset} onClick={props.resetHandler}>Deselect</div>
}

export default Reset