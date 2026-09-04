"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, ImagePlus } from "lucide-react";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/libs/action";

const initialState = { message: "", error: false };

function cropToSquare(file) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      const size = Math.min(image.width, image.height);
      const sx = (image.width - size) / 2;
      const sy = (image.height - size) / 2;
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, sx, sy, size, size, 0, 0, 512, 512);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not crop image"));
            return;
          }
          resolve(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.9,
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };

    image.src = url;
  });
}

export default function Page() {
  const [state, formAction] = useActionState(uploadAvatar, initialState);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);
  const previewRef = useRef("");

  useEffect(() => () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
  }, []);

  const setPreviewUrl = (file) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = URL.createObjectURL(file);
    previewRef.current = url;
    setPreview(url);
  };

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    try {
      const cropped = await cropToSquare(file);
      const transfer = new DataTransfer();
      transfer.items.add(cropped);
      event.target.files = transfer.files;
      setPreviewUrl(cropped);
    } catch {
      setPreviewUrl(file);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Avatar
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Large photos are cropped to a square from the center, then shown in a circle.
        </p>
      </div>

      <form
        action={formAction}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0b1120]/80 sm:p-6"
      >
        {state?.error && <AlertError>{state?.message}</AlertError>}
        {!state?.error && state?.message?.length > 0 && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
            {preview ? (
              <Image
                src={preview}
                alt="Avatar preview"
                fill
                unoptimized
                sizes="112px"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-slate-400">
                <Camera className="h-8 w-8" />
              </span>
            )}
          </div>

          <label
            htmlFor="file"
            className="flex min-h-28 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-sky-400 hover:bg-sky-50 dark:border-white/15 dark:bg-white/5 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/5"
          >
            <ImagePlus className="mb-2 h-5 w-5 text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {busy ? "Cropping…" : "Choose a photo"}
            </span>
            <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              JPG or PNG. Center-cropped to a square.
            </span>
            <input
              ref={fileRef}
              id="file"
              name="file"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleChange}
              required
            />
          </label>
        </div>


        <SubmitButton disabled={busy}>Upload avatar</SubmitButton>
      </form >
    </div >
  );
}