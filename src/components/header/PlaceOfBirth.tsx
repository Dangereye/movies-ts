// Components
import BodyText from "../typography/BodyText";

// Icons
import { HiOutlineLocationMarker } from "react-icons/hi";

type PlaceOfBirthProps = {
  location: string | null | undefined;
};

export default function PlaceOfBirth({ location }: PlaceOfBirthProps) {
  if (location) {
    return (
      <div>
        <HiOutlineLocationMarker />
        <BodyText text={location} />
      </div>
    );
  }
  return null;
}
