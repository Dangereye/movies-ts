// Components
import Article from '../articles/Article';
import Button from '../buttons/Button';
import Container from '../container/Container';
import Header from '../header/Header';
import Layout from '../layout/Layout';
import Main from '../main/Main';
import Navigation from '../navigation/Navigation';
import Section from '../sections/Section';
import Sidebar from '../sidebar/Sidebar';
import MobileSidebarControls from '../sidebar/mobile_sidebar_controls/MobileSidebarControls';
import SubNavbar from '../sub_navbar/SubNavbar';

type PageWithSidebarProps = {
  navigation: { name: string; link: string }[];
  leadTitle?: string;
  title: string;
  name: string;
  children: React.ReactNode;
};

export default function PageWithSidebar({
  navigation = [],
  leadTitle,
  title,
  name,
  children,
}: PageWithSidebarProps) {
  return (
    <>
      <SubNavbar navigation={navigation} />
      <Header variant='header__min' leadTitle={leadTitle} title={title} />
      <Section>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>
              <Article name={name}>
                <Container>
                  <>
                    <MobileSidebarControls />
                    {children}
                  </>
                </Container>
              </Article>
            </Main>
          </Layout>
        </Container>
      </Section>
    </>
  );
}
