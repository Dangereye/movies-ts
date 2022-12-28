import BodyText from "../../typography/BodyText";
import HDiv from "../../typography/HDiv";
import VoteCountPercentage from "../../vote_count_percentage/VoteCountPercentage";

type CardContentProps = {
  vote?: number;
  heading: string;
  body: string | undefined;
};

export default function CardContent({ vote, heading, body }: CardContentProps) {
  return (
    <div className="content">
      <VoteCountPercentage vote={vote} />
      <HDiv heading={heading} variant="heading--h4" />
      <BodyText text={body} />
    </div>
  );
}
