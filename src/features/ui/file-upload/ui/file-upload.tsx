"use client";

import { ImagePlus, X } from "lucide-react";
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

  const removeFile = useCallback((index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      onChange?.(newFiles);
      return newFiles;
    });
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <div className="space-y-4">
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
      
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
