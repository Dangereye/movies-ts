// React
import { useContext } from 'react';

// Context
import { ImagesFiltersContext } from '../../contexts/ImagesFiltersContext';

// Hooks
import useCreateLanguages from '../../hooks/useCreateLanguages';

// Components
import SidebarSection from './sections/SidebarSection';
import Selector from './selectors/Selector';

export default function ImagesSidebar() {
  const { state, dispatch } = useContext(ImagesFiltersContext);
  const languages = useCreateLanguages();

  const toggleMediaType = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        display: { ...state.display, expanded: !state.display.expanded },
      },
    });
  };

  const setMediaType = (value: 'posters' | 'backdrops') => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        display: { ...state.display, show_media_type: value },
      },
    });
  };

  const toggleLanguages = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        languages: { ...state.languages, expanded: !state.languages.expanded },
      },
    });
  };

  const setActiveLanguage = (value: string) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        languages: { ...state.languages, active_language: value },
      },
    });
  };
  return (
    <>
      <SidebarSection
        expanded={state.display.expanded}
        heading='Display'
        dispatch={toggleMediaType}
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
      </SidebarSection>
      <SidebarSection
        expanded={state.languages.expanded}
        heading='Languages'
        dispatch={toggleLanguages}
      >
        {languages
          .sort((a, b) => {
            if (a.english_name > b.english_name) {
              return 1;
            }
            if (a.english_name < b.english_name) {
              return -1;
            }
            return 0;
          })
          .map((lang) => {
            if (
              state.languages.posters[lang.iso_639_1] &&
              state.display.show_media_type === 'posters'
            ) {
              return (
                <Selector
                  key={lang.iso_639_1}
                  active={state.languages.active_language === lang.iso_639_1}
                  name={lang.english_name}
                  value={state?.languages?.posters[lang.iso_639_1]?.length}
                  onClick={() => setActiveLanguage(lang.iso_639_1)}
                />
              );
            }
            if (
              state.languages.backdrops[lang.iso_639_1] &&
              state.display.show_media_type === 'backdrops'
            ) {
              return (
                <Selector
                  key={lang.iso_639_1}
                  active={state.languages.active_language === lang.iso_639_1}
                  name={lang.english_name}
                  value={state?.languages?.backdrops[lang.iso_639_1]?.length}
                  onClick={() => setActiveLanguage(lang.iso_639_1)}
                />
              );
            }
            return null;
          })}
        {state.display.show_media_type === 'posters' &&
          state.languages.posters['null'] && (
            <Selector
              active={state.languages.active_language === 'null'}
              name='No Language'
              value={state?.languages?.posters['null']?.length}
              onClick={() => setActiveLanguage('null')}
            />
          )}
        {state.display.show_media_type === 'backdrops' &&
          state.languages.backdrops['null'] && (
            <Selector
              active={state.languages.active_language === 'null'}
              name='No Language'
              value={state?.languages?.backdrops['null']?.length}
              onClick={() => setActiveLanguage('null')}
            />
          )}
      </SidebarSection>
    </>
  );
}
