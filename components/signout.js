"use client";

import SubmitButton from "@/components/submit-button";
import { LogOut } from "lucide-react";
import { signOut } from "@/libs/action";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <SubmitButton variant="ghost" size="sm" aria-label="Sign out">
        <LogOut className="h-5 w-5" />
      </SubmitButton>
    </form>
  );
}