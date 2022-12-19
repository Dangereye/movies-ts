import Layout from "../components/layout/Layout";
import Article from "../components/article/Article";
import Container from "../components/container/Container";
import H2 from "../components/typography/H2";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";

export default function LandingPage() {
  return (
    <>
      <Article>
        <Container>
          <H2 />
          <Layout variant="grid grid--sidebar">
            <Sidebar>
              <H2 />
            </Sidebar>
            <Main>
              <H2 />
            </Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
