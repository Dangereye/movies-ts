import { useParams } from "react-router-dom";

// Components
import Header from "../components/header/Header";
import H2 from "../components/typography/H2";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { IPerson } from "../interfaces/IPerson";

export default function TvDetails() {
  const { personId } = useParams();
  const {
    data: person,
    isError,
    isLoading,
  } = useMakeQuery<IPerson>(
    `person-${personId}`,
    `person/${personId}`,
    `&append_to_response=combined_credits`
  );

  if (isLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError) {
    return <H2 heading="Error" />;
  }

  return (
    <>
      <Header
        image={person?.profile_path}
        alt={person?.name}
        title={person?.name}
      >
        <div>content</div>
      </Header>
    </>
  );
}
