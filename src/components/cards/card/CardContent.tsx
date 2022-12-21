import BodyText from "../../typography/BodyText";
import HDiv from "../../typography/HDiv";

type CardContentProps = {
  heading: string;
  body: string;
};

export default function CardContent({ heading, body }: CardContentProps) {
  return (
    <div className="content">
      <HDiv heading={heading} variant="heading--h4" />
      <BodyText text={body} />
    </div>
  );
}
