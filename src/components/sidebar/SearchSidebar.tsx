import { useContext } from 'react';

// Context
import { AppContext } from '../../contexts/AppContext';
import { SearchFiltersContext } from '../../contexts/SearchFiltersContext';

// Components
import ToggleButton from '../buttons/ToggleButton';
import Selector from './selectors/Selector';
import Section from './sections/Section';

export default function SearchSidebar() {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
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
    appDispatch({
      type: 'UPDATE_APP',
      payload: {
        ...appState,
        adult: { ...appState.adult, expanded: !appState.adult.expanded },
      },
    });
  };

  const handleAdult = (e: React.MouseEvent<HTMLDivElement>) => {
    appDispatch({
      type: 'UPDATE_APP',
      payload: {
        ...appState,
        adult: { ...appState.adult, active: !appState.adult.active },
      },
    });
  };

  return (
    <>
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
        expanded={appState.adult.expanded}
        dispatch={handleToggleAdultSection}
      >
        <ToggleButton
          active={appState.adult.active}
          name={appState.adult.active ? 'Visible' : 'Hidden'}
          onClick={handleAdult}
        />
      </Section>
    </>
  );
}
