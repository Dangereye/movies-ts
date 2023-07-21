// Icons
import { ImSpinner2 } from 'react-icons/im';

// Components
import Section from '../sections/Section';
import Container from '../container/Container';
import Main from '../main/Main';
import Article from '../articles/Article';

type LoaderComponentProps = {
  variant?: 'header-full' | 'header-min' | 'section' | 'cards';
  count?: number;
};

export default function LoaderComponent({
  variant = 'cards',
  count = 14,
}: LoaderComponentProps) {
  const skeletons: number[] = [];

  for (let i = 0; i < count; i++) {
    skeletons.push(i);
  }

  const content = (
    <Article name='loading'>
      <div className='loader'>
        <div className='loader__skeletons'>
          {skeletons.map((skeleton, i) => (
            <div className='loader__skeleton' key={`skeleton-${i}`}>
              <div className='loader__spinner'>
                <ImSpinner2 />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Article>
  );

  if (variant === 'header-full' || variant === 'header-min') {
    return (
      <>
        <div className={`loader__${variant}`}>
          <div className='loader__spinner'>
            <ImSpinner2 />
          </div>
        </div>
        <Section>
          <Container>
            <Main>{content}</Main>
          </Container>
        </Section>
      </>
    );
  }

  if (variant === 'section') {
    return (
      <Section>
        <Container>
          <Main>{content}</Main>
        </Container>
      </Section>
    );
  }

  return content;
}
