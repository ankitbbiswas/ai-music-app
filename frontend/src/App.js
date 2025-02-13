import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [music, setMusic] = useState(null);

  const generateMusic = () => {
    // Mocking a music response since there's no backend yet
    setMusic("🎶 AI-generated music preview...");
  };

  return (
    <div>
      <h1>AI Music App 🎵</h1>
      <input
        type="text"
        placeholder="Enter a prompt for AI music..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={generateMusic}>Generate Music</button>
      {music && <p>{music}</p>}
    </div>
  );
}

export default App;
