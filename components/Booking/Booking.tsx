"use client";

import React, { useState, useEffect } from 'react';
import AutoComplete from './AutoComplete';

export default function Booking() {
 const [bookingHeight, setBookingHeight] = useState(0)
    useEffect(() => {
        setBookingHeight(window.innerHeight * 0.72)
    }, [])


  return (
    <div>
      <h1 className='text-5xl font-medium'>Booking</h1>
      <div className="border-[1px] p-5 rounded-sm" style={{height:bookingHeight}}>
        <AutoComplete />
      </div>
    </div>
  );
}
