import { useState } from "react";
import Header from "./components/Header";
import Score from "./components/Score";
import PlayBox from "./components/Playbox";

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center p-4">
    
      <Score score={score} />
      <PlayBox setScore={setScore} />
        <Header />
    </div>
  );
}

export default App;
