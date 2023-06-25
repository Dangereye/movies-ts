import { tvPages } from '../../data/tvPages';
import { formatDate } from '../../utilities/formatDate';
import Article from '../articles/Article';
import InfiniteCards from '../cards/InifinteCards';
import CardContent from '../cards/card/CardContent';
import Container from '../container/Container';
import Header from '../header/Header';
import ImageComponent from '../image/Image';
import Layout from '../layout/Layout';
import Main from '../main/Main';
import Navigation from '../navigation/Navigation';
import Sidebar from '../sidebar/Sidebar';
import MobileSidebarControls from '../sidebar/mobile_sidebar_controls/MobileSidebarControls';
import SubNavbar from '../sub_navbar/SubNavbar';
import BodyText from '../typography/BodyText';

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
