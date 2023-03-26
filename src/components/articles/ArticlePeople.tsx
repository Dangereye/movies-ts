import { Link, useLocation } from "react-router-dom";
import { IPerson } from "../../interfaces/IPerson";
import { removeDuplicatesById } from "../../utilities/removeDuplicatesById";
import CardContent from "../cards/card/CardContent";
import Cards from "../cards/Cards";
import Container from "../container/Container";
import ImageComponent from "../image/Image";
import BodyText from "../typography/BodyText";
import H2 from "../typography/H2";
import SmallText from "../typography/SmallText";
import Article from "./Article";


type ArticlePeopleProps<T>={
    variant:"scroll-x"|"list"; 
    name:string;
    heading:string;
    department?:boolean;
    character?:boolean;
    limit?:boolean;
    data:T[]|undefined;
}

export default function ArticlePeople<T extends{
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  roles?: { credit_id: string; character: string; episode_count: number }[];
  known_for_department?: string;
  popularity: number;}>({variant,name,heading,department,character,limit,data}:ArticlePeopleProps<T>){  
  const { pathname } = useLocation(); 

  if(data&& data.length>0){
      const filtered = removeDuplicatesById(data); 

        return(<Article name={name}>
            <Container>
              <H2 heading={heading} />
              <BodyText text={`Showing ${limit ? 10 : filtered.length} people`} />
              <Cards
              variant={variant}
                getId={(item) => item.id}
                getLink={(item) => `/people/${item.id}`}
                renderContent={(item) => ( 
                  <>
                    <ImageComponent
                      src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                      fallback="/images/error_500x750.webp"
                      alt={item.name}
                    />
                    <CardContent heading={item.name}>
                      {/* Movie character */}
                      {character && item.character && (
                        <BodyText text={item.character} />
                      )}
    
                      {/* Tv character */}
                      {character && item.roles && (
                        <>
                          <BodyText
                            text={
                              item.roles.length > 0
                                ? item?.roles?.map((role) => role.character)
                                : "TBC"
                            }
                          />
                          <SmallText
                            text={
                              item.roles.length > 0
                                ? `${item.roles[0].episode_count} ${
                                    item.roles[0].episode_count > 1
                                      ? `episodes`
                                      : `episode`
                                  }`
                                : ""
                            }
                          />
                        </>
                      )}
    
                      {/* Acting / Crew */}
                      {department && (
                        <BodyText
                          text={
                            item.known_for_department
                              ? item.known_for_department
                              : "TBC"
                          }
                        />
                      )}
                    </CardContent>
                  </>
                )}
                data={filtered}
                sort={(a, b) =>
                  (b.popularity ? b.popularity : 0) -
                  (a.popularity ? a.popularity : 0)
                }
                limit={limit}
              />
              {(pathname.includes("movies") || pathname.includes("tv")) && (
                <div className="buttons">
                  <Link to={`${pathname}/cast-crew`} className="btn btn--secondary">
                    Full cast & crew
                  </Link>
                </div>
              )}
            </Container>
          </Article>)
    }
    return null
}