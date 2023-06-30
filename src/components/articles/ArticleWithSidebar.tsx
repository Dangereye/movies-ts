// Components
import Article from '../articles/Article';
import Container from '../container/Container';
import Header from '../header/Header';
import Layout from '../layout/Layout';
import Main from '../main/Main';
import Navigation from '../navigation/Navigation';
import Sidebar from '../sidebar/Sidebar';
import SubNavbar from '../sub_navbar/SubNavbar';

type ArticleWithSidebarProps = {
  navigation: { name: string; link: string }[] | undefined;
  title: string;
  name: string;
  children: React.ReactNode;
};

export default function ArticleWithSidebar({
  navigation,
  title,
  name,
  children,
}: ArticleWithSidebarProps) {
  return (
    <>
      <SubNavbar>
        <Navigation
          data={navigation}
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
