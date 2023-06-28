import Section from './sections/Section';

export default function SearchSidebar() {
  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        <Section heading='Display' expanded={true} dispatch={() => {}}>
          test
        </Section>
      </div>
    </aside>
  );
}
