"use client";

import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Check } from 'lucide-react';

interface MediaFile {
    id: string;
    name: string;
    type: string;
    size: number;
    data: string; // base64
    date: string;
}

interface MediaPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string, alt: string) => void;
}

export default function MediaPicker({ isOpen, onClose, onSelect }: MediaPickerProps) {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
    const [altText, setAltText] = useState('');

    useEffect(() => {
        if (isOpen) {
            const savedFiles = localStorage.getItem('mediaFiles');
            if (savedFiles) {
                setFiles(JSON.parse(savedFiles));
            }
        }
    }, [isOpen]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('File size too large (max 5MB)');
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            const newFile: MediaFile = {
                id: Date.now().toString(),
                name: file.name,
                type: file.type,
                size: file.size,
                data: base64,
                date: new Date().toISOString(),
            };

            const updatedFiles = [newFile, ...files];
            setFiles(updatedFiles);
            localStorage.setItem('mediaFiles', JSON.stringify(updatedFiles));
            setUploading(false);
            setSelectedFile(newFile); // Auto-select uploaded file
        };
        reader.readAsDataURL(file);
    };

    const handleSelect = () => {
        if (selectedFile) {
            onSelect(selectedFile.data, altText || selectedFile.name);
            onClose();
            setSelectedFile(null);
            setAltText('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-cyan-400" />
                        Select Image
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">

                    {/* Left: Library */}
                    <div className="flex-1 p-6 overflow-y-auto border-r border-white/10">
                        {/* Upload Button */}
                        <div className="mb-6">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-cyan-500/50 hover:bg-white/5 transition-all group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-3 text-gray-400 group-hover:text-cyan-400" />
                                    <p className="text-sm text-gray-400 group-hover:text-white">
                                        {uploading ? 'Uploading...' : 'Click to upload new image'}
                                    </p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                            </label>
                        </div>

                        {/* Grid */}
                        {files.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No images found.</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {files.map((file) => (
                                    <div
                                        key={file.id}
                                        onClick={() => setSelectedFile(file)}
                                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedFile?.id === file.id
                                                ? 'border-cyan-500 ring-2 ring-cyan-500/20'
                                                : 'border-transparent hover:border-white/20'
                                            }`}
                                    >
                                        <img src={file.data} alt={file.name} className="w-full h-full object-cover" />
                                        {selectedFile?.id === file.id && (
                                            <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                                                <div className="bg-cyan-500 rounded-full p-1">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Details */}
                    <div className="w-full md:w-80 p-6 bg-black/20 overflow-y-auto">
                        {selectedFile ? (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Preview</h3>
                                    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/50 aspect-video flex items-center justify-center">
                                        <img src={selectedFile.data} alt={selectedFile.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-2">File Details</h3>
                                    <div className="text-sm space-y-1">
                                        <p className="text-white truncate" title={selectedFile.name}>{selectedFile.name}</p>
                                        <p className="text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                                        <p className="text-gray-500">{new Date(selectedFile.date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-400 mb-2">Alt Text (SEO)</label>
                                    <input
                                        type="text"
                                        value={altText}
                                        onChange={(e) => setAltText(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:outline-none text-sm"
                                        placeholder="Describe the image..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Important for SEO and accessibility.</p>
                                </div>

                                <button
                                    onClick={handleSelect}
                                    className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-500/30 transition-all"
                                >
                                    Insert Image
                                </button>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center">
                                <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
                                <p>Select an image to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
