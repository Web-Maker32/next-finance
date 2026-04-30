import Header from "@/components/header";

export default function DashboardLayout({ children }) {
  return (
    <>
      
       <Header className="my-8"/>
     <main>
        {children}
      </main>
      <footer className="mt-auto text-center py-8">
        Footer
      </footer>

    </>
  )
}