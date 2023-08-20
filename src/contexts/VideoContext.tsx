import { useState, createContext, ReactNode } from 'react';

const initial = {
  isOpen: false,
  key: '',
};

type VideoContextType = {
  videoPlayer: {
    isOpen: boolean;
    key: string;
  };
  setVideoPlayer: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      key: string;
    }>
  >;
};

export const VideoContext = createContext({} as VideoContextType);

type VideoContextProps = {
  children: ReactNode;
};

export default function VideoContextComponent({ children }: VideoContextProps) {
  const [videoPlayer, setVideoPlayer] = useState(initial);
  return (
    <VideoContext.Provider value={{ videoPlayer, setVideoPlayer }}>
      {children}
    </VideoContext.Provider>
  );
}
