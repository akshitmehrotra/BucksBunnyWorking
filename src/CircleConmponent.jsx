import React from 'react';

const CircleComponent = (props ) => {
  const circles = [];
  
  for (let i = 0; i < props.totalLength; i++) {
    const isDoubleSize = i === props.circleInFocus;
    const circleSize = isDoubleSize ? 40 : 20; // You can adjust the sizes
    
    circles.push(
      <div
        key={i}
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: '50%',
          backgroundColor: 'white', // You can change the color
          margin: '5px',
        }}
      ></div>
    );
  }

  return <div style={{ display: 'flex',justifyContent: "center",  alignItems: "center" }}>{circles}</div>;
};

export default CircleComponent;
