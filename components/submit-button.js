"use client";

import Button from "@/components/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton({ children, className = "", ...props }) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      disabled={pending || props.disabled}
      className={`inline-flex items-center justify-center gap-2 ${className}`}
    >
      {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      <span>{children}</span>
    </Button>
  );
}