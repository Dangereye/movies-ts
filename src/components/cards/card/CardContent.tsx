import BodyText from "../../typography/BodyText";
import HDiv from "../../typography/HDiv";

type CardContentProps = {
  vote?: number;
  heading: string;
  body: string;
};

export default function CardContent({ vote, heading, body }: CardContentProps) {
  const formatAvgVotePercentage = (vote: number) => {
    return +vote.toFixed(1);
  };

  return (
    <div className="content">
      {vote && (
        <div className="vote-average">
          <svg>
            <circle cx="25" cy="25" r="20" />
            <circle
              cx="25"
              cy="25"
              r="20"
              style={{
                stroke:
                  vote > 7
                    ? "green"
                    : vote < 7 && vote > 5.1
                    ? "orange"
                    : "red",
                strokeDasharray: 123,
                strokeDashoffset:
                  123 - (123 * formatAvgVotePercentage(vote)) / 10,
              }}
            />
          </svg>
          <div className="number">{formatAvgVotePercentage(vote)}</div>
        </div>
      )}
      <HDiv heading={heading} variant="heading--h4" />
      <BodyText text={body} />
    </div>
  );
}
