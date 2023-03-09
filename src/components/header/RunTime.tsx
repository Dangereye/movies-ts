// Components
import BodyText from "../typography/BodyText";

// Icons
import { RxClock } from "react-icons/rx";

// Utilities
import { formatRuntime } from "../../utilities/formatRuntime";

type timeProps = {
  time: number | undefined | null;
};

export default function RunTime({ time }: timeProps) {
  if (time) {
    return (
      <div>
        <RxClock />
        <BodyText text={formatRuntime(time)} />
      </div>
    );
  }
  return null;
}
