import { useState } from "react";

export default function MobileMenuIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={isOpen ? "mobile-menu-icon open" : "mobile-menu-icon"}
      onClick={toggle}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
