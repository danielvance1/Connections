import classes from "./Completed.module.css"

function Completed(props){
    return <div className={props.successful ? classes.completed : classes.unsuccessful}>
        <div className={classes.completedCategory}>
            {props.category}
        </div>
        <div className={classes.completedWords}>
            {props.words[0]}, {props.words[1]}, {props.words[2]}, {props.words[3]}
        </div>
    </div>
}

export default Completed