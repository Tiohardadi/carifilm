import React from 'react';
import { Link } from 'react-router-dom';

function MovieItem({ id, title, rating, poster, year, type }) {
  return (
    <Link 
      to={`/${type}/${id}`}
      className="movie-item text-decoration-none"
      style={{ 
        display: 'block',
        margin: '0 10px 20px',
        transition: 'transform 0.3s ease'
      }}
    >
      <div style={{ width: '200px', position: 'relative' }}>
        <img 
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          className="img-fluid rounded"
          style={{ 
            width: '100%',
            height: '300px',
            objectFit: 'cover'
          }}
        />
        <div 
          className="px-2 py-1 rounded position-absolute"
          style={{ 
            top: '8px', 
            right: '8px', 
            backgroundColor: '#FCA311',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#000000'
          }}
        >
          ★ {rating ? parseFloat(rating).toFixed(1) : "N/A"}
        </div>
        <div 
          className="position-absolute p-3 w-100"
          style={{ 
            bottom: '0',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px'
          }}
        >
          <h3 className="text-white text-truncate mb-1" style={{ fontSize: '14px', fontWeight: '600' }}>
            {title}
          </h3>
          <div className="d-flex align-items-center">
            <span className="text-white-50 mr-2" style={{ fontSize: '12px' }}>{year}</span>
            <span 
              className="px-2 py-1 rounded"
              style={{ 
                fontSize: '12px',
                backgroundColor: '#14213D',
                color: '#E5E5E5'
              }}
            >
              {type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieItem;
