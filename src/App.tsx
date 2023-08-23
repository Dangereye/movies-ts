// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// React router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Sass
import './sass/styles.scss';

// Contexts
import AppContextComponent from './contexts/AppContext';
import MovieFiltersContextComponent from './contexts/MovieFiltersContext';
import TvFiltersContextComponent from './contexts/TvFiltersContext';
import SearchFiltersContextComponent from './contexts/SearchFiltersContext';
import ImagesFiltersContextComponent from './contexts/ImagesFiltersContext';
import VideoContextComponent from './contexts/VideoContext';

// Components
import Navbar from './components/navbar/Navbar';
import Searchbar from './components/searchbar/SearchbarComponent';
import VideoPlayer from './components/videos/video_player/VideoPlayer';
import ImageModal from './components/image/image_modal/ImageModal';
import MobileMenu from './components/mobile_menu/MobileMenu';
import AppContentWrapper from './components/AppContentWrapper';
import Footer from './components/footer/Footer';

// Pages
import Home from './pages/Home';
import MoviesPopular from './pages/MoviesPopular';
import MoviesTheatricalReleases from './pages/MoviesTheatricalReleases';
import MoviesUpcoming from './pages/MoviesUpcoming';
import MoviesTopRated from './pages/MoviesTopRated';
import MovieDetails from './pages/MovieDetails';
import MovieImages from './pages/MovieImages';
import MovieCastCrew from './pages/MovieCastCrew';
import TvPopular from './pages/TvPopular';
import TvAiringToday from './pages/TvAiringToday';
import TvNextSevenDays from './pages/TvNextSevenDays';
import TvTopRated from './pages/TvTopRated';
import TvSeason from './pages/TvSeason';
import TvSeasonCastCrew from './pages/TvSeasonCastCrew';
import TvDetails from './pages/TvDetails';
import TvImages from './pages/TvImages';
import TvCastCrew from './pages/TvCastCrew';
import PeoplePopular from './pages/PeoplePopular';
import PersonDetails from './pages/PersonDetails';
import MovieGenre from './pages/MovieGenre';
import Search from './pages/Search';
import Collections from './pages/Collections';
import TvGenre from './pages/TvGenre';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContentWrapper>
            <AppContextComponent>
              <ImagesFiltersContextComponent>
                <MovieFiltersContextComponent>
                  <TvFiltersContextComponent>
                    <SearchFiltersContextComponent>
                      <VideoContextComponent>
                        <Navbar />
                        <MobileMenu />
                        <Searchbar />
                        <VideoPlayer />
                        <ImageModal />
                        <Routes>
                          <Route path='/' element={<Home />} />
                          <Route
                            path='/movies/popular'
                            element={<MoviesPopular />}
                          />
                          <Route
                            path='/movies/theatrical-releases'
                            element={<MoviesTheatricalReleases />}
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
                            path='/movies/:movieId/images'
                            element={<MovieImages />}
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
                          <Route
                            path='/tv/next-seven-days'
                            element={<TvNextSevenDays />}
                          />
                          <Route
                            path='/tv/top-rated'
                            element={<TvTopRated />}
                          />
                          <Route path='/tv/:tvId' element={<TvDetails />} />
                          <Route
                            path='/tv/:tvId/images'
                            element={<TvImages />}
                          />
                          <Route
                            path='/tv/:tvId/cast-crew'
                            element={<TvCastCrew />}
                          />
                          <Route
                            path='/tv/:tvId/season/:seasonId'
                            element={<TvSeason />}
                          />
                          <Route
                            path='/tv/:tvId/season/:seasonId/cast-crew'
                            element={<TvSeasonCastCrew />}
                          />
                          <Route
                            path='/genre/:genreId/tv'
                            element={<TvGenre />}
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
                          <Route
                            path='/search/:searchId'
                            element={<Search />}
                          />
                          <Route path='*' element={<NotFound />} />
                        </Routes>
                        <Footer />
                      </VideoContextComponent>
                    </SearchFiltersContextComponent>
                  </TvFiltersContextComponent>
                </MovieFiltersContextComponent>
              </ImagesFiltersContextComponent>
            </AppContextComponent>
          </AppContentWrapper>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
