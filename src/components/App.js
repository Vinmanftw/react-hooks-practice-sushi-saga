import React,{useEffect, useState} from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [allSushi, setAllSushi] = useState([])
  const [start, setStart] = useState(0)
  const [wallet, setWallet] = useState(100)
  const [newMoney, setNewMoney] = useState(0)

  useEffect(() => {
    fetch(API)
    .then((resp) => resp.json())
    .then(data => 
      setAllSushi(data) 
    )
  }, [])// [] makes it renders once

  const displaySushi = allSushi.slice(start,start + 4)

  const forwardSushi = () => {
    if (start>= allSushi.length -4){
    setStart(0)
    }else{
    setStart(start + 4)
    }
  }
  const eatSushi = (clickSushi) =>{
    //X pass up sushi being eaten
    //X make copy of allSushi array (use arrow function)
    //X find individual sushi in that copy of the array
    //X give that sushi a key of 'eaten' and set that to true
    if(wallet >= clickSushi.price && !clickSushi.eaten){
    const newSushi = [...allSushi]
    const sushiToUpdate = newSushi.find(sushi => sushi.id === clickSushi.id)
    sushiToUpdate.eaten = true
    setAllSushi(newSushi)
    setWallet(wallet-clickSushi.price)
    }else if(wallet < clickSushi.price){
      alert("you can not afford this sushi!")
    }

  }

  const plates = allSushi.filter(sushi => sushi.eaten)

  const handleAddMoney = (e) => {
    e.preventDefault()
    setWallet(wallet + newMoney)
    setNewMoney(0)
  }
  return (
    <div className="app">
      <SushiContainer  allSushi={displaySushi} forwardSushi={forwardSushi} eatSushi={eatSushi} />
      <Table plates={plates} wallet={wallet}/>
      <h1>Add money</h1>
      <form onSubmit={handleAddMoney}>
        <label>$</label>
        <input type=" number" value={newMoney} onChange={(e)=>setNewMoney(parseInt(e.target.value))}/>
        <input type="submit" value="add money"/>
      </form>
    </div>
  );
}

export default App;
