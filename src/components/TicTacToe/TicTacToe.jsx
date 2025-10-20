import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle1.png';
import cross_icon from '../Assets/cross.png';

// Initialize the board array outside the component to avoid resetting on re-renders
let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  const boxRefs = useRef([]);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return 0;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src=${cross_icon} class='icon' />`;
      data[num] = "x";
      setCount(count + 1);
    } else {
      e.target.innerHTML = `<img src=${circle_icon} class='icon' />`;
      data[num] = "o";
      setCount(count + 1);
    }
    checkWin();
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon} class='icon-small'/> Wins!`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon} class='icon-small'/> Wins!`;
    }
  };

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (count === 8) { // Check for a draw
        titleRef.current.innerHTML = "It's a Draw!";
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    titleRef.current.innerHTML = 'Tic-Tac-Toe game in <span>React</span>';
    boxRefs.current.forEach((box) => {
        if (box) {
            box.innerHTML = "";
        }
    });
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic-Tac-Toe game in <span>React</span></h1>
      <div className="grid-container">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            ref={el => boxRefs.current[i] = el}
            className="box"
            onClick={(e) => toggle(e, i)}
          >
          </div>
        ))}
      </div>
      <div className="button">
        <button className='Reset' onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default TicTacToe;