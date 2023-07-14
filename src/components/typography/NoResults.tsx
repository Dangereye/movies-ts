// Components
import BodyText from './BodyText';

type NoResultsProps = {
  media?: 'movies' | 'Tv shows' | 'people' | 'items' | 'posters' | 'backdrops';
  text?: string;
};

export default function NoResults({
  media = 'items',
  text = `Sorry, we found no ${media} that match your query.`,
}: NoResultsProps) {
  return <BodyText text={text} />;
}
