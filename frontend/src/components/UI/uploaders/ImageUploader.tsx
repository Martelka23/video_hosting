import React, { ChangeEvent } from "react";

interface ImageUploaderProps {
  label?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  fileLoaded?: boolean
}

export default function ImageUploader({ label, onChange, fileLoaded = false }: ImageUploaderProps) {
  const id = Math.random().toString();

  return (
    <div className="image-uploader">
      {(label) ? <label htmlFor={id}>{label}</label> : null}
      <input id={id} type='file' onChange={onChange} />
      {fileLoaded ? <span>File loaded</span> : null}
    </div>
  );
}