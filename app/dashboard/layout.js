import Header from "@/components/header";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header className="my-8" />
      <main>{children}</main>
    </>
  );
}