import { useNavigate } from 'react-router-dom';
import H2 from '../typography/H2';
import Button from '../buttons/Button';
import BodyText from '../typography/BodyText';

type ErrorComponentProps = {
  heading?: string;
  text?: string;
};

export default function ErrorComponent({
  heading = 'Error',
  text = 'Oops! Something went wrong.',
}: ErrorComponentProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return (
    <>
      <H2 heading={heading} />
      <BodyText text={text} />
      <Button name='Go back' variant='btn--primary' onClick={handleClick} />
    </>
  );
}
