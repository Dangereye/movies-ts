import { Link } from "react-router-dom";

type NavigationProps = {
  variant?: "horizontal";
  list: { name: string; link: string }[];
};

export default function Navigation({ variant, list }: NavigationProps) {
  return (
    <nav className="navigation">
      <ul className={`navigation__list ${variant}`}>
        {list.map((page, i) => (
          <li key={`navigation-${page.name}`} className="navigation__item">
            <Link to={page.link} className="navigation__link">
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
