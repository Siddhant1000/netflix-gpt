import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BACKGROUND_IMG } from '../utils/constant';

const GPTSearch = () => {
  return (
    <div>
       <div className="absolute -z-10">
        <img className="w-[1950px] h-[953px]" src={BACKGROUND_IMG} alt="img"></img>
      </div>

      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GPTSearch;