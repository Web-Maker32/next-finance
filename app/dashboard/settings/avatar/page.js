'use client'

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/libs/action";

export default function Settings() {
    return <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={uploadAvatar}>
        <Input type="file" name="file" id="file"/>
        <SubmitButton>Upload avatar</SubmitButton>
      </form>
    </>
}