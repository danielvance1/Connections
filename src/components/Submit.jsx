import classes from "./Submit.module.css"

function Submit(props){
    return <div className={classes.submit} onClick={props.submitHandler}>
        Submit
    </div>
}

export default Submit;