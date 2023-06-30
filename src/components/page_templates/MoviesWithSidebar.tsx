// Data
import { moviePages } from '../../data/moviePages';

// Components
import Article from '../articles/Article';
import Container from '../container/Container';
import Header from '../header/Header';
import Layout from '../layout/Layout';
import Main from '../main/Main';
import Navigation from '../navigation/Navigation';
import Sidebar from '../sidebar/Sidebar';
import SubNavbar from '../sub_navbar/SubNavbar';

type MoviesWithSidebarProps = {
  title: string;
  name: string;
  children: React.ReactNode;
};

export default function MoviesWithSidebar({
  title,
  name,
  children,
}: MoviesWithSidebarProps) {
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
      <Header variant='header__min' title={title} />
      <Main>
        <Article name={name}>
          <Container>
            <Layout variant='grid grid--sidebar'>
              <Sidebar />
              <Main>
                <>{children}</>
              </Main>
            </Layout>
          </Container>
        </Article>
      </Main>
    </>
  );
}
