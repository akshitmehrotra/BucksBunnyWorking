import React, { useState, useEffect } from 'react';
import './App.css';
import data from './levels.json';

const BLOCK_SIZE = 150;
const PLAYER_SIZE = 50;
const JUMP_HEIGHT = 150;
const GRAVITY = 2;

function App() {  
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [level, setLevel] = useState(1);
  
  const [blocks, setBlocks] = useState([
    { x: 200, y: 200, hit: false, isCorrect: false, option:'a' },
    { x: 500, y: 200, hit: false, isCorrect: false, option:'b' },
    { x: 800, y: 200, hit: false, isCorrect: false, option:'c' },
    { x: 1100, y: 200, hit: false, isCorrect: false, option:'d' }
  ]);
  const [jumping, setJumping] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      setPlayerPos((prevPos) => ({ ...prevPos, x: prevPos.x - 10 }));
    } else if (e.key === 'ArrowRight') {
      setPlayerPos((prevPos) => ({ ...prevPos, x: prevPos.x + 10 }));
    } else if (e.key === 'ArrowUp' && !jumping) {
      jump();
    }
  };

  const jump = () => {
    setJumping(true);
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
      if (jumpCount >= JUMP_HEIGHT) {
        clearInterval(jumpInterval);
        fall();
      } else {
        setPlayerPos((prevPos) => ({ ...prevPos, y: prevPos.y +  5 }));
        jumpCount += 5;
      }
    }, 10);
  };

  const fall = () => {
    let fallCount = 0;
    const fallInterval = setInterval(() => {
      if (fallCount >= JUMP_HEIGHT) {
        clearInterval(fallInterval);
        setPlayerPos((prevPos) => ({ ...prevPos, y: 0 }));
        setJumping(false);
      } else {
        setPlayerPos((prevPos) => ({ ...prevPos, y: prevPos.y + GRAVITY }));
        fallCount += GRAVITY;
      }
    }, 10);
  };

  const handleBlockCollision = (index) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[index].hit = true;
      if(updatedBlocks[index].isCorrect){
        
        console.log("correct");
      }
      return updatedBlocks;
    });
  };

  useEffect(() => {
    const handleBlockCollisions = () => {
      blocks.forEach((block, index) => {
        if (
          playerPos.x + PLAYER_SIZE > block.x &&
          playerPos.x < block.x + BLOCK_SIZE &&
          playerPos.y + PLAYER_SIZE > block.y &&
          playerPos.y < block.y + BLOCK_SIZE &&
          !block.hit
        ) {
          handleBlockCollision(index);
        }
      });
    };

    handleBlockCollisions();

    // Add event listener for key presses
    window.addEventListener('keydown', handleKeyPress);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPos, blocks]);


  useEffect(()=>{
    const correctIndex = data[level].Correct;
    const options = data[level].options;
    console.log(correctIndex);

    const updatedBlocks = blocks.map((block, index) => ({
      ...block,
      isCorrect: index === correctIndex ? true : block.isCorrect,
      option: options[index],
    }));
    setBlocks(updatedBlocks);

    // data[level].options.map(e=>{
    //   console.log(e);
      
    // })
  },[level])
  
  
  return (
    <div className="App">
      <div className="game-container">
        <div
          className="player"
          style={{
            left: `${playerPos.x}px`,
            bottom: `${playerPos.y}px`,
          }}
        />
        <div className="main__container">
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`block ${block.hit ? `${block.isCorrect ? 'hit__correct':'hit__wrong'}` : ''}`}
            style={{    
              left: `${block.x}px`,
              bottom: `${block.y}px`,
            }}
          >
            {block.option}
          </div>
        ))}</div>
      </div>
    </div>
  );
}

export default App;
