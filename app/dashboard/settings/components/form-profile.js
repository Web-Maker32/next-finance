"use client";

import { useState } from "react";
import { useActionState } from "react";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Input from "@/components/input";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import { FormError } from "@/components/form-error";
import { updateProfile } from "@/libs/action";

const initialState = {
  message: "",
  error: false,
  errors: {},
};

export default function ProfileForm({ defaults }) {
  const [state, formAction] = useActionState(updateProfile, initialState);
  const [name, setName] = useState(defaults?.name || "");

  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message?.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <Label htmlFor="name">Display name</Label>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {state?.errors?.name?.map((error) => (
        <FormError key={`name-${error}`} error={error} />
      ))}

      <SubmitButton>Update profile</SubmitButton>
    </form>
  );
}
