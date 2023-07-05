// Components
import BodyText from './BodyText';

type NoResultsProps = {
  media: 'movies' | 'Tv shows' | 'people' | 'items';
};

export default function NoResults({ media }: NoResultsProps) {
  return (
    <BodyText text={`Sorry, we found no ${media} that match your query.`} />
  );
}
