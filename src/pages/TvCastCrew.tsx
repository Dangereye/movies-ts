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
import Navigation from '../components/navigation/Navigation';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Main from '../components/main/Main';
import Container from '../components/container/Container';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Header from '../components/header/Header';
import ArticlePeople from '../components/articles/ArticlePeople';
import Section from '../components/sections/Section';

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
        <SubNavbar>
          <Navigation
            data={tvPages}
            getId={(item) => item.name}
            getLink={(item) => item.link}
            renderItem={(item) => item.name}
            variant='horizontal'
          />
        </SubNavbar>
        <LoaderComponent variant='header-min' />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar>
          <Navigation
            data={tvPages}
            getId={(item) => item.name}
            getLink={(item) => item.link}
            renderItem={(item) => item.name}
            variant='horizontal'
          />
        </SubNavbar>
        <Section>
          <Main>
            <Container>
              <ErrorComponent />
            </Container>
          </Main>
        </Section>
      </>
    );
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={tvPages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header
        variant='header__min'
        leadTitle={`${data?.name}`}
        title='cast & crew'
      />
      <Section>
        <Main>
          <ArticlePeople
            variant='list'
            name='cast'
            heading='cast'
            data={data?.aggregate_credits?.cast}
            character
            sort={(a, b) => b.total_episode_count - a.total_episode_count}
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
        </Main>
      </Section>
    </>
  );
}
