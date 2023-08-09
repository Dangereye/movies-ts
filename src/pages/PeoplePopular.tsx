// Interfaces
import { IPage } from '../interfaces/IPage';
import { IPerson } from '../interfaces/IPerson';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import CardsInfiniteScroll from '../components/cards/CardsInfiniteScroll';

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
        name='error'
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
      <CardsInfiniteScroll
        data={data.pages}
        getId={(item) => item.id}
        getLink={(item) => `/people/${item.id}`}
        getHeading={(item) => item.name}
        getImage={(item) => item.profile_path}
        getVotes={(item) => undefined}
        getBodyText={(item) => item.known_for_department}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Page>
  );
}
