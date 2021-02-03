import './App.css';
import React, { useState } from 'react';

function App() {
 
function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
}
  
let data = [ "A1,B1",
             "A2,B2", 
             "A3,B3",
             "A4,B4", ]
             
             
  const FREE = "FREE"
    
function convert() {
   let workWith = []
   let temp = {  textOne: "11111",
                 textTwo: "11111",
                 //next: 9999,
                 status: FREE,
    } 
   data.forEach( (item,index) => { 
      let [a,b] = item.split(",")
       workWith.push( {...temp,
                    //  next: index,
                      textOne:a,
                      textTwo:b })
       
        
     
    })
    fisherYatesShuffle(workWith)
    return workWith
}
   
  const [cards, setCards] = useState(convert());
  const [current, setCurrent] = useState(0)
  const [state, setState] = useState("START")
  
  const START = "START"
  const WAIT = "WAIT"
 

  function setCardStatus(index, state) {
    //console.log(`${index} and state ${state}`)
    setCards( prev => {
      const update = prev.map((item, j) => {
        //console.log(` j is ${j} and index is ${index}`)
        if (j == index) {
          //console.log("3333333333333333")
          return { ...item, 
                 status: state};
        } else {
          return item;
        }
      }) 
    return update
   })
  
}

  function steps(){
    if (state === START) {
       setCardStatus(current,"WELL")
       setState(WAIT)
       return /////NOTE force return here
    } else {
       setCardStatus(current,FREE)
       if (current != cards.length-1) {
         setCurrent(current+1)
       } else {
         setCurrent(0)
       }
       setState(START)
    }

}
 function actualCards(item,index) {
     switch (item.status) {
        case FREE: {
          return (
             <div className="card" onClick={() => steps()}>
              {item.textOne}
              </div>  
              )
          break; 
        }
 
        default: {
           return  ( 
              <React.Fragment>
                <div className="card" onClick={() => steps()}>
                   {item.textOne}
                </div>  
                <div className="card" onClick={() => steps()}>
                  {item.textTwo}
                 </div>  
              </React.Fragment>
              )
        }
     }
   
 }
 
 
  function swapOrder() {
   setCards( prev => {
      const update = prev.map((item, j) => {
          let temp = item.textOne
          return { ...item, 
                  textOne: item.textTwo,
                  textTwo: temp};
      }) 
      return update
   })
   
  } 
  return (
   <React.Fragment>
   <div  className="cards">
     
     {cards.map( (item,index) => {
            if (index === current) {  //Only showing one card
                return    actualCards(item, index)
            } else {
              return []
            }
         })
     }

    </div>
    <div>
    <button className="button-simple" onClick={swapOrder}>Swap</button>
  </div>
  </React.Fragment>
  )
}

export default App;
