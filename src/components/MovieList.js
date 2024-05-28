import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {

  return (
    <div className='px-6'>
       <h1 className='text-4xl py-5  text-white font-serif'>{title}</h1>
        <div className='flex overflow-x-scroll scrollbar-hide'>
            <div className='flex'>
            {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}

               
            </div>
        </div>
     
    </div>
  )
}

export default MovieList