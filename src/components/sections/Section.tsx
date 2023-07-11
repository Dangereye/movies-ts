type SectionProps = {
  padding?: boolean;
  children: React.ReactNode;
};

export default function Section({ padding = false, children }: SectionProps) {
  return (
    <section className={`section ${padding && 'horizontal-padding'}`}>
      {children}
    </section>
  );
}
