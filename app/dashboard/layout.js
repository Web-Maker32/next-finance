import Header from "@/components/header";

export default function DashboardLayout({ children }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <Header className="my-8" showNav />
      <main>{children}</main>
    </div>
  );
}
