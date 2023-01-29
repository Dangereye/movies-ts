import { useState, createContext, ReactNode } from "react";

const initial = {
  playerIsOpen: false,
  key: "",
};

export const VideoContext = createContext({});

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
