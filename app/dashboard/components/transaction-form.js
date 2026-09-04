"use client";

import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import Button from "@/components/button";
import { FormError } from "@/components/form-error";
import { categories, types } from "@/libs/consts";
import { transactionSchema } from "@/libs/validation";
import { createTransaction, updateTransaction } from "@/libs/action";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function TransactionForm({ initialData }) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState();
  const editing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split("T")[0],
    },
  });

  const type = useWatch({ control, name: "type" });

  const onSubmit = async (data) => {
    setSaving(true);
    setLastError();
    try {
      if (editing) {
        await updateTransaction(initialData.id, data);
      } else {
        await createTransaction(data);
      }
      router.push("/dashboard");
    } catch (error) {
      setLastError(error?.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="mb-1">Type</Label>
          <Select
            {...register("type", {
              onChange: (e) => {
                if (e.target.value !== "Expense") {
                  setValue("category", "");
                }
              },
            })}
          >
            {types.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
          <FormError error={errors.type?.message} />
        </div>

        <div className="space-y-2">
          <Label className="mb-1">Category</Label>
          <Select {...register("category")} disabled={type !== "Expense"}>
            <option value="">Select a category</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
          <FormError error={errors.category?.message} />
        </div>

        <div className="space-y-2">
          <Label className="mb-1">Date</Label>
          <Input {...register("created_at")} disabled={editing} />
          <FormError error={errors.created_at?.message} />
        </div>

        <div className="space-y-2">
          <Label className="mb-1">Amount</Label>
          <Input type="number" step="0.01" min="0" {...register("amount")} />
          <FormError error={errors.amount?.message} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="mb-1">Description</Label>
          <Input {...register("description")} />
          <FormError error={errors.description?.message} />
        </div>
      </div>

      <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-slate-200 pt-5 dark:border-white/10 sm:flex-row sm:items-center">
        <div>
          {lastError ? <FormError error={lastError} /> : null}
        </div>
        <Button type="submit" disabled={isSaving} className="sm:min-w-32">
          {isSaving ? "Saving…" : editing ? "Save changes" : "Save"}
        </Button>
      </div>
    </motion.form>
  );
}