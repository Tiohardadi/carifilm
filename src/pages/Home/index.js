import React,{useState,useEffect} from 'react';
import { MovieItem } from '../../components';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

function Home(props) {
    const history = useHistory();
    const [trendingMovies,SetTrendingMovies]=useState([]);
    const [popularMovies,SetPopularMovies]=useState([]);


    const getTrendingMovies = async ()=>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=3c5a9de831b2367079daedb085f155fc')
            SetTrendingMovies(response.data.results)
        } catch (e) {
            console.log(e.message)
        }
    }
    const getPopularMovies = async ()=>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US&page=1')
            SetPopularMovies(response.data.results)
        } catch (e) {
            console.log(e.message)
        }
    }


    useEffect(() => {
        getTrendingMovies()
        getPopularMovies()
    }, [])
    return (
        <div className="container">
        
            <h5 className="mt-1"><strong>What's Popular</strong></h5>
            <div id="carouselTredingMovie" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                        {
                            popularMovies.map((movie,id) =>{
                                return(
                                    <li data-target="#carouselTredingMovie" className={id===0? "active" : ""} data-slide-to={id} key={id}></li>
                                )
                            })
                        }
                </ol>
                <div className="carousel-inner">
                    {
                        popularMovies.map((movie,id) =>{
                            return(
                            <div  className={id===0? "carousel-item active" : " carousel-item"} key={id} onClick={(e) => history.push(`/moviedetail/${movie.id}`)} style={{cursor:'pointer'}}>
                                <img className="d-block  w-100" height="400px" src={"https://image.tmdb.org/t/p/w533_and_h300_bestv2/"+movie.backdrop_path} alt={id}></img>
                                <div className="carousel-caption d-none d-md-block text-white" style={{ textShadow: '2px 1px 0px #121212'}}>
                                    <h2 style={{ color: '#F7D603'}} ><strong>{movie.title||movie.name}</strong></h2>
                                    <p  >{movie.overview}</p>
                                </div>
                            </div>
                            )
                        })
                    }
                  
                </div>
                <a className="carousel-control-prev" href="#carouselTredingMovie" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselTredingMovie" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div >
                <div className="my-4">
                    <h5><strong>Trending</strong></h5>
                    <div className="d-flex flex-wrap ">
                        {
                            trendingMovies.map((movie,id) =>{
                                return(
                                    <MovieItem 
                                    clickEvent={(e) => history.push(`/moviedetail/${movie.id}`)}
                                    title={movie.title||movie.name} 
                                    rating={movie.vote_average} 
                                    poster={movie.poster_path} 
                                    key={id} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;