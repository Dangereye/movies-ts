// Components
import BodyText from "../typography/BodyText";

// Icons
import { GiHastyGrave } from "react-icons/gi";

// Utilities
import { formatDate } from "../../utilities/formatDate";

type DeathdayProps = { date: string | null | undefined };

export default function Deathday({ date }: DeathdayProps) {
  if (date) {
    return (
      <div>
        <GiHastyGrave />
        <BodyText text={formatDate(date)} />
      </div>
    );
  }
  return null;
}
