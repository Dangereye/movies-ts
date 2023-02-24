import { ReactNode } from "react";
import BodyText from "../../typography/BodyText";
import HDiv from "../../typography/HDiv";
import VoteCountPercentage from "../../vote_count_percentage/VoteCountPercentage";

type CardContentProps = {
  vote?: number;
  heading: string;
  body?: string | undefined;
  children?: ReactNode;
};

export default function CardContent({
  vote,
  heading,
  body,
  children,
}: CardContentProps) {
  return (
    <div className="content">
      <VoteCountPercentage vote={vote} />
      <HDiv heading={heading} variant="heading--h4" />
      {children}
    </div>
  );
}
