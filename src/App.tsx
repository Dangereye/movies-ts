// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Sass
import "./sass/styles.scss";

// Components
import Navbar from "./components/navbar/Navbar";

// Pages
import Home from "./pages/Home";
import MoviesPopular from "./pages/MoviesPopular";
import MoviesNowPlaying from "./pages/MoviesNowPlaying";
import MoviesUpcoming from "./pages/MoviesUpcoming";
import MoviesTopRated from "./pages/MoviesTopRated";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import PersonDetails from "./pages/PersonDetails";
import VideoContextComponent from "./contexts/VideoContext";
import VideoPlayer from "./components/video/video_player/VideoPlayer";

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
              <Route path="/tv/:tvId" element={<TvDetails />} />
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
