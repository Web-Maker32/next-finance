import SideNav from "./components/side-nav";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <SideNav />
      </aside>
      <div className="lg:col-span-3">{children}</div>
    </div>
  );
}