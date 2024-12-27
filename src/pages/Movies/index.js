import React, { useState, useEffect } from "react";
import { MovieItem } from "../../components";

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center">
    <div className="spinner-border text-light" role="status">
      {/* <span className="visually-hidden">Loading...</span> */}
    </div>
  </div>
);

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const fetchMovies = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=3c5a9de831b2367079daedb085f155fc&page=${page}&sort_by=${sortBy}&include_adult=false`
      );
      const data = await response.json();

      setMovies(data.results);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1);
  }, [sortBy]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="min-vh-100 bg-black pb-8">
      <div className="container py-5 px-4" style={{ marginTop: "76px" }}>
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
            All Movies
            <select
              value={sortBy}
              onChange={handleSortChange}
              style={{
                fontSize: "18px",
                background: "transparent",
                border: "none",
                color: "#FCA311",
                height: "25px",
                textAlign: "right",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="vote_average.desc">Highest Rated</option>
              <option value="release_date.desc">Newest</option>
              <option value="revenue.desc">Highest Revenue</option>
            </select>
          </h2>
        </div>
        <div>
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              <div className="row justify-content-center justify-content-md-between">
                {movies.map((movie) => (
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
                      type="movie"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 d-flex flex-column align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center mb-2"
                  style={{ gap: "10px" }} // Tambahkan jarak antar-elemen
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      fontSize: "18px",
                      background: "transparent",
                      border: "none",
                      color: "#FCA311",
                      height: "30px",
                      textAlign: "center", // Sesuaikan teks di tombol
                      outline: "none",
                      boxShadow: "none",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    Previous
                  </button>
                  <span
                    className="text-light"
                    style={{
                      display: "inline-block", 
                      textAlign: "center",
                      fontSize: "16px", 
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => {
                      handlePageChange(currentPage + 1)
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth", // Animasi scroll yang halus
                      });
                    }}
                    disabled={currentPage === totalPages}
                    style={{
                      fontSize: "18px",
                      background: "transparent",
                      border: "none",
                      color: "#FCA311",
                      height: "30px",
                      textAlign: "center",
                      outline: "none",
                      boxShadow: "none",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
