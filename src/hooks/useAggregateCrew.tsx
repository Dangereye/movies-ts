import { useState, useEffect } from 'react';
import { IAggregateCrew } from '../interfaces/IAggregateCrew';

export default function useAggregateCrew(data: IAggregateCrew[] | undefined) {
  const [art, setArt] = useState<IAggregateCrew[]>([]);
  const [camera, setCamera] = useState<IAggregateCrew[]>([]);
  const [costume, setCostume] = useState<IAggregateCrew[]>([]);
  const [crew, setCrew] = useState<IAggregateCrew[]>([]);
  const [directing, setDirecting] = useState<IAggregateCrew[]>([]);
  const [editing, setEditing] = useState<IAggregateCrew[]>([]);
  const [production, setProduction] = useState<IAggregateCrew[]>([]);
  const [sound, setSound] = useState<IAggregateCrew[]>([]);
  const [visualEffects, setVisualEffects] = useState<IAggregateCrew[]>([]);
  const [writing, setWriting] = useState<IAggregateCrew[]>([]);

  useEffect(() => {
    let art: IAggregateCrew[] = [];
    let camera: IAggregateCrew[] = [];
    let costume: IAggregateCrew[] = [];
    let crew: IAggregateCrew[] = [];
    let directing: IAggregateCrew[] = [];
    let editing: IAggregateCrew[] = [];
    let production: IAggregateCrew[] = [];
    let sound: IAggregateCrew[] = [];
    let visualEffects: IAggregateCrew[] = [];
    let writing: IAggregateCrew[] = [];

    if (data) {
      data.map((item) => {
        if (item.department.toLowerCase() === 'art') {
          art = [...art, { ...item }];
        }
        if (item.department.toLowerCase() === 'camera') {
          camera = [...camera, { ...item }];
        }
        if (item.department.toLowerCase() === 'costume & make-up') {
          costume = [...costume, { ...item }];
        }
        if (item.department.toLowerCase() === 'crew') {
          crew = [...crew, { ...item }];
        }
        if (item.department.toLowerCase() === 'directing') {
          directing = [...directing, { ...item }];
        }
        if (item.department.toLowerCase() === 'editing') {
          editing = [...editing, { ...item }];
        }
        if (item.department.toLowerCase() === 'production') {
          production = [...production, { ...item }];
        }
        if (item.department.toLowerCase() === 'sound') {
          sound = [...sound, { ...item }];
        }
        if (item.department.toLowerCase() === 'visual effects') {
          visualEffects = [...visualEffects, { ...item }];
        }
        if (item.department.toLowerCase() === 'writing') {
          writing = [...writing, { ...item }];
        }
      });
      setArt(art);
      setCamera(camera);
      setCostume(costume);
      setCrew(crew);
      setDirecting(directing);
      setEditing(editing);
      setProduction(production);
      setSound(sound);
      setVisualEffects(visualEffects);
      setWriting(writing);
    }
  }, [data]);

  return {
    art,
    camera,
    costume,
    crew,
    directing,
    editing,
    production,
    sound,
    visualEffects,
    writing,
  };
}
