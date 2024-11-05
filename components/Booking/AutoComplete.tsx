import React from 'react'

export default function AutoComplete() {
  return (
    <div>
        <div>
            <label htmlFor="text">Where From?   </label>
            <input type="text" 
            className='bg-white p-1 border-[1px] outline-none w-full focus:border-yellow-400'/>
        </div>
        <div className='mt-3'>
            <label htmlFor="text">Where To?   </label>
            <input type="text" 
            className='bg-white p-1 border-[1px] outline-none w-full focus:border-yellow-400'/>
        </div>

    </div>
  )
}
