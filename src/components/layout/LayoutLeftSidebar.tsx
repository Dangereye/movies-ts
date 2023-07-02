import Sidebar from '../sidebar/Sidebar';

type LayoutLeftSidebarProps = {
  children: React.ReactNode;
};

export default function LayoutLeftSidebar({
  children,
}: LayoutLeftSidebarProps) {
  return (
    <div className='layout left-sidebar'>
      <aside>
        <Sidebar />
      </aside>
      <main className='main'>{children}</main>
    </div>
  );
}
