// Components
import Article from '../articles/Article';
import Container from '../container/Container';
import Header from '../header/Header';
import Main from '../main/Main';
import Navigation from '../navigation/Navigation';
import Section from '../sections/Section';
import SubNavbar from '../sub_navbar/SubNavbar';

type PageProps = {
  navigation: { name: string; link: string }[] | undefined;
  leadTitle?: string;
  title: string;
  name: string;
  children: React.ReactNode;
};

export default function Page({
  navigation,
  leadTitle,
  title,
  name,
  children,
}: PageProps) {
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
      <Header variant='header__min' leadTitle={leadTitle} title={title} />
      <Section>
        <Main>
          <Article name={name}>
            <Container>
              <>{children}</>
            </Container>
          </Article>
        </Main>
      </Section>
    </>
  );
}
