import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Article from '../components/articles/Article';
import ArticlePeople from '../components/articles/ArticlePeople';
import CardContent from '../components/cards/card/CardContent';
import Cards from '../components/cards/Cards';
import Container from '../components/container/Container';
import ImageComponent from '../components/image/Image';
import Navigation from '../components/navigation/Navigation';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import H1 from '../components/typography/H1';
import H2 from '../components/typography/H2';

// Data
import { moviePages } from '../data/moviePages';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ICrew } from '../interfaces/ICrew';
import { IMovieFull } from '../interfaces/IMovieFull';

export default function MovieCastCrew() {
  const { movieId } = useParams();
  const [art, setArt] = useState<ICrew[] | []>([]);
  const [camera, setCamera] = useState<ICrew[] | []>([]);
  const [costume, setCostume] = useState<ICrew[] | []>([]);
  const [crew, setCrew] = useState<ICrew[] | []>([]);
  const [directing, setDirecting] = useState<ICrew[] | []>([]);
  const [editing, setEditing] = useState<ICrew[] | []>([]);
  const [production, setProduction] = useState<ICrew[] | []>([]);
  const [sound, setSound] = useState<ICrew[] | []>([]);
  const [visualEffects, setVisualEffects] = useState<ICrew[] | []>([]);
  const [writing, setWriting] = useState<ICrew[] | []>([]);

  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates,credits,videos,external_ids,recommendations,similar,reviews`
  );

  useEffect(() => {
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

    if (movie?.credits?.crew?.length) {
      movie.credits.crew.map((item) => {
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
  }, [movie]);

  if (isLoading) {
    return <H2 heading='Loading' />;
  }

  if (isError) {
    return <H2 heading='Error' />;
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={moviePages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <header className='header'>
        <Container>
          <H1 heading='Cast & crew' />
        </Container>
      </header>
      <ArticlePeople
        variant='list'
        name='cast'
        heading='cast'
        data={movie?.credits?.cast}
        character
      />
      <ArticlePeople
        variant='list'
        name='art-crew'
        heading='Art'
        data={art}
        crew
      />
      <ArticlePeople
        variant='list'
        name='camera-crew'
        heading='camera'
        data={camera}
        crew
      />
      <ArticlePeople
        variant='list'
        name='costume-and-make-up-crew'
        heading='costume & make-up'
        data={costume}
        crew
      />
      <ArticlePeople
        variant='list'
        name='crew'
        heading='crew'
        data={crew}
        crew
      />
      <ArticlePeople
        variant='list'
        name='directing-crew'
        heading='directing'
        data={directing}
        crew
      />
      <ArticlePeople
        variant='list'
        name='editing-crew'
        heading='editing'
        data={editing}
        crew
      />
      <ArticlePeople
        variant='list'
        name='production-crew'
        heading='production'
        data={production}
        crew
      />
      <ArticlePeople
        variant='list'
        name='sound-crew'
        heading='sound'
        data={sound}
        crew
      />
      <ArticlePeople
        variant='list'
        name='visual-effects-crew'
        heading='visual effects'
        data={visualEffects}
        crew
      />
      <ArticlePeople
        variant='list'
        name='writing-crew'
        heading='writing'
        data={writing}
        crew
      />
    </>
  );
}
