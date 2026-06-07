"use client";

import SubmitButton from "@/components/submit-button";
import { LogOut } from "lucide-react";
import { signOut } from "@/libs/action";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
}
