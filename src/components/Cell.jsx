import classes from "./Cell.module.css"

function Cell(props){
    return <div onClick={props.switchCell} className={props.selected ? classes.selected : classes.notSelected}>
        {props.word}
    </div>
}

export default Cell