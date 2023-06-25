import { useEffect, useContext, useRef } from 'react';
import useAppendTv from '../hooks/useAppendTv';
import Article from '../components/articles/Article';
import InfiniteCards from '../components/cards/InifinteCards';
import CardContent from '../components/cards/card/CardContent';
import Container from '../components/container/Container';
import Header from '../components/header/Header';
import ImageComponent from '../components/image/Image';
import Layout from '../components/layout/Layout';
import Main from '../components/main/Main';
import Navigation from '../components/navigation/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import { tvPages } from '../data/tvPages';
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import H2 from '../components/typography/H2';
import { formatDate } from '../utilities/formatDate';
import { TvFiltersContext } from '../contexts/TvFiltersContext';
import TVShowsWithSidebar from '../components/page_templates/TVShowsWithSidebar';
import Loader from '../components/loader/Loader';

export default function TvPopular() {
  const getNextPageParam = (page: IPage<ITVShowMin>) => page.page + 1;
  const { state, dispatch } = useContext(TvFiltersContext);
  const { append } = useAppendTv();
  const initial = useRef(false);
  const title = 'TV Shows: Popular';
  const name = 'tv-shows-popular';

  const {
    data: tvQueries,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<ITVShowMin>>(
    'discover/tv',
    append,
    getNextPageParam
  );

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      dispatch({
        type: 'SET_DEFAULT_POPULAR',
        payload: { ...state },
      });
    }
  });

  if (isLoading) {
    return (
      <TVShowsWithSidebar title={title} name={name}>
        <Loader />
      </TVShowsWithSidebar>
    );
  }

  if (isError) {
    return (
      <TVShowsWithSidebar title={title} name={name}>
        <BodyText text='Oops! Something went wrong.' />
      </TVShowsWithSidebar>
    );
  }

  if (tvQueries.pages[0].total_results === 0) {
    return (
      <TVShowsWithSidebar title={title} name={name}>
        <BodyText text='No items were found that match your query.' />
      </TVShowsWithSidebar>
    );
  }

  return (
    <TVShowsWithSidebar title={title} name={name}>
      <MobileSidebarControls />
      <InfiniteCards
        getId={(item) => item.id}
        getLink={(item) => `/tv/${item.id}`}
        renderContent={(item) => (
          <>
            <ImageComponent
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              fallback='/images/error_500x750.webp'
              alt={item.name}
            />
            <CardContent heading={item.name} vote={item.vote_average}>
              <BodyText text={`${formatDate(item.first_air_date)}`} />
            </CardContent>
          </>
        )}
        data={tvQueries.pages}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </TVShowsWithSidebar>
  );
}
