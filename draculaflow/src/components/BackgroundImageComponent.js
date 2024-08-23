import React from 'react';

function BackgroundImageComponent() {
  const backgroundImageStyle = {
    backgroundImage: `url('background.jpg')`,
    backgroundSize: 'cover', // Adjusts the image to cover the entire container
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    height: '100vh', // Sets height to full viewport height
    width: '100%', // Sets width to full container width
  };

  return (
    <div style={backgroundImageStyle}>
      {/* Your content here */}
      <h1>Hello, World!</h1>
    </div>
  );
}

export default BackgroundImageComponent;