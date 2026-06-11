'use client'

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/libs/action";
import { useActionState } from 'react'

const initialState = {
  message: "",
  error: false
}

export default function Settings() {
    const [state, formAction] = useActionState(uploadAvatar, initialState)
    return <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={formAction}>
        <Input type="file" name="file" id="file"/>
        <SubmitButton>Upload avatar</SubmitButton>
        <p className={`${state?.error ? 'text-red-500' : 'text-green-500'}
         text-sm text-center`}>
          {state?.message}
        </p>
      </form>
    </>
}
