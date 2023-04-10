import { useState , useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg' ;
import MovieCard from './movieCard';

const key = process.env.REACT_APP_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${key}&s=`
function App() {
  const [movies,setMovies] = useState([]) ;
  const [searchTerm,setSearchTerm] = useState('') ;
  const searchMovie = async (title)=>{
    const response = await fetch(`${API_URL}${title}`) ;
    const data = await response.json() ;
    // console.log(data.Search) ;
    setMovies(data.Search) ;
  }

  useEffect(()=>{
    searchMovie('Amazing Spiderman') ;
  },[]) ;

  return (
    <div className="app">
      <h1>Movie</h1>
      <div className="search">
        <input type="text"
        placeholder='Search for movie'
        value={searchTerm}
        onChange={(e)=>{setSearchTerm(e.target.value)}} />
        <img src={SearchIcon} 
        alt="search"
        onClick={()=>{searchMovie(searchTerm)}} />
      </div>

      <div className="container">
        {
          movies.length>1?
          movies.map((mv,ind)=>(
            <MovieCard movie1={mv} key={ind}/>
          ))
          :
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        }
      </div>

    </div>
  )
}

export default App;
