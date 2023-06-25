// Interfaces
import { IPage } from '../interfaces/IPage';
import { IPerson } from '../interfaces/IPerson';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';

// Components
import CardContent from '../components/cards/card/CardContent';
import ImageComponent from '../components/image/Image';
import BodyText from '../components/typography/BodyText';
import InfiniteCards from '../components/cards/InifinteCards';
import Loader from '../components/loader/Loader';
import People from '../components/page_templates/People';

export default function PeoplePopular() {
  const getNextPageParam = (page: IPage<IPerson>) => page.page + 1;
  const title = 'People: popular';
  const name = 'people-popular';

  const {
    data: movieQueries,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<IPerson>>(
    'person/popular',
    '',
    getNextPageParam
  );

  if (isLoading) {
    return (
      <People title={title} name={name}>
        <Loader />
      </People>
    );
  }

  if (isError) {
    return (
      <People title={title} name={name}>
        <BodyText text='Oops! Something went wrong.' />
      </People>
    );
  }

  return (
    <People title={title} name={name}>
      <InfiniteCards
        getId={(item) => item.id}
        getLink={(item) => `/people/${item.id}`}
        renderContent={(item) => (
          <>
            <ImageComponent
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
              fallback='/images/error_500x750.webp'
              alt={item.name}
            />
            <CardContent heading={item.name}>
              <BodyText text={item.known_for_department} />
            </CardContent>
          </>
        )}
        data={movieQueries.pages}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </People>
  );
}
