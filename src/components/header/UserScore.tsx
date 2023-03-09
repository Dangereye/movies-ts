// Components
import VoteCountPercentage from "../vote_count_percentage/VoteCountPercentage";
import HDiv from "../typography/HDiv";

type UserScoreProps = {
  rating: number | undefined;
};

export default function UserScore({ rating }: UserScoreProps) {
  return (
    <div className="vote">
      <VoteCountPercentage vote={rating} large />
      <HDiv variant="heading--h4" heading="user score" />
    </div>
  );
}
