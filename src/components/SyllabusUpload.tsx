import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadedFile {
  name: string;
  size: number;
  uploadedAt: string;
}

const SyllabusUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      uploadedAt: new Date().toLocaleDateString(),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFile = (name: string) => setFiles((prev) => prev.filter((f) => f.name !== name));

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
          isDragging ? 'border-accent bg-accent/5' : 'border-border hover:border-muted-foreground/40'
        }`}
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.pdf,.doc,.docx,.txt';
          input.multiple = true;
          input.onchange = (e) => {
            const f = (e.target as HTMLInputElement).files;
            if (f) handleFiles(f);
          };
          input.click();
        }}
      >
        <Upload className={`w-8 h-8 mx-auto mb-2 ${isDragging ? 'text-accent' : 'text-muted-foreground'}`} />
        <p className="text-sm font-medium text-foreground">
          {isDragging ? 'Drop files here' : 'Drag & drop syllabus files or click to browse'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, TXT — Optional</p>
      </div>

      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 bg-muted/30 rounded-lg px-4 py-3 border"
          >
            <FileText className="w-4 h-4 text-accent shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(file.size)} · {file.uploadedAt}</p>
            </div>
            <CheckCircle className="w-4 h-4 text-success shrink-0" />
            <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-destructive" onClick={() => removeFile(file.name)}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SyllabusUpload;
