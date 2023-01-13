import React from 'react'

const Pin = ({pin}) => {
    console.log(pin)
  return (
    <div>
        <img src={pin.image.asset.url} alt="" srcset="" />
    </div>
  )
}

export default Pin