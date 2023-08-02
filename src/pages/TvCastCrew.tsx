// React
import { useState, useEffect } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ITVShowFull } from '../interfaces/ITVShowFull';
import { IAggregateCrew } from '../interfaces/IAggregateCrew';

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

export default function TvCastCrew() {
  const { tvId } = useParams();
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
  const { data, isError, isLoading } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
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
            data={data?.credits.cast}
            getId={(item) => item.id}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.character}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='art'
            media_type='people'
            variant='list'
            data={art}
            getId={(item) => `art-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='camera crew'
            media_type='people'
            variant='list'
            data={camera}
            getId={(item) => `camera-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='costume & make-up'
            media_type='people'
            variant='list'
            data={costume}
            getId={(item) => `costume-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='crew'
            media_type='people'
            variant='list'
            data={crew}
            getId={(item) => `crew-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='directing'
            media_type='people'
            variant='list'
            data={directing}
            getId={(item) => `directing-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='editing'
            media_type='people'
            variant='list'
            data={editing}
            getId={(item) => `editing-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='production'
            media_type='people'
            variant='list'
            data={production}
            getId={(item) => `production-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='sound'
            media_type='people'
            variant='list'
            data={sound}
            getId={(item) => `sound-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='visual effects'
            media_type='people'
            variant='list'
            data={visualEffects}
            getId={(item) => `visual-effects-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='writing'
            media_type='people'
            variant='list'
            data={writing}
            getId={(item) => `writing-${item.id}`}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
        </Main>
      </Section>
    </>
  );
}
