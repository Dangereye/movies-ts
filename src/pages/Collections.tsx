import Article from '../components/articles/Article';
import Container from '../components/container/Container';
import BodyText from '../components/typography/BodyText';

export default function Collections() {
  return (
    <>
      <Article name='collections'>
        <Container>
          <BodyText text='Collections' />
        </Container>
      </Article>
    </>
  );
}
