import React from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi"

function SushiContainer({allSushi, forwardSushi, eatSushi}) {
  
  const displaySushi = allSushi.map(sushi => <Sushi key={sushi.id} sushi={sushi} eatSushi={eatSushi} />);

  return (
    <div className="belt" >
      {/* Render Sushi components here! */}
      {displaySushi}
      
      <MoreButton moreSushi={forwardSushi}/>
    </div>
  );
}

export default SushiContainer;
