import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


function MovieDetail() {
    const [movieDetail, setMovieDetail] = useState(null);
    const [watchProviders, setWatchProviders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { type, id } = useParams();

    useEffect(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight, 
          behavior: "instant", 
        });
      }, []); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch movie details
                const movieResponse = await fetch(
                    `https://api.themoviedb.org/3/${type}/${id}?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US`
                );
                const movieData = await movieResponse.json();
                
                // Fetch watch providers
                const providersResponse = await fetch(
                    `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=3c5a9de831b2367079daedb085f155fc`
                );
                const providersData = await providersResponse.json();
                
                setMovieDetail(movieData);
                // Get US providers or fall back to first available region
                const regions = providersData.results;
                const usProviders = regions.US || Object.values(regions)[0];
                setWatchProviders(usProviders);
                setLoading(false);
            } catch (e) {
                setError(true);
                setLoading(false);
                console.log(e.message);
            }
        };
        fetchData();
    }, [id, type]);

    const handleWatchNow = () => {
        if (watchProviders?.flatrate && watchProviders.flatrate.length > 0) {
            const movieTitle = movieDetail.title || movieDetail.name;
    
            // URL pencarian untuk beberapa provider populer
            const providerUrls = {
                'netflix': `https://www.netflix.com/search?q=${encodeURIComponent(movieTitle)}`,
                'disney plus': `https://www.disneyplus.com/search?q=${encodeURIComponent(movieTitle)}`,
                'amazon prime video': `https://www.primevideo.com/search/ref=atv_sr_sug_1?phrase=${encodeURIComponent(movieTitle)}`,
                'hbo max': `https://www.hbomax.com/search?q=${encodeURIComponent(movieTitle)}`,
                'hulu': `https://www.hulu.com/search?q=${encodeURIComponent(movieTitle)}`,
                'apple itunes': `https://itunes.apple.com/search?term=${encodeURIComponent(movieTitle)}`,
                'google play movies': `https://play.google.com/store/search?q=${encodeURIComponent(movieTitle)}`,
                'youtube': `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)}`,
                'peacock': `https://www.peacocktv.com/watch/search?q=${encodeURIComponent(movieTitle)}`,
                'peacock premium': `https://www.peacocktv.com/watch/search?q=${encodeURIComponent(movieTitle)}`,
                'peacock premium plus': `https://www.peacocktv.com/watch/search?q=${encodeURIComponent(movieTitle)}`,
                'paramount plus': `https://www.paramountplus.com/shows/?q=${encodeURIComponent(movieTitle)}`,
                'vudu': `https://www.vudu.com/content/movies/search?searchString=${encodeURIComponent(movieTitle)}`,
                'rakuten tv': `https://rakuten.tv/search?q=${encodeURIComponent(movieTitle)}`,
                'crave': `https://www.crave.ca/search?q=${encodeURIComponent(movieTitle)}`,
                'starz': `https://www.starz.com/us/en/search?q=${encodeURIComponent(movieTitle)}`,
                'showtime': `https://www.sho.com/search?q=${encodeURIComponent(movieTitle)}`,
                'plex': `https://watch.plex.tv/movie?q=${encodeURIComponent(movieTitle)}`,
                'fubotv': `https://www.fubo.tv/search?q=${encodeURIComponent(movieTitle)}`,
                'freeform': `https://www.freeform.com/search?q=${encodeURIComponent(movieTitle)}`,
            };
    
            // Coba setiap provider dalam array
            for (const provider of watchProviders.flatrate) {
                const providerName = provider.provider_name.toLowerCase();
                const url = providerUrls[providerName] || watchProviders.link;
    
                if (url) {
                    window.open(url, '_blank');
                    return; // Berhenti setelah menemukan URL yang valid
                }
            }
    
            // Jika tidak ada URL yang ditemukan
            alert('No specific search URL available for any provider.');
        } else {
            alert('No streaming information available for this title.');
        }
    };
    
    

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#000000' }}>
                <div className="spinner-border" style={{ color: '#FCA311' }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#000000' }}>
                <p style={{ color: '#E5E5E5' }}>Sorry, this movie information is currently unavailable.</p>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '56px', paddingBottom: '56px', backgroundColor: '#000000', minHeight: '100vh' }}>
            <div 
                className="position-relative" 
                style={{ 
                    height: '70vh',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div 
                    className="position-absolute w-100 h-100" 
                    style={{ 
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, #000000 100%)'
                    }}
                />
            </div>

            <div className="container position-relative" style={{ marginTop: '-200px', marginBottom: '56px' }}>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <img
                            className="img-fluid rounded shadow"
                            src={
                                movieDetail.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
                                    : "https://via.placeholder.com/500x750.png?text=No+Poster"
                            }
                            alt={movieDetail.title || movieDetail.name}
                        />
                    </div>
                    <div className="col-md-8">
                        <h1 className="text-white mb-2">{movieDetail.title || movieDetail.name}</h1>
                        
                        {movieDetail.tagline && (
                            <p style={{ color: '#FCA311', fontSize: '1.2rem', fontStyle: 'italic' }} className="mb-4">
                                "{movieDetail.tagline}"
                            </p>
                        )}

                        <div className="d-flex align-items-center mb-4 flex-wrap">
                            <span 
                                className="px-3 py-2 rounded mr-3 mb-2" 
                                style={{ backgroundColor: '#FCA311', color: '#000000', fontSize: '1.2rem' }}
                            >
                                ★ {movieDetail.vote_average ? movieDetail.vote_average.toFixed(1) : "N/A"}
                            </span>
                            <span style={{ color: '#E5E5E5', marginRight: '20px' }}>
                                {movieDetail.vote_count.toLocaleString()} reviews
                            </span>
                            <span style={{ color: '#E5E5E5' }}>
                                {movieDetail.runtime} min
                            </span>
                        </div>

                        <p style={{ color: '#E5E5E5', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            {movieDetail.overview}
                        </p>

                        <div className="mb-4">
                            {movieDetail.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="mr-2 mb-2 d-inline-block px-3 py-1 rounded"
                                    style={{ 
                                        backgroundColor: '#14213D',
                                        color: '#E5E5E5'
                                    }}
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="d-flex flex-wrap mb-4">
                            <div className="mr-4 mb-3">
                                <strong style={{ color: '#FCA311' }}>Release Date:</strong>
                                <p style={{ color: '#E5E5E5' }}>
                                    {new Date(movieDetail.release_date || movieDetail.first_air_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="mr-4 mb-3">
                                <strong style={{ color: '#FCA311' }}>Language:</strong>
                                <p style={{ color: '#E5E5E5' }}>
                                    {movieDetail.original_language.toUpperCase()}
                                </p>
                            </div>
                            <div className="mr-4 mb-3">
                                <strong style={{ color: '#FCA311' }}>Status:</strong>
                                <p style={{ color: '#E5E5E5' }}>
                                    {movieDetail.status}
                                </p>
                            </div>
                            <div className="mb-3">
                            {watchProviders?.flatrate && (
                                <div className="mb-3">
                                    <strong style={{ color: '#FCA311' }}>Available on:</strong>
                                    <div className="d-flex flex-wrap mt-2">
                                    {watchProviders.flatrate.map((provider) => (
                                        <div
                                            key={provider.provider_id}
                                            className="mr-2 mb-2"
                                            style={{ width: '30px' }}
                                        >
                                            <img
                                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                                alt={provider.provider_name}
                                                title={provider.provider_name}
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '4px'
                                                }}
                                            />
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        </div>


                        <div className="d-flex flex-wrap">
                            <button 
                                onClick={watchProviders?.link && watchProviders?.flatrate && watchProviders.flatrate.length > 0 && handleWatchNow}
                                className="btn mr-3 mb-3 px-4 py-2" 
                                style={{ 
                                    backgroundColor: watchProviders?.link && watchProviders?.flatrate && watchProviders.flatrate.length > 0 ? '#FCA311' : '#666',
                                    color: '#000000',
                                    fontSize: '1.1rem',
                                    cursor: watchProviders?.link && watchProviders?.flatrate && watchProviders.flatrate.length > 0 ? 'pointer' : 'not-allowed'
                                }}
                                disabled={!watchProviders?.link && watchProviders?.flatrate && watchProviders.flatrate.length > 0}
                            >
                                {watchProviders?.link && watchProviders?.flatrate && watchProviders.flatrate.length > 0 ? 'WATCH NOW' : 'NOT AVAILABLE'}
                            </button>
                            
                            <button 
                                onClick={() => alert('Add to watchlist functionality to be implemented')}
                                className="btn mb-3 px-4 py-2" 
                                style={{ 
                                    borderColor: '#FCA311', 
                                    color: '#FCA311',
                                    fontSize: '1.1rem'
                                }}
                            >
                                ADD TO WATCHLIST
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;