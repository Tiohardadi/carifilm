import React from 'react';

function MovieItem(props) {
    return (
        <div onClick={props.clickEvent} className="mb-4 ml-4 position-relative" style={{width: '130px',height:'250px',cursor:'pointer'}}>
            <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+props.poster} alt="poster" width="130px" height="225px"></img>
            <p className="position-absolute text-dark px-1 rounded-right" style={{backgroundColor:'#F7D603',top:'10px'}}>{props.rating?parseFloat(props.rating).toFixed(1):"No Rating"}</p>
            <p className="text-truncate">{props.title}</p>
        </div>
    );
}

export default MovieItem;