import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[20%] w-full aspect-video px-20 absolute text-white bg-gradient-to-r from-black'>
        
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/4 font-sans'>{overview}</p>
        <div className=''>
            <button className='bg-white text-black px-12 p-4 rounded-lg font-medium hover:bg-opacity-80'>▶ Play</button>
            <button className='bg-gray-400 text-white px-12 p-4 rounded-lg mx-2 font-medium '>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle