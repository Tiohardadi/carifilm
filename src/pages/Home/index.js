import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieItem } from "../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingRes, popularRes] = await Promise.all([
          fetch(
            "https://api.themoviedb.org/3/trending/all/day?api_key=3c5a9de831b2367079daedb085f155fc"
          ),
          fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US&page=1"
          ),
        ]);

        const trendingData = await trendingRes.json();
        const popularData = await popularRes.json();

        setTrendingMovies(trendingData.results);
        setPopularMovies(popularData.results);
        setFeaturedMovie(popularData.results[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default untuk ukuran terkecil
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // untuk col-lg-2 (layar besar)
        settings: {
          slidesToShow: 4, // Menyesuaikan dengan col-lg-2
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // untuk col-md-3 (layar medium)
        settings: {
          slidesToShow: 3, // Menyesuaikan dengan col-md-3
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // untuk col-sm-4 (layar kecil)
        settings: {
          slidesToShow: 2, // Menyesuaikan dengan col-sm-4
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // untuk col-8 (layar sangat kecil)
        settings: {
          slidesToShow: 2, // Menyesuaikan dengan col-8
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Untuk ukuran layar ponsel lebih kecil
        settings: {
          slidesToShow: 1, // Menampilkan 1 slide pada layar ponsel lebih kecil
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ paddingTop: "56px", minHeight: "100vh" }}>
      {/* Hero Section */}
      {featuredMovie && (
        <div className="position-relative" style={{ height: "70vh" }}>
          <div className="position-absolute w-100 h-100">
            <img
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              className="position-absolute w-100 h-100"
              style={{
                top: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
              }}
            />
          </div>

          <div className="container position-relative h-100">
            <div
              className="d-flex align-items-center h-100"
              style={{ maxWidth: "600px" }}
            >
              <div>
                <h1 className="text-white display-4 font-weight-bold mb-3">
                  {featuredMovie.title || featuredMovie.name}
                </h1>
                <p className="text-white-50 mb-4">{featuredMovie.overview}</p>
                <div className="d-flex flex-wrap">
                  <Link
                    to={`/movie/${featuredMovie.id}`}
                    className="btn mr-3 mb-2 px-4 py-2"
                    style={{ backgroundColor: "#FCA311", color: "#000000" }}
                  >
                    WATCH NOW
                  </Link>
                  <button
                    className="btn mb-2 px-4 py-2"
                    style={{ borderColor: "#FCA311", color: "#FCA311" }}
                    onClick={() =>
                      alert("Trailer functionality to be implemented")
                    }
                  >
                    WATCH TRAILER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Movies Section (Slider) */}
      <div className="py-5" style={{ backgroundColor: "#14213D" }}>
        <div className="container">
          <h2 style={{ color: "#FCA311" }} className="mb-4">
            Trending Now
          </h2>
          <Slider {...sliderSettings}>
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="px-2">
                <MovieItem
                  id={movie.id}
                  title={movie.title || movie.name}
                  rating={movie.vote_average}
                  poster={movie.poster_path}
                  year={movie.release_date?.split("-")[0] || "2023"}
                  type={movie.media_type}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Popular Movies Section (Grid) */}
      <div className="container py-5">
        <div className="row">
          <h2
            style={{
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="mb-4"
          >
            Popular Movies
            <Link
              to={`/movies`}
              style={{
                fontSize: "18px",
                color: "#FCA311",
                textDecoration: "none",
                transition: "transform 0.3s ease",
              }}
            >
              See All
            </Link>
          </h2>
        </div>
        <div className="row justify-content-center justify-content-md-between">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              className="col-8 col-sm-5 col-md-3 col-lg-3 col-xl-2 mb-4 mx-2 d-flex justify-content-center align-items-center"
            >
              <MovieItem
                id={movie.id}
                title={movie.title || movie.name}
                rating={movie.vote_average}
                poster={movie.poster_path}
                year={movie.release_date?.split("-")[0] || "2023"}
                type={"movie"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
