// React
import { ReactNode } from 'react';

// Components
import HDiv from '../../typography/HDiv';
import VoteCountPercentage from '../../vote_count_percentage/VoteCountPercentage';

type CardContentProps = {
  vote?: number | null;
  heading: string;
  children?: ReactNode;
};

export default function CardContent({
  vote,
  heading,
  children,
}: CardContentProps) {
  return (
    <div className='content'>
      <VoteCountPercentage vote={vote} />
      <HDiv heading={heading} variant='heading--h4' />
      {children}
    </div>
  );
}
