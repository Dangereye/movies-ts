// Data
import { tvPages } from '../../data/tvPages';

// Components
import Article from '../articles/Article';
import Container from '../container/Container';
import Header from '../header/Header';
import Layout from '../layout/Layout';
import Main from '../main/Main';
import Navigation from '../navigation/Navigation';
import Sidebar from '../sidebar/Sidebar';
import SubNavbar from '../sub_navbar/SubNavbar';

type TVShowsWithSidebarProps = {
  title: string;
  name: string;
  children: React.ReactNode;
};

export default function TVShowsWithSidebar({
  title,
  name,
  children,
}: TVShowsWithSidebarProps) {
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
      <Header variant='header__min' title={title} />
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
    </>
  );
}
