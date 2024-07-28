import classes from "./Board.module.css"

import Cell from "./Cell"
import Controls from "./Controls"
import Completed from "./Completed"

import { useState } from "react"

const DUMMY_DATA = [
    {
        category: "Mario Kart items",
        words: ["banana", "mushroom", "turtle", "lightning"]
    },
    {
        category: "End of MLP names",
        words: ["jack", "dash", "shy", "pike"]
    },
    {
        category: "Spinning things",
        words: ["galaxy", "wheel", "whirlpool", "top"]
    },
    {
        category: "_ board",
        words: ["diving", "chess", "spring", "white"]
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
    const [numLives, setNumLives] = useState(4)
    const [lifeJustLost, setLifeJustLost] = useState(false)

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
        if(numSelected < 4 || numLives === 0) return

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
            setLifeJustLost(true)

            setTimeout(() => {
                // Reset warnings
                let normalBoard = JSON.parse(JSON.stringify(board));
                for (let i = 0; i < normalBoard.length; i++) {
                    normalBoard[i].warning = false;
                }
                

                if(numLives===1){
                    let newCompleted = JSON.parse(JSON.stringify(completed));

                    while(normalBoard.length > 0){
                        newCompleted.push({
                            category: normalBoard[0].category,
                            words: [],
                            successful: false
                        })

                        for(let i = normalBoard.length-1; i>=0; i--){
                            if(normalBoard[i].category === normalBoard[0].category){
                                newCompleted[newCompleted.length-1].words.push(normalBoard[i].word)
                                normalBoard.splice(i, 1)
                            }
                        }
                    }

                    setCompleted(newCompleted)
                }

                setBoard(normalBoard);
                setLifeJustLost(false)
            }, 300);

            setNumLives(numLives-1)
            return
        }

        let newCompleted = JSON.parse(JSON.stringify(completed));
        newCompleted.push({
            category: category,
            words: [],
            successful: true
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

    function resetHandler(){
        let newBoard = JSON.parse(JSON.stringify(board));

        for(let i = 0; i < newBoard.length; i++){
            newBoard[i].selected = false;
        }

        setBoard(newBoard)
        setNumSelected(0)
    }

    return <>
        <div className={classes.board}>
            {completed.map((item, idx) => 
                <Completed key={idx} words={item.words} category={item.category} successful={item.successful}/>
            )}
            {board.map((item, idx) => 
                <Cell key={idx} switchCell={() => switchCell(idx)} word={item.word} warning={item.warning} selected={item.selected}/>
            )}
        </div>
        <Controls numLives={numLives} lifeJustLost={lifeJustLost} submitHandler={submitHandler} resetHandler={resetHandler}/>
    </>
}

export default Board