import React, { ChangeEvent } from "react";

interface ImageUploaderProps {
  label?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function ImageUploader({ label, onChange }: ImageUploaderProps) {
  const id = Math.random().toString();

  return (
    <div className="image-uploader">
      {(label) ? <label htmlFor={id}>{label}</label> : null}
      <input id={id} type='file' onChange={onChange} />
    </div>
  );
}