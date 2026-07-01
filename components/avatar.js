import { createClient } from "@/libs/supabase/server"
import { CircleUser} from "lucide-react";
import Image from "next/image";

export default async function Avatar({width = 32 , height = 32}) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    const avatarPath = user?.user_metadata?.avatar

    if (!avatarPath) {
      return <CircleUser className="w-6 h-6 " />
    }

    const {data: imageData, error} = await supabase.storage
      .from("avatar")
      .createSignedUrl(avatarPath, 60 * 5)

    if (error || !imageData?.signedUrl) {
       return <CircleUser className="w-6 h-6 " /> 
    }

    return <Image src={imageData.signedUrl} width={width} height={height}
    alt="User avatar" className="rounded-full"/>
}
