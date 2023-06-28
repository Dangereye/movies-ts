import { useContext } from 'react';
import { SearchFiltersContext } from '../../contexts/SearchFiltersContext';
import Section from './sections/Section';
import BodyText from '../typography/BodyText';
import ToggleButton from '../buttons/ToggleButton';

export default function SearchSidebar() {
  const { state, dispatch } = useContext(SearchFiltersContext);

  const handleToggleDisplay = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        display: { ...state.display, expanded: !state.display.expanded },
      },
    });
  };

  const handleSetMediaType = (type: 'movies' | 'tv-shows' | 'people') => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        display: { ...state.display, show_media_type: type },
      },
    });
  };

  const handleToggleAdultSection = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        adult: { ...state.adult, expanded: !state.adult.expanded },
      },
    });
  };

  const handleAdult = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        adult: { ...state.adult, active: !state.adult.active },
      },
    });
  };

  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        <Section
          heading='Display'
          expanded={state.display.expanded}
          dispatch={handleToggleDisplay}
        >
          <div onClick={() => handleSetMediaType('movies')}>
            <BodyText text='Movies' />
            <BodyText text={state.display.results.movies} />
          </div>
          <div onClick={() => handleSetMediaType('tv-shows')}>
            <BodyText text='Tv Shows' />
            <BodyText text={state.display.results.tv_shows} />
          </div>
          <div onClick={() => handleSetMediaType('people')}>
            <BodyText text='People' />
            <BodyText text={state.display.results.people} />
          </div>
        </Section>

        <Section
          heading='Adult content'
          expanded={state.adult.expanded}
          dispatch={handleToggleAdultSection}
        >
          <div className='buttons'>
            <ToggleButton
              active={state.adult.active}
              name={state.adult.active ? 'Visible' : 'Hidden'}
              onClick={handleAdult}
            />
          </div>
        </Section>
      </div>
    </aside>
  );
}
