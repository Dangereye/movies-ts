// Components
import BodyText from "../typography/BodyText";

// Icons
import { RxCalendar } from "react-icons/rx";

// Utilities
import { formatDate } from "../../utilities/formatDate";

type DateComponentProps = {
  date: string | undefined;
};

export default function DateComponent({ date }: DateComponentProps) {
  if (date) {
    return (
      <div>
        <RxCalendar />
        <BodyText text={formatDate(date)} />
      </div>
    );
  }
  return null;
}
