import classes from "./Board.module.css"

import Cell from "./Cell"
import Controls from "./Controls"
import Completed from "./Completed"

import { useState } from "react"

const DUMMY_DATA = [
    {
        category: "Animals",
        words: ["frog", "tiger", "dog", "snake"]
    },
    {
        category: "Food",
        words: ["pizza", "corndog", "watermelon", "jello"]
    },
    {
        category: "Chess Pieces",
        words: ["king", "queen", "knight", "bishop"]
    },
    {
        category: "Furniture",
        words: ["chair", "table", "dresser", "desk"]
    }
]

function Board(){
    //make the board data with the following:
    // -word data
    // -selected/not selected
    let transformedData = []
    for (let i = 0; i < DUMMY_DATA.length; i++) {
        for(let j = 0; j < DUMMY_DATA[i].words.length; j++){
            transformedData.push({
                category: DUMMY_DATA[i].category,
                word: DUMMY_DATA[i].words[j],
                selected: false,
                warning: false,
                solve: false
            });
        }
    }

    //randomize the words
    for (let i = transformedData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate random index
        [transformedData[i], transformedData[j]] = [transformedData[j], transformedData[i]]; // Swap elements
    }

    const [board, setBoard] = useState(transformedData)
    const [numSelected, setNumSelected] = useState(0)
    const [completed, setCompleted] = useState([])

    function switchCell(idx){
        let newBoard = JSON.parse(JSON.stringify(board));

        if(newBoard[idx].selected){
            newBoard[idx].selected = false;
            setNumSelected(numSelected-1);
        }
        else if(numSelected != 4){
            newBoard[idx].selected = true;
            setNumSelected(numSelected+1);
        }
        
        setBoard(newBoard);
    }

    function submitHandler(){
        if(numSelected < 4) return

        let category = ""
        let bad = false
        for(let i = 0; i < board.length; i++){
            if(!board[i].selected) continue
            if(category === "" || category === board[i].category){
                category = board[i].category
            }
            else {
                bad = true
            }
        }

        if(bad){
            let warningBoard = JSON.parse(JSON.stringify(board));
            for(let i = 0; i < warningBoard.length; i++){
                if(warningBoard[i].selected){
                    warningBoard[i].warning = true
                }
            }
            setBoard(warningBoard)

            setTimeout(() => {
                // Reset warnings
                let normalBoard = JSON.parse(JSON.stringify(board));
                for (let i = 0; i < normalBoard.length; i++) {
                    normalBoard[i].warning = false;
                }
                setBoard(normalBoard);
            }, 300);

            return
        }

        let newCompleted = JSON.parse(JSON.stringify(completed));
        newCompleted.push({
            category: category,
            words: []
        })

        let newBoard = []

        for (let i = 0; i < board.length; i++) {
            if(!board[i].selected) {
                newBoard.push(board[i])
                continue
            }

            newCompleted[newCompleted.length-1].words.push(board[i].word);
        }

        setCompleted(newCompleted)
        setBoard(newBoard)
        setNumSelected(0)
    }

    return <>
        <div className={classes.board}>
            {completed.map((item, idx) => 
                <Completed key={idx} words={item.words} category={item.category}/>
            )}
            {board.map((item, idx) => 
                <Cell key={idx} switchCell={() => switchCell(idx)} word={item.word} warning={item.warning} selected={item.selected}/>
            )}
        </div>
        <Controls submitHandler={submitHandler}/>
    </>
}

export default Board