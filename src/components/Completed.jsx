import classes from "./Completed.module.css"

function Completed(props){
    return <div className={classes.completed}>
        {props.words[0]}, {props.words[1]}, {props.words[2]}, {props.words[3]}
    </div>
}

export default Completed