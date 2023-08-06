// React
import { useEffect, useState } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ISeason } from '../interfaces/ISeason';
import { IAggregateCrew } from '../interfaces/IAggregateCrew';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';

// Data
import { tvPages } from '../data/tvPages';
import Header from '../components/header/Header';
import Section from '../components/sections/Section';
import Main from '../components/main/Main';
import Cards from '../components/cards/Cards';
import { formatEpisodeCount } from '../utilities/formatEpisodeCount';

export default function TvSeasonCastCrew() {
  const { tvId, seasonId } = useParams();

  const [art, setArt] = useState<IAggregateCrew[]>([]);
  const [camera, setCamera] = useState<IAggregateCrew[]>([]);
  const [costume, setCostume] = useState<IAggregateCrew[]>([]);
  const [crew, setCrew] = useState<IAggregateCrew[]>([]);
  const [directing, setDirecting] = useState<IAggregateCrew[]>([]);
  const [editing, setEditing] = useState<IAggregateCrew[]>([]);
  const [production, setProduction] = useState<IAggregateCrew[]>([]);
  const [sound, setSound] = useState<IAggregateCrew[]>([]);
  const [visualEffects, setVisualEffects] = useState<IAggregateCrew[]>([]);
  const [writing, setWriting] = useState<IAggregateCrew[]>([]);

  const { data, isError, isLoading } = useMakeQuery<ISeason>(
    `season-${tvId}-${seasonId}`,
    `tv/${tvId}/season/${seasonId}`,
    `&append_to_response=aggregate_credits`
  );

  useEffect(() => {
    let art: IAggregateCrew[] = [];
    let camera: IAggregateCrew[] = [];
    let costume: IAggregateCrew[] = [];
    let crew: IAggregateCrew[] = [];
    let directing: IAggregateCrew[] = [];
    let editing: IAggregateCrew[] = [];
    let production: IAggregateCrew[] = [];
    let sound: IAggregateCrew[] = [];
    let visualEffects: IAggregateCrew[] = [];
    let writing: IAggregateCrew[] = [];

    if (data?.aggregate_credits?.crew?.length) {
      data.aggregate_credits.crew.map((item) => {
        if (item.department.toLowerCase() === 'art') {
          art = [...art, { ...item }];
        }
        if (item.department.toLowerCase() === 'camera') {
          camera = [...camera, { ...item }];
        }
        if (item.department.toLowerCase() === 'costume & make-up') {
          costume = [...costume, { ...item }];
        }
        if (item.department.toLowerCase() === 'crew') {
          crew = [...crew, { ...item }];
        }
        if (item.department.toLowerCase() === 'directing') {
          directing = [...directing, { ...item }];
        }
        if (item.department.toLowerCase() === 'editing') {
          editing = [...editing, { ...item }];
        }
        if (item.department.toLowerCase() === 'production') {
          production = [...production, { ...item }];
        }
        if (item.department.toLowerCase() === 'sound') {
          sound = [...sound, { ...item }];
        }
        if (item.department.toLowerCase() === 'visual effects') {
          visualEffects = [...visualEffects, { ...item }];
        }
        if (item.department.toLowerCase() === 'writing') {
          writing = [...writing, { ...item }];
        }
      });
      setArt(art);
      setCamera(camera);
      setCostume(costume);
      setCrew(crew);
      setDirecting(directing);
      setEditing(editing);
      setProduction(production);
      setSound(sound);
      setVisualEffects(visualEffects);
      setWriting(writing);
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <SubNavbar navigation={tvPages} />
        <LoaderComponent variant='header-full' />
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
            getBodyText={(item) => item.roles[0].character}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
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
            getJobs={(item) => item.jobs}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
        </Main>
      </Section>
    </>
  );
}
