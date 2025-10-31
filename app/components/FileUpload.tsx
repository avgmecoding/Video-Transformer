
"use client"
import { upload } from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (res: unknown) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();
      const res = await upload({
        expire: auth.expire,
        token: auth.token,
        signature: auth.signature,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        file,
        fileName: file.name,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });
      onSuccess(res);
    } catch (error) {
      console.error("Upload failed", error);
      setError("Upload failed. Try again!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6">
      <h1 className="text-3xl md:text-4xl mb-6 font-bold tracking-widest text-neon-green drop-shadow-[0_0_10px_#00ff9d]">
        Upload {fileType === "video" ? "Video" : "Image"}
      </h1>

      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        className="block w-80 p-3 rounded-md bg-black border border-green-400/40 text-green-300
                   file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                   file:text-sm file:font-semibold file:bg-green-500 file:text-black 
                   hover:file:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {uploading && (
        <div className="text-green-300 mt-4 animate-pulse">Uploading...</div>
      )}

      {error && (
        <div className="text-red-500 mt-4 text-sm">{error}</div>
      )}
    </div>
  );
};

export default FileUpload;
