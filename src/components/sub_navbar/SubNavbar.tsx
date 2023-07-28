// React router
import { useNavigate } from 'react-router-dom';

// Icons
import { HiChevronLeft } from 'react-icons/hi';

// Components
import Container from '../container/Container';
import Button from '../buttons/Button';
import Navigation from '../navigation/Navigation';

type SubNavbarProps = {
  navigation: {
    name: string;
    link: string;
  }[];
};

export default function SubNavbar({ navigation = [] }: SubNavbarProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return (
    <div className='sub-navbar'>
      <Container>
        <Button
          variant='btn--secondary'
          name={<HiChevronLeft />}
          onClick={handleClick}
        />
        <Navigation
          data={navigation}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </Container>
    </div>
  );
}
