import { useParams } from 'react-router-dom';
import Container from '../components/container/Container';
import Article from '../components/articles/Article';
import BodyText from '../components/typography/BodyText';
import useMakeQuery from '../hooks/useMakeQuery';
import H2 from '../components/typography/H2';

export default function Search() {
  const { searchId } = useParams();

  const { data, isError, isLoading } = useMakeQuery(
    `search-${searchId}`,
    `search/multi`,
    `&query=${searchId}`
  );

  if (isLoading) {
    return <H2 heading='Loading' />;
  }

  if (isError) {
    return <H2 heading='Error' />;
  }
  return (
    <Article name='Search-results'>
      <Container>
        <BodyText text={`search results for ${searchId}`} />
      </Container>
    </Article>
  );
}
