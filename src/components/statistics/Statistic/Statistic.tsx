import BodyText from '../../typography/BodyText';
import HDiv from '../../typography/HDiv';

type StatisticProps = {
  heading: string | number;
  text: string | undefined | null;
};

export default function Statistic({ heading, text }: StatisticProps) {
  if (heading && text) {
    return (
      <div className='statistic'>
        <HDiv variant='heading--h3' heading={heading} />
        <BodyText text={text} />
      </div>
    );
  }
  return null;
}
