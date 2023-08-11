// Components
import Article from '../articles/Article';
import Container from '../container/Container';
import Header from '../header/Header';
import Layout from '../layout/Layout';
import Main from '../main/Main';
import Section from '../sections/Section';
import Sidebar from '../sidebar/Sidebar';
import MobileSidebarFiltersButtons from '../sidebar/mobile_sidebar_filters_buttons/MobileSidebarFiltersButtons';
import SubNavbar from '../sub_navbar/SubNavbar';

type PageWithSidebarProps = {
  navigation: { name: string; link: string }[];
  leadTitle?: string | undefined;
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
                    <MobileSidebarFiltersButtons />
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
