// Components
import BodyText from '../typography/BodyText';
import CaptionText from '../typography/CaptionText';
import HDiv from '../typography/HDiv';
import Wrapper from '../wrapper/Wrapper';

type OverviewProps = {
  caption?: string | null | undefined;
  text: string | null | undefined;
};

export default function Overview({ caption, text }: OverviewProps) {
  return (
    <Wrapper name='overview'>
      <HDiv variant='heading--h4' heading='overview' />
      <CaptionText caption={caption} />
      {text ? (
        <BodyText text={text} />
      ) : (
        <BodyText text='Currently unavailable.' />
      )}
    </Wrapper>
  );
}
