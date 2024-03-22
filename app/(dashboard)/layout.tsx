import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/org-sidebar";

interface dashboardLayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: dashboardLayoutProps) => {
  return (
    <main className="h-full ">
      <Sidebar />
      <div className="pl-[80px] h-full flex">
        <div className="hidden md:flex flex-col items-center gap-x-3 space-y-6 w-[200px]  pl-5  pt-8 ">
          <OrgSidebar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
