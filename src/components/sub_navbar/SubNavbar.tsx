import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import Container from "../container/Container";
import Button from "../buttons/Button";

type SubNavbarProps = {
  children: ReactNode;
};

export default function SubNavbar({ children }: SubNavbarProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return (
    <div className="sub-navbar">
      <Container>
        <Button
          variant="btn--tertiary"
          name={<MdArrowBackIos />}
          onClick={handleClick}
        />
        {children}
      </Container>
    </div>
  );
}
