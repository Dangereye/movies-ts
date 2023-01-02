import { Link } from "react-router-dom";
import { ICredits } from "../../interfaces/ICredits";
import ImageComponent from "../image/Image";
import BodyText from "../typography/BodyText";
import Wrapper from "../wrapper/Wrapper";

type CrewJobProps = {
  credits: ICredits | undefined;
};

export default function CrewJobs({ credits }: CrewJobProps) {
  let ignoreList: string[] = [];

  const getPeople = () => {
    let array: string[] = [];
    credits?.crew.forEach((person) => {
      if (
        person.job === "Director" ||
        (person.job === "Producer" && person.popularity > 5) ||
        (person.job === "Screenplay" && person.popularity > 5) ||
        (person.job === "Story" && person.popularity > 5) ||
        (person.job === "Executive Producer" && person.popularity > 5)
      ) {
        array.push(person.name);
      }
      return;
    });
    const unique = array.filter((v, i, a) => a.indexOf(v) === i);
    return unique;
  };

  const getJobs = (name: string) => {
    let array: string[] = [];
    credits!.crew.forEach((person) => {
      if (person.name === name) {
        array.push(person.job);
      }
      return;
    });
    return array;
  };

  return (
    <Wrapper name="crew" variant="flex">
      {credits?.crew.map((person, i) => {
        const list = getPeople();
        if (list.includes(person.name) && !ignoreList.includes(person.name)) {
          ignoreList.push(person.name);
          return (
            <Wrapper name="profile" variant="flex" key={person.name}>
              <Link to={`/person/${person.id}`}>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                  fallback="/images/error_100x100.webp"
                  width={100}
                  height={100}
                  alt={person.name}
                />
              </Link>
              <div>
                <Link
                  to={`/person/${person.id}`}
                  className="heading heading--h4"
                >
                  {person.name}
                </Link>
                <Wrapper name="jobs" variant="flex">
                  {getJobs(person.name).map((job, i) => (
                    <BodyText
                      key={`${person.job}-${i}`}
                      text={job}
                      variant="job"
                    />
                  ))}
                </Wrapper>
              </div>
            </Wrapper>
          );
        }
        return null;
      })}
    </Wrapper>
  );
}
