import BodyText from "../typography/BodyText";
import HDiv from "../typography/HDiv";
import { Wrapper } from "../wrapper/Wrapper";

type HeaderOverviewProps = {
  text: string | undefined;
};

export default function HeaderOverview({ text }: HeaderOverviewProps) {
  return (
    <Wrapper name="overview">
      <HDiv variant="heading--h4" heading="overview" />
      {text ? (
        <BodyText text={text} />
      ) : (
        <BodyText text="Currently unavailable." />
      )}
    </Wrapper>
  );
}
