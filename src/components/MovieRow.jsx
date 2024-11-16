import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieItem from './MovieItem';
import YouTube from 'react-youtube';
import toast, { Toaster } from "react-hot-toast";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
console.log(API_KEY);

const MovieRow = ({title, url}) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        axios.get(url).then((response) => setMovies(response.data.results))
    }, [url]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 0,
        },
    }

    // Function to handle fetching the trailer for a movie based on its ID
    const handleMovieId = (movieId) => {
        console.log("movieId: ", movieId);
        axios
       .get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
       .then((response) => {
            if (response.data.results.length!== 0) {
                
                const videoId = response.data.results[0].key;
                setTrailerUrl(videoId);
                console.log("videoid: ", videoId);
            } else {
                toast.error("Oops Trailer not available");
            }
        })
       .catch((err) => {
            toast.error("Oops Trailer not available");
            console.log(err);
        });
    };


    return (
        <>
            <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>{title}</h2>
            <div className='reletive flex items-center'>
                <div 
                    id={`slider`} 
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
                >
                    {movies.map((movie) => (
                        <MovieItem key={movie.id} movie={movie} onMovieClick={handleMovieId}/>
                    ))}
                    {trailerUrl ? <YouTube opts={opts} videoId={trailerUrl} /> : null}
                    
                </div>
                
            </div>
        </>
    )
}

export default MovieRow