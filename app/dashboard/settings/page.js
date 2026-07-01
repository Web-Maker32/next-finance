import { createClient } from "@/libs/supabase/server";
import SettingsForm from "./components/form-settings";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    const user = data?.user

    if (!user) {
      redirect("/login")
    }

    const { user_metadata: defaults = {} } = user
    return (
        <>
            <h1 className="text-4xl font-semibold mb-8">
                Settings
            </h1>
            <SettingsForm defaults={defaults}/>
        </>
    )
}
