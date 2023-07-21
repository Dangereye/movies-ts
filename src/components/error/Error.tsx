// React router
import { Link, useNavigate } from 'react-router-dom';

// Components
import H2 from '../typography/H2';
import Button from '../buttons/Button';
import BodyText from '../typography/BodyText';
import Article from '../articles/Article';
import Main from '../main/Main';
import Section from '../sections/Section';

type ErrorComponentProps = {
  heading?: string;
  text?: string;
};

export default function ErrorComponent({
  heading = 'Well, this is arkward!',
  text = "It looks like something went wrong. Don't worry though, these things happen from time to time. Have you tried going back to the previous page or the homepage? If that doesn't work, maybe try again later and see if the problem resolves itself.",
}: ErrorComponentProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return (
    <Section>
      <Main>
        <Article name='article__error'>
          <H2 heading={heading} />
          <BodyText text={text} />
          <div className='buttons'>
            <Button
              name='Go back'
              variant='btn--primary'
              onClick={handleClick}
            />
            <Link to='/' className='btn btn--tertiary'>
              Homepage
            </Link>
          </div>
        </Article>
      </Main>
    </Section>
  );
}
