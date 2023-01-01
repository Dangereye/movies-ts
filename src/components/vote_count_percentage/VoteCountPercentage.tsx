type VoteCountPercentageProps = {
  vote: number | undefined;
  size?: "card" | "header";
};

export default function VoteCountPercentage({
  vote,
  size = "card",
}: VoteCountPercentageProps) {
  let cx = 25,
    cy = 25,
    r = 20,
    strokeDashArray = 123;

  if (size === "header") {
    cx = cx * 1.5;
    cy = cy * 1.5;
    r = r * 1.5;
    strokeDashArray = strokeDashArray * 1.5;
  }

  const formatAvgVotePercentage = (vote: number) => {
    return +vote.toFixed(1) * 10;
  };

  return (
    <>
      {vote && (
        <div className="vote-count-percentage">
          <svg>
            <circle cx={cx} cy={cy} r={r} />
            <circle
              cx={cx}
              cy={cy}
              r={r}
              style={{
                stroke:
                  vote >= 7
                    ? "green"
                    : vote < 7 && vote > 5.1
                    ? "orange"
                    : "red",
                strokeDasharray: strokeDashArray,
                strokeDashoffset:
                  strokeDashArray -
                  (strokeDashArray * formatAvgVotePercentage(vote)) / 100,
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
