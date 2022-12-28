type VoteCountPercentageProps = {
  vote?: number;
};

export default function VoteCountPercentage({
  vote,
}: VoteCountPercentageProps) {
  const formatAvgVotePercentage = (vote: number) => {
    return +vote.toFixed(1) * 10;
  };

  return (
    <>
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
                  vote >= 7
                    ? "green"
                    : vote < 7 && vote > 5.1
                    ? "orange"
                    : "red",
                strokeDasharray: 123,
                strokeDashoffset:
                  123 - (123 * formatAvgVotePercentage(vote)) / 100,
              }}
            />
          </svg>
          <div className="number">
            {formatAvgVotePercentage(vote)}
            <sup>%</sup>
          </div>
        </div>
      )}
    </>
  );
}
