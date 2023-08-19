// React router
import { useParams } from 'react-router-dom';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';
import useAggregateCrew from '../hooks/useAggregateCrew';

// Interfaces
import { ITVShowFull } from '../interfaces/ITVShowFull';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Main from '../components/main/Main';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Header from '../components/header/Header';
import Section from '../components/sections/Section';
import Cards from '../components/cards/Cards';

// Data
import { tvPages } from '../data/tvPages';

// Utilities
import { formatEpisodeCount } from '../utilities/formatEpisodeCount';

export default function TvCastCrew() {
  const { tvId } = useParams();

  const { data, isError, isLoading } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=aggregate_credits`
  );

  const {
    art,
    camera,
    costume,
    crew,
    directing,
    editing,
    production,
    sound,
    visualEffects,
    writing,
  } = useAggregateCrew(data?.aggregate_credits?.crew);

  if (isLoading) {
    return (
      <>
        <SubNavbar navigation={tvPages} />
        <LoaderComponent variant='header-min' />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar navigation={tvPages} />
        <ErrorComponent variant='section' />
      </>
    );
  }

  return (
    <>
      <SubNavbar navigation={tvPages} />
      <Header
        variant='header__min'
        leadTitle={`${data?.name}`}
        title='cast & crew'
      />
      <Section>
        <Main>
          <Cards
            article
            heading='cast'
            media_type='people'
            variant='list'
            data={data?.aggregate_credits?.cast}
            getId={(item) => item.id}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getRoles={(item) => item.roles}
            getSmallText={(item) =>
              formatEpisodeCount(item.total_episode_count)
            }
            sortItems={(a, b) => b.total_episode_count - a.total_episode_count}
          />
          <Cards
            article
            heading='art'
            media_type='people'
            variant='list'
            data={art}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='camera crew'
            media_type='people'
            variant='list'
            data={camera}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='costume & make-up'
            media_type='people'
            variant='list'
            data={costume}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='crew'
            media_type='people'
            variant='list'
            data={crew}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='directing'
            media_type='people'
            variant='list'
            data={directing}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='editing'
            media_type='people'
            variant='list'
            data={editing}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='production'
            media_type='people'
            variant='list'
            data={production}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='sound'
            media_type='people'
            variant='list'
            data={sound}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='visual effects'
            media_type='people'
            variant='list'
            data={visualEffects}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
          <Cards
            article
            heading='writing'
            media_type='people'
            variant='list'
            data={writing}
            getId={(item) => `${item.department}-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
        </Main>
      </Section>
    </>
  );
}
