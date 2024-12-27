import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=3c5a9de831b2367079daedb085f155fc&query=${encodeURIComponent(
            query
          )}`
        );
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchMovies, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const renderResult = (result) => {
    const title = result.title || result.name;
    const date = result.release_date || result.first_air_date;
    const year = date ? new Date(date).getFullYear() : '';
    const imageUrl = result.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${result.backdrop_path}`
      : result.poster_path
      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
      : "https://via.placeholder.com/500x281?text=No+Image";

    return (
      <Link
        to={`/${result.media_type}/${result.id}`}
        className="text-decoration-none"
        onClick={() => setIsOpen(false)}
      >
        <div className="search-result-item">
          <div className="search-result-image">
            <img
              src={imageUrl}
              alt={title}
              className="rounded"
            />
          </div>
          <div className="search-result-info">
            <div className="search-result-title">{title}</div>
            <div className="search-result-meta">
              {year} • {result.media_type.toUpperCase()}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div ref={searchRef} className="position-relative">
      <div className="search-container">
        <svg 
          className="search-icon" 
          width="16" 
          height="16" 
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M15.7 14.3L12.3 10.9C13.4 9.5 14 7.8 14 6C14 2.7 11.3 0 8 0C4.7 0 2 2.7 2 6C2 9.3 4.7 12 8 12C9.8 12 11.5 11.4 12.9 10.3L16.3 13.7C16.5 13.9 16.8 14 17 14C17.2 14 17.5 13.9 17.7 13.7C18.1 13.3 18.1 12.7 17.7 12.3L15.7 14.3ZM4 6C4 3.8 5.8 2 8 2C10.2 2 12 3.8 12 6C12 8.2 10.2 10 8 10C5.8 10 4 8.2 4 6Z"
            fill="currentColor"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search movies, TV shows..."
          className="search-input"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="clear-button"
          >
            <svg 
              width="8" 
              height="8" 
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M11 1L1 11M1 1L11 11" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results">
          <div className="search-results-scroll">
            {results.map((result) => (
              (result.media_type != 'person') && (
                <div key={result.id}>
                  {renderResult(result)}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      <style>
        {`
          .search-container {
            background: rgba(32, 40, 49, 0.8);
            border-radius: 6px;
            padding: 8px 12px;
            min-width: 300px;
            display: flex;
            align-items: center;
          }
          .search-input {
            background: transparent;
            border: none;
            color: white;
            width: 100%;
            font-size: 12px;
            padding: 0 8px;
            height: 25px;
          }
          .search-input:focus {
            outline: none;
          }
          .search-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          .search-icon {
            color: rgba(255, 255, 255, 0.5);
          }
          .clear-button {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            height: 25px;
          }
          .clear-button:hover {
            color: white;
          }
          .search-results {
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            right: 0;
            background: rgb(19, 23, 34);
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000;
          }
          .search-results-scroll {
            max-height: 80vh;
            overflow-y: auto;
          }
          .search-result-item {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            gap: 12px;
            transition: background-color 0.2s;
          }
          .search-result-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
          .search-result-image {
            width: 100px;
            height: 56px;
            flex-shrink: 0;
          }
          .search-result-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .search-result-info {
            flex-grow: 1;
            min-width: 0;
          }
          .search-result-title {
            color: white;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .search-result-meta {
            color: rgba(255, 255, 255, 0.5);
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
}

export default Search;

