// Icons
import { ImSpinner2 } from 'react-icons/im';

// Components
import Section from '../sections/Section';
import Main from '../main/Main';
import Container from '../container/Container';
import Article from '../articles/Article';

type LoaderComponentProps = {
  variant?: 'cards' | 'header' | 'section';
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
          {skeletons.map((s) => (
            <div className='loader__skeleton'>
              <div className='loader__spinner'>
                <ImSpinner2 />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Article>
  );

  if (variant === 'header') {
    return (
      <>
        <div className='loader__header'>
          <div className='loader__spinner'>
            <ImSpinner2 />
          </div>
        </div>
        <Section>
          <Main>
            <Container>{content}</Container>
          </Main>
        </Section>
      </>
    );
  }

  if (variant === 'section') {
    return (
      <Section>
        <Main>
          <Container>{content}</Container>
        </Main>
      </Section>
    );
  }

  return content;
}
