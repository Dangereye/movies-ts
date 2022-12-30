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
    cx = cx * 2;
    cy = cy * 2;
    r = r * 2;
    strokeDashArray = strokeDashArray * 2;
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
