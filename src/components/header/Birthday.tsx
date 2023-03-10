// Components
import BodyText from "../typography/BodyText";

// Icons
import { RiCake2Line } from "react-icons/ri";

// Utilities
import { formatDate } from "../../utilities/formatDate";

type BirthdayProps = {
  date: string | null | undefined;
};

export default function Birthday({ date }: BirthdayProps) {
  if (date) {
    return (
      <div>
        <RiCake2Line />
        <BodyText text={formatDate(date)} />
      </div>
    );
  }
  return null;
}
