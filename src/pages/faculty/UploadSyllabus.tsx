import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SyllabusFile {
  id: string;
  name: string;
  subject: string;
  date: string;
}

const initialFiles: SyllabusFile[] = [
  { id: '1', name: 'Biology_Ch3_Photosynthesis.pdf', subject: 'Biology', date: '2026-02-20' },
  { id: '2', name: 'OrganicChem_Basics.pdf', subject: 'Chemistry', date: '2026-02-18' },
  { id: '3', name: 'Physics_Newton_Laws.pdf', subject: 'Physics', date: '2026-02-10' },
];

const UploadSyllabus = () => {
  const [files, setFiles] = useState<SyllabusFile[]>(initialFiles);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.error('Only PDF files are allowed');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.error('Only PDF files are allowed');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    const newFile: SyllabusFile = {
      id: Date.now().toString(),
      name: selectedFile.name,
      subject: 'General',
      date: new Date().toISOString().split('T')[0],
    };
    setFiles((prev) => [newFile, ...prev]);
    setSelectedFile(null);
    toast.success('Syllabus uploaded successfully!');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Upload Syllabus</h1>
        <p className="text-muted-foreground mt-1">Upload syllabus PDFs for AI-powered exam generation</p>
      </div>

      {/* Upload Area */}
      <div className="bg-card rounded-xl border p-6 mb-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
          }`}
        >
          <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-foreground font-medium">Drag & drop a PDF here, or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">Only PDF files are supported</p>
          <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
        </div>

        {selectedFile && (
          <div className="mt-4 flex items-center justify-between bg-muted/30 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">{selectedFile.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setSelectedFile(null)}>
                <X className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handleUpload} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Upload
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Syllabi List */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Uploaded Syllabi</h2>
        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Subject</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, i) => (
                  <motion.tr
                    key={file.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-4 font-medium text-card-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent" />
                      {file.name}
                    </td>
                    <td className="p-4 text-muted-foreground">{file.subject}</td>
                    <td className="p-4 text-muted-foreground">{file.date}</td>
                  </motion.tr>
                ))}
                {files.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-muted-foreground">No syllabi uploaded yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSyllabus;
