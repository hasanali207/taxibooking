import React from 'react'
import Booking from './Booking/Booking'
import Map from './Map/Map'

export default function Banner() {
  return (
  <div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div>
            
        <Booking></Booking>
        </div>
        <div className='col-span-2'>
            
        <Map></Map>
        </div>

    </div>
  </div>
  )
}
