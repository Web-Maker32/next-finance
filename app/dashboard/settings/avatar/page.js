'use client'

import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/libs/action";
import { useActionState } from "react";

const initialState = {
  message: '',
  error: false
}

export default function Page() {
  const [state, formAction] = useActionState(uploadAvatar, initialState)
    return <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={formAction}>
         {state?.error && <AlertError>{state?.message}</AlertError>}
         
         {!state?.error && state?.message.length > 0 && <AlertSuccess>{state?.message}</AlertSuccess>}
        <Input type="file" name="file" id="file"/>
        <SubmitButton>Upload avatar</SubmitButton>
      </form>
    </>
}