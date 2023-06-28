import { useContext } from 'react';

// Context
import { SearchFiltersContext } from '../../contexts/SearchFiltersContext';

// Components
import ToggleButton from '../buttons/ToggleButton';
import Selector from './selectors/Selector';
import Section from './sections/Section';

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
          <Selector
            active={state.display.show_media_type === 'movies'}
            name='Movies'
            value={state.display.results.movies}
            onClick={() => handleSetMediaType('movies')}
          />
          <Selector
            active={state.display.show_media_type === 'tv-shows'}
            name='Tv Shows'
            value={state.display.results.tv_shows}
            onClick={() => handleSetMediaType('tv-shows')}
          />
          <Selector
            active={state.display.show_media_type === 'people'}
            name='People'
            value={state.display.results.people}
            onClick={() => handleSetMediaType('people')}
          />
        </Section>

        <Section
          heading='Adult content'
          expanded={state.adult.expanded}
          dispatch={handleToggleAdultSection}
        >
          <ToggleButton
            active={state.adult.active}
            name={state.adult.active ? 'Visible' : 'Hidden'}
            onClick={handleAdult}
          />
        </Section>
      </div>
    </aside>
  );
}
