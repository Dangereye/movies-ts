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
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';

// Template
import Page from '../components/page_templates/Page';

// Data
import { peoplePages } from '../data/peoplePages';

export default function PeoplePopular() {
  const getNextPageParam = (page: IPage<IPerson>) =>
    page.page < page.total_pages ? page.page + 1 : null;

  const leadTitle = 'People';
  const title = 'Popular';
  const name = 'people-popular';

  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useMakeInfiniteQuery<IPage<IPerson>>(
      'person/popular',
      '',
      getNextPageParam
    );

  if (isLoading) {
    return (
      <Page
        navigation={peoplePages}
        leadTitle={leadTitle}
        title={title}
        name={name}
      >
        <LoaderComponent />
      </Page>
    );
  }

  if (isError) {
    return (
      <Page
        navigation={peoplePages}
        leadTitle={leadTitle}
        title={title}
        name='article__error'
      >
        <ErrorComponent />
      </Page>
    );
  }

  return (
    <Page
      navigation={peoplePages}
      leadTitle={leadTitle}
      title={title}
      name={name}
    >
      <InfiniteCards
        getId={(item) => item.id}
        getLink={(item) => `/people/${item.id}`}
        renderContent={(item) => (
          <>
            <ImageComponent
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                  : '/images/error_500x750.webp'
              }
              fallback='/images/error_500x750.webp'
              alt={item.name}
            />
            <CardContent heading={item.name}>
              <BodyText text={item.known_for_department} />
            </CardContent>
          </>
        )}
        data={data.pages}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Page>
  );
}
