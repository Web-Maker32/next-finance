"use client";

import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import DateRangeSelect from "@/components/date-range-select";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import SubmitButton from "@/components/submit-button";
import { FormError } from "@/components/form-error";
import { currencies } from "@/libs/consts";
import { updateSettings } from "@/libs/action";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const initialState = { message: "", error: false, errors: {} };

export default function SettingsForm({ defaults }) {
  const router = useRouter();
  const [state, formAction] = useActionState(updateSettings, initialState);
  const [name, setName] = useState(defaults?.name || "");
  const [currency, setCurrency] = useState(defaults?.currency || "EUR");
  const [defaultView, setDefaultView] = useState(defaults?.defaultView || "last30days");
  const formKey = `${defaults?.name || ""}-${defaults?.currency || "EUR"}-${defaults?.defaultView || "last30days"}`;

  useEffect(() => {
    try {
      localStorage.setItem("currency", currency);
      window.dispatchEvent(new CustomEvent("currency-updated", { detail: currency }));
    } catch {}
  }, [currency]);

  useEffect(() => {
    if (state?.message && !state?.error) router.refresh();
  }, [router, state?.error, state?.message]);

  return (
    <form key={formKey} className="space-y-5" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message?.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <div className="space-y-2">
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

      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select
          name="currency"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Used across the dashboard and transaction list.
        </p>
        {state?.errors?.currency?.map((error) => (
          <FormError key={`currency-${error}`} error={error} />
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="defaultView">Default transactions view</Label>
        <DateRangeSelect
          name="defaultView"
          id="defaultView"
          value={defaultView}
          onChange={(e) => setDefaultView(e.target.value)}
        />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The date range shown when you open the dashboard.
        </p>
        {state?.errors?.defaultView?.map((error) => (
          <FormError key={`defaultView-${error}`} error={error} />
        ))}
      </div>

      <div className="border-t border-slate-200 pt-5 dark:border-white/10">
        <SubmitButton>Update settings</SubmitButton>
      </div>
    </form>
  );
}