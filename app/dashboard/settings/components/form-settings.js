"use client"

import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Input from "@/components/input";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import { updateSettings } from "@/libs/action";
import { useActionState } from "react";

const initialState = {
  message: '',
  error: false
}

export default function SettingsForm({ defaults }) {
    console.log(defaults)
    const [state, formAction] = useActionState(updateSettings, initialState)

    return (
        <>
          <form className="space-y-4" action={formAction}>
                   {state?.error && <AlertError>{state?.message}</AlertError>}             
                   {!state?.error && state?.message.length > 0 && <AlertSuccess>{state?.message}</AlertSuccess>}
                  <Label>User name</Label>
                  <Input htmlFor="name" type="text" name="name" id="name" placeholder="Enter user name" defaultValue={defaults?.name}/>
                  <SubmitButton>Update Settings</SubmitButton>
           </form>
        </>
    )
}