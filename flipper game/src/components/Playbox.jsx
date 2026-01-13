import { useEffect, useState } from "react";
import Card from "./Card";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";

const Photos = [image1, image2, image3, image4, image5, image6];
const AllPhotos = [...Photos, ...Photos].sort(() => Math.random() - 0.5);

export default function PlayBox({ setScore }) {
  const[Time,settime]=useState(0);
  const[Gameover,setgameover]=useState(false);
  useEffect(()=>{
    if(Gameover)return;
     const timer= setInterval(() => {
      settime((prev)=>prev+1);
     },1000);
     return()=>clearInterval(timer);
  },[Gameover])
   
  const [cards, setCards] = useState(
    AllPhotos.map(photo => ({
      photo,
      flipped: false,
      matched: false
    }))
  );
useEffect(()=>{
          if(cards.every((card)=>card.matched)){
            setgameover(true);
          }
        },[cards])
  const [selected, setSelected] = useState([]);

  function handleOperation(index) {
    if (cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;

      if (newCards[first].photo === newCards[second].photo) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards([...newCards]); 
        setScore(prev => prev + 1);
       
        
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards([...newCards]);
        }, 1000);
      }

      setSelected([]);
    }
    
  }
 const formatetime=seconds=>{
 let min = Math.floor(seconds/60);
 let sec = seconds%60;
 sec= sec<10?"0"+sec:sec
 
 return`${min}:${sec}`
 }

 function reset(){
  const suffledphoto=[...Photos,...Photos].short(()=>Math.random()-0.5).map(photo=>({
    photo,
    flipped:false,
    matched:false
  }));
  setCards(suffledphoto);
  setScore(0);
  settime(0)
  setSelected(0);
  setgameover(false);
 }
   return (<>
  <div className="flex items-center gap-4 mb-4">
  <div className="text-green text-2xl  font-semibold">
    Time: {formatetime(Time)}
    {Gameover && " 🎉 Game Over!"}
  </div>

  <button
    onClick={reset}
    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
  >
    🔄 Reset
  </button>
</div>

    <div className="grid h-30  bg-zinc-900  grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          photo={card.photo}
          matched={card.matched}
          flipped={card.flipped || card.matched}
          onClick={() => handleOperation(index)}
        />
      ))}
    </div>
  </>);
}

