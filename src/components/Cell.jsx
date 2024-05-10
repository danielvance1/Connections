import classes from "./Cell.module.css"

function Cell(props){
    let cellClass = props.selected ? classes.selected : classes.notSelected
    if(props.warning) cellClass = classes.warning
    //else if(props.solved) cellClass = classes.solved

    return <div onClick={props.switchCell} className={cellClass}>
        {props.word}
    </div>
}

export default Cell