import React from 'react';
import './Letter.css';

export default function Letter (props) {
  const [mark, setMark] = React.useState(false)
  function handleClick() {
    setMark(prevMark => !prevMark)
  }
  React.useEffect(() => {
    if(props.clear >= 1) {
      setMark(false)
    }
  }, [props.clear])

  return (
    <div className="letter" onClick={handleClick}>
      <p>{props.letter}</p>
      {mark && <div className="cross">
        <span id="cross-left"/>
        <span id="cross-right"/>
        </div>
      } 
    </div>
  )
}