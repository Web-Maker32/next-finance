"use client";

import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import DateRangeSelect from "@/components/date-range-select";
import Input from "@/components/input";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import { updateSettings } from "@/libs/action";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
  error: false,
};

export default function SettingsForm({ defaults }) {
  const [state, formAction] = useActionState(updateSettings, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.message && !state?.error) {
      // 1. Refresh the route data behind the scenes
      router.refresh(); 
    }
  }, [state, router]);
  return (
    <>
      {/* Changing the key resets the inner inputs to their new defaultValues */}
      <form className="space-y-4" action={formAction}>
        {state?.error && <AlertError>{state?.message}</AlertError>}
        {!state?.error && state?.message.length > 0 && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}
        
        <Label>User name</Label>
        <Input 
          htmlFor="name" 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Enter user name"
          defaultValue={defaults?.name} 
        />

        <Label htmlFor="defaultView">Default transactions view</Label>
        <DateRangeSelect 
          name="defaultView" 
          id="defaultView" 
          defaultValue={defaults?.defaultView} 
        />
      
        <SubmitButton>Update Settings</SubmitButton>
      </form>
    </>
  );
}