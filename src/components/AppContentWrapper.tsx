// React
import { useLayoutEffect } from 'react';

// React router
import { useLocation } from 'react-router-dom';

type AppContentWrapperProps = {
  children: React.ReactNode;
};

export default function AppContentWrapper({
  children,
}: AppContentWrapperProps) {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <>{children}</>;
}
