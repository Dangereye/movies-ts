import { useContext } from 'react';
import { ImagesFiltersContext } from '../../contexts/ImagesFiltersContext';
import useCreateCountries from '../../hooks/useCreateCountries';
import SidebarSection from './sections/SidebarSection';
import Selector from './selectors/Selector';

export default function ImagesSidebar() {
  const { state, dispatch } = useContext(ImagesFiltersContext);
  const countries = useCreateCountries();

  const setMediaType = (value: 'posters' | 'backdrops' | 'logos') => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        display: { ...state.display, show_media_type: value },
      },
    });
  };
  return (
    <>
      <SidebarSection
        expanded={state.display.expanded}
        heading='Display'
        dispatch={() => {}}
      >
        <Selector
          active={state.display.show_media_type === 'posters'}
          name='Posters'
          value={state.display.results.posters}
          onClick={() => setMediaType('posters')}
        />
        <Selector
          active={state.display.show_media_type === 'backdrops'}
          name='Backdrops'
          value={state.display.results.backdrops}
          onClick={() => setMediaType('backdrops')}
        />
        <Selector
          active={state.display.show_media_type === 'logos'}
          name='Logos'
          value={state.display.results.logos}
          onClick={() => setMediaType('logos')}
        />
      </SidebarSection>
      <SidebarSection expanded={true} heading='Regions' dispatch={() => {}}>
        test
      </SidebarSection>
    </>
  );
}
