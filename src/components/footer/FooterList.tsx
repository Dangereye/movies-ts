// Components
import Navigation from '../navigation/Navigation';
import HDiv from '../typography/HDiv';

type FooterListProps = {
  heading: string;
  navigation: {
    name: string;
    link: string;
  }[];
};

export default function FooterList({ heading, navigation }: FooterListProps) {
  return (
    <div>
      <HDiv heading={heading} variant='heading--h4' />
      <Navigation
        data={navigation}
        getId={(item) => item.name}
        getLink={(item) => item.link}
        renderItem={(item) => item.name}
        variant='vertical'
      />
    </div>
  );
}
