"use client";

import { useState } from "react";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import DateRangeSelect from "@/components/date-range-select";
import Input from "@/components/input";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import { updateSettings } from "@/libs/action";
import { useActionState } from "react";
import { FormError } from "@/components/form-error";

const initialState = {
  message: "",
  error: false,
  errors: {}
};

export default function SettingsForm({ defaults }) {
  const [state, formAction] = useActionState(updateSettings, initialState);
  const [name, setName] = useState(defaults?.name || "");

  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message?.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <div>
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
      </div>

      <div>
        <Label htmlFor="defaultView">Default transactions view</Label>
        <DateRangeSelect
          name="defaultView"
          id="defaultView"
          defaultValue={defaults?.defaultView}
        />
        {state?.errors?.defaultView?.map((error) => (
          <FormError key={`defaultView-${error}`} error={error} />
        ))}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The date range shown when you open the dashboard.
        </p>
      </div>

      <SubmitButton>Update settings</SubmitButton>
    </form>
  );
}
