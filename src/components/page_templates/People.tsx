// Data
import { peoplePages } from '../../data/peoplePages';

// Components
import Article from '../articles/Article';
import Container from '../container/Container';
import Header from '../header/Header';
import Main from '../main/Main';
import Navigation from '../navigation/Navigation';
import SubNavbar from '../sub_navbar/SubNavbar';

type PeopleProps = {
  title: string;
  name: string;
  children: React.ReactNode;
};

export default function People({ title, name, children }: PeopleProps) {
  return (
    <>
      <SubNavbar>
        <Navigation
          data={peoplePages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header variant='header__min' title='Popular people' />
      <Main>
        <Article name='popular-people'>
          <Container>
            <>{children}</>
          </Container>
        </Article>
      </Main>
    </>
  );
}
