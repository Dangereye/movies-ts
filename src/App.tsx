// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Sass
import "./sass/styles.scss";

// Contexts
import VideoContextComponent from "./contexts/VideoContext";

// Components
import Navbar from "./components/navbar/Navbar";

// Components
import VideoPlayer from "./components/videos/video_player/VideoPlayer";

// Pages
import Home from "./pages/Home";
import MoviesPopular from "./pages/MoviesPopular";
import MoviesNowPlaying from "./pages/MoviesNowPlaying";
import MoviesUpcoming from "./pages/MoviesUpcoming";
import MoviesTopRated from "./pages/MoviesTopRated";
import MovieDetails from "./pages/MovieDetails";
import TvPopular from "./pages/TvPopular";
import TvAiringToday from "./pages/TvAiringToday";
import TvOnTv from "./pages/TvOnTv";
import TvTopRated from "./pages/TvTopRated";
import TvDetails from "./pages/TvDetails";
import PersonDetails from "./pages/PersonDetails";
import TvSeason from "./pages/TvSeason";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <VideoContextComponent>
            <VideoPlayer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies/popular" element={<MoviesPopular />} />
              <Route
                path="/movies/now-playing"
                element={<MoviesNowPlaying />}
              />
              <Route path="/movies/upcoming" element={<MoviesUpcoming />} />
              <Route path="/movies/top-rated" element={<MoviesTopRated />} />
              <Route path="/movies/:movieId" element={<MovieDetails />} />
              <Route path="/tv/popular" element={<TvPopular />} />
              <Route path="/tv/airing-today" element={<TvAiringToday />} />
              <Route path="/tv/on-tv" element={<TvOnTv />} />
              <Route path="/tv/top-rated" element={<TvTopRated />} />
              <Route path="/tv/:tvId" element={<TvDetails />} />
              <Route path="/tv/:tvId/season/:seasonId" element={<TvSeason />} />
              <Route path="/person/:personId" element={<PersonDetails />} />
            </Routes>
          </VideoContextComponent>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
