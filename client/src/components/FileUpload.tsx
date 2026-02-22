import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, Image as ImageIcon, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
  label?: string;
}

export function FileUpload({ onFileSelect, error, label = "Upload Chest X-Ray" }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileSelect(file);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  }, [onFileSelect]);

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    setPreview(null);
    setFileName(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': []
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer transition-all duration-300 ease-out border-2 border-dashed rounded-2xl p-8 text-center",
          "hover:border-primary/50 hover:bg-primary/5",
          isDragActive ? "border-primary bg-primary/10" : "border-slate-200 bg-slate-50",
          error ? "border-red-300 bg-red-50" : "",
          preview ? "border-solid border-slate-300 bg-white p-2" : ""
        )}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black"
            >
              <img 
                src={preview} 
                alt="X-ray preview" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-left opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <FileCheck className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
                </div>
              </div>

              <button
                onClick={clearFile}
                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-6"
            >
              <div className={cn(
                "p-4 rounded-full mb-4 transition-colors duration-300",
                isDragActive ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                {isDragActive ? (
                  <UploadCloud className="w-8 h-8 animate-bounce" />
                ) : (
                  <ImageIcon className="w-8 h-8" />
                )}
              </div>
              <div className="space-y-1">
                <p className="font-medium text-slate-700">
                  {isDragActive ? "Drop the X-ray here" : "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-slate-500">
                  Supported formats: JPG, PNG, DICOM (mock)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-sm text-red-500 font-medium px-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
