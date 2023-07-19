// React
import { useContext, useEffect } from 'react';

// Contexts
import { ImagesFiltersContext } from '../contexts/ImagesFiltersContext';

// Interfaces
import { IImages } from '../interfaces/IImages';

export default function useCreateImages(
  data:
    | {
        posters: IImages[];
        backdrops: IImages[];
        logos: IImages[];
      }
    | undefined
) {
  const { state, dispatch } = useContext(ImagesFiltersContext);

  useEffect(() => {
    if (data) {
      let posters: { [key: string]: IImages[] } = {};
      let backdrops: { [key: string]: IImages[] } = {};

      data.posters.forEach((img) => {
        if (posters[img.iso_639_1]) {
          posters[img.iso_639_1].push(img);
        } else {
          posters = { ...posters, [img.iso_639_1]: [img] };
        }
      });

      data.backdrops.forEach((img) => {
        if (backdrops[img.iso_639_1]) {
          backdrops[img.iso_639_1].push(img);
        } else {
          backdrops = { ...backdrops, [img.iso_639_1]: [img] };
        }
      });

      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          display: {
            ...state.display,
            results: {
              ...state.display.results,
              posters: data.posters.length,
              backdrops: data.backdrops.length,
            },
          },
          languages: {
            ...state.languages,
            posters,
            backdrops,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {};
}
