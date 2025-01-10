"use client";

import { ImagePlus } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onChange?: (files: File[]) => void;
}

export function FileUpload({ onChange }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onChange?.(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-[#d9d9d9] rounded-lg p-8 text-center cursor-pointer hover:border-[#00a859] transition-colors"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <ImagePlus className="w-8 h-8 text-[#00a859]" />
        <p className="text-[#2f2f2f]">
          {isDragActive
            ? "Перетащите файлы сюда"
            : "Просто перетащите фото, чтобы загрузить"}
        </p>
      </div>
    </div>
  );
}
