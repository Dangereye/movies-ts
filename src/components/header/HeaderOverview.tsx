import BodyText from "../typography/BodyText";
import CaptionText from "../typography/CaptionText";
import HDiv from "../typography/HDiv";
import { Wrapper } from "../wrapper/Wrapper";

type HeaderOverviewProps = {
  caption: string | null | undefined;
  text: string | null | undefined;
};

export default function HeaderOverview({ caption, text }: HeaderOverviewProps) {
  return (
    <Wrapper name="overview">
      <HDiv variant="heading--h4" heading="overview" />
      <CaptionText caption={caption} />
      {text ? (
        <BodyText text={text} />
      ) : (
        <BodyText text="Currently unavailable." />
      )}
    </Wrapper>
  );
}
