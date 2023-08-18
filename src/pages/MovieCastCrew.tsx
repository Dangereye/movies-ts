// React
import { useEffect, useState } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Section from '../components/sections/Section';
import Cards from '../components/cards/Cards';

// Data
import { moviePages } from '../data/moviePages';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ICrew } from '../interfaces/ICrew';
import { IMovieFull } from '../interfaces/IMovieFull';

export default function MovieCastCrew() {
  const { movieId } = useParams();
  const [art, setArt] = useState<ICrew[]>([]);
  const [camera, setCamera] = useState<ICrew[]>([]);
  const [costume, setCostume] = useState<ICrew[]>([]);
  const [crew, setCrew] = useState<ICrew[]>([]);
  const [directing, setDirecting] = useState<ICrew[]>([]);
  const [editing, setEditing] = useState<ICrew[]>([]);
  const [production, setProduction] = useState<ICrew[]>([]);
  const [sound, setSound] = useState<ICrew[]>([]);
  const [visualEffects, setVisualEffects] = useState<ICrew[]>([]);
  const [writing, setWriting] = useState<ICrew[]>([]);

  const { data, isError, isLoading } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=credits`
  );

  useEffect(() => {
    if (data) {
      let art: ICrew[] = [];
      let camera: ICrew[] = [];
      let costume: ICrew[] = [];
      let crew: ICrew[] = [];
      let directing: ICrew[] = [];
      let editing: ICrew[] = [];
      let production: ICrew[] = [];
      let sound: ICrew[] = [];
      let visualEffects: ICrew[] = [];
      let writing: ICrew[] = [];

      data.credits?.crew?.forEach((item) => {
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
        <SubNavbar navigation={moviePages} />
        <LoaderComponent variant='header-min' />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar navigation={moviePages} />
        <ErrorComponent variant='section' />
      </>
    );
  }

  return (
    <>
      <SubNavbar navigation={moviePages} />
      <Header
        variant='header__min'
        leadTitle={`${data?.title}`}
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
            profile_sizes='h632'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
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
            profile_sizes='h632'
            getBodyText={(item) => item.job}
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          />
        </Main>
      </Section>
    </>
  );
}
