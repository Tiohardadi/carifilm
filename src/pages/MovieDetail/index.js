import React,{useState,useEffect} from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Axios from 'axios';

function MovieDetail(props) {
    const [movieDetail,SetMovieDetail]=useState([]);
    const [loading,SetLoading]=useState(true);
    const [error,SetError]=useState(false);
    const { id } = useParams();
    const getMovieDetail = async ()=>{
        try {
            let response = await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US`)
            SetMovieDetail(response.data)
            SetLoading(false)
            
        } catch (e) {
            SetError(true)
            SetLoading(false)
            console.log(e.message)
            
        }
    }
    useEffect(() => {
        getMovieDetail()
    },[])
    return (
        <div className="container">
            <hr/>
            {!loading?
                error?
                    <div className="d-flex justify-content-center" style={{height:'500px'}}>
                        <p className="align-self-center">sorry information this movie is being maintained</p>
                    </div>:
                <>
                    <nav aria-label="breadcrumb" className="mt-3">
                        <ol className="breadcrumb" style={{backgroundColor :'#121212'}}>
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="#">Movie</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{movieDetail.title||movieDetail.name}</li>
                        </ol>
                    </nav>
                    <div className="row my-5">
                        <div className="offset-lg-2 col-lg-4 col-md-6 d-flex mb-5">
                            <img className="mx-auto" src={movieDetail.poster_path?"https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+movieDetail.poster_path:"https://underscoremusic.co.uk/site/wp-content/uploads/2014/05/no-poster.jpg"} alt="poster" width="300px" height="450px"></img>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h3>{movieDetail.title||movieDetail.name}</h3>
                            <p style={{color :'#F7D603'}}>{movieDetail.tagline}</p>
                            <h2 className="my-3"><span style={{color :'#F7D603'}}>&#9733;</span> {movieDetail.vote_average?parseFloat(movieDetail.vote_average).toFixed(1):"No Rating"}</h2>
                            <p>{movieDetail.overview}</p>
                            <p className="text-muted">
                            {movieDetail.original_language.toUpperCase()} | {movieDetail.release_date} | {movieDetail.genres.map( (genre,key) => key!==0?", "+genre.name:genre.name)}
                            </p>
                        </div>
                    </div>
                </>
            :
            <div className="d-flex" style={{height:'500px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto',background: 'none', display: 'block', shapeRendering: 'auto'}} width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#f7d603" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138" transform="rotate(13.2743 50 50)">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                </svg>
            </div>
            }
        </div>
    );
}

export default MovieDetail;