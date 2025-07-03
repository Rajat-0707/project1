import './history.css'

import React from 'react'

const History = (props) => {
  return (<>


       <div className="contains">
         <div className="box1">
           <p className='round'> Round {props.round}:</p> 
           <p className='user-choice'>You chose {props.userNumber} ({props.selectedSide}),</p>
           <p className='computer-choice'>Computer chose {props.computerNumber}.</p>
           <br />
         <p className='result'>Result: {props.gameResult}</p></div>
  </div>
  </>
  )
}

export default History