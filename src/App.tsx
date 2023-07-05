// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// React Router Dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Sass
import './sass/styles.scss';

// Contexts
import AppContextComponent from './contexts/AppContext';
import MovieFiltersContextComponent from './contexts/MovieFiltersContext';
import TvFiltersContextComponent from './contexts/TvFiltersContext';
import SearchFiltersContextComponent from './contexts/SearchFiltersContext';
import VideoContextComponent from './contexts/VideoContext';

// Components
import Navbar from './components/navbar/Navbar';
import Searchbar from './components/searchbar/Searchbar';
import VideoPlayer from './components/videos/video_player/VideoPlayer';

// Pages
import Home from './pages/Home';
import MoviesPopular from './pages/MoviesPopular';
import MoviesNowPlaying from './pages/MoviesNowPlaying';
import MoviesUpcoming from './pages/MoviesUpcoming';
import MoviesTopRated from './pages/MoviesTopRated';
import MovieDetails from './pages/MovieDetails';
import MovieCastCrew from './pages/MovieCastCrew';
import TvPopular from './pages/TvPopular';
import TvAiringToday from './pages/TvAiringToday';
import TvOnTv from './pages/TvOnTv';
import TvTopRated from './pages/TvTopRated';
import TvSeason from './pages/TvSeason';
import TvDetails from './pages/TvDetails';
import TvCastCrew from './pages/TvCastCrew';
import PeoplePopular from './pages/PeoplePopular';
import PersonDetails from './pages/PersonDetails';
import MovieGenre from './pages/MovieGenre';
import Search from './pages/Search';
import Collections from './pages/Collections';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContextComponent>
            <Navbar />
            <Searchbar />
            <MovieFiltersContextComponent>
              <TvFiltersContextComponent>
                <SearchFiltersContextComponent>
                  <VideoContextComponent>
                    <VideoPlayer />
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route
                        path='/movies/popular'
                        element={<MoviesPopular />}
                      />
                      <Route
                        path='/movies/now-playing'
                        element={<MoviesNowPlaying />}
                      />
                      <Route
                        path='/movies/upcoming'
                        element={<MoviesUpcoming />}
                      />
                      <Route
                        path='/movies/top-rated'
                        element={<MoviesTopRated />}
                      />
                      <Route
                        path='/movies/:movieId'
                        element={<MovieDetails />}
                      />
                      <Route
                        path='/movies/:movieId/cast-crew'
                        element={<MovieCastCrew />}
                      />
                      <Route
                        path='/genre/:genreId/movie'
                        element={<MovieGenre />}
                      />
                      <Route path='/tv/popular' element={<TvPopular />} />
                      <Route
                        path='/tv/airing-today'
                        element={<TvAiringToday />}
                      />
                      <Route path='/tv/on-tv' element={<TvOnTv />} />
                      <Route path='/tv/top-rated' element={<TvTopRated />} />
                      <Route path='/tv/:tvId' element={<TvDetails />} />
                      <Route
                        path='/tv/:tvId/cast-crew'
                        element={<TvCastCrew />}
                      />
                      <Route
                        path='/tv/:tvId/season/:seasonId'
                        element={<TvSeason />}
                      />
                      <Route
                        path='/people/popular'
                        element={<PeoplePopular />}
                      />
                      <Route
                        path='/people/:personId'
                        element={<PersonDetails />}
                      />
                      <Route
                        path='/collection/:collectionId'
                        element={<Collections />}
                      />
                      <Route path='/search/:searchId' element={<Search />} />
                    </Routes>
                  </VideoContextComponent>
                </SearchFiltersContextComponent>
              </TvFiltersContextComponent>
            </MovieFiltersContextComponent>
          </AppContextComponent>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
