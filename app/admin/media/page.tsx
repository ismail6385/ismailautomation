"use client";

import { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Upload, Trash2, Search, Download, FolderOpen, X, FileText } from 'lucide-react';

interface MediaFile {
    id: string;
    name: string;
    url: string;
    type: 'image' | 'video' | 'document';
    size: number;
    uploadedDate: string;
}

export default function MediaPage() {
    const [media, setMedia] = useState<MediaFile[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all');
    const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Load media from localStorage
        const storedMedia = JSON.parse(localStorage.getItem('media') || '[]');
        setMedia(storedMedia);
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);

        Array.from(files).forEach((file) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const newFile: MediaFile = {
                    id: Date.now().toString() + Math.random(),
                    name: file.name,
                    url: event.target?.result as string,
                    type: file.type.startsWith('image/') ? 'image' :
                        file.type.startsWith('video/') ? 'video' : 'document',
                    size: file.size,
                    uploadedDate: new Date().toISOString().split('T')[0],
                };

                setMedia(prev => {
                    const updated = [...prev, newFile];
                    localStorage.setItem('media', JSON.stringify(updated));
                    return updated;
                });
            };

            reader.readAsDataURL(file);
        });

        setIsUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this file?')) {
            const updated = media.filter(m => m.id !== id);
            setMedia(updated);
            localStorage.setItem('media', JSON.stringify(updated));
            if (selectedFile?.id === id) {
                setSelectedFile(null);
            }
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('URL copied to clipboard!');
    };

    const filteredMedia = media.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || file.type === filterType;
        return matchesSearch && matchesType;
    });

    const imageCount = media.filter(m => m.type === 'image').length;
    const videoCount = media.filter(m => m.type === 'video').length;
    const documentCount = media.filter(m => m.type === 'document').length;

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Media Library</h1>
                    <p className="text-gray-400">Manage your uploaded images and files</p>
                </div>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="mt-4 sm:mt-0 px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2 disabled:opacity-50"
                >
                    <Upload className="w-5 h-5" />
                    {isUploading ? 'Uploading...' : 'Upload Files'}
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total Files</p>
                    <p className="text-2xl font-bold text-white">{media.length}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Images</p>
                    <p className="text-2xl font-bold text-cyan-400">{imageCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Videos</p>
                    <p className="text-2xl font-bold text-purple-400">{videoCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Documents</p>
                    <p className="text-2xl font-bold text-green-400">{documentCount}</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="glass-effect rounded-2xl p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search files..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as any)}
                        className="px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="all">All Types</option>
                        <option value="image">Images</option>
                        <option value="video">Videos</option>
                        <option value="document">Documents</option>
                    </select>
                </div>
            </div>

            {/* Media Grid */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {filteredMedia.map((file) => (
                    <div
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        className="glass-effect rounded-xl p-4 hover-lift cursor-pointer group"
                    >
                        <div className="aspect-square rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-3 overflow-hidden">
                            {file.type === 'image' && file.url.startsWith('data:') ? (
                                <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                            ) : file.type === 'image' ? (
                                <ImageIcon className="w-12 h-12 text-cyan-400" />
                            ) : file.type === 'video' ? (
                                <FolderOpen className="w-12 h-12 text-purple-400" />
                            ) : (
                                <FileText className="w-12 h-12 text-green-400" />
                            )}
                        </div>
                        <h3 className="text-white font-semibold text-sm truncate mb-1">{file.name}</h3>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">{formatFileSize(file.size)}</span>
                            <span className={`px-2 py-1 rounded ${file.type === 'image' ? 'bg-cyan-500/20 text-cyan-400' :
                                    file.type === 'video' ? 'bg-purple-500/20 text-purple-400' :
                                        'bg-green-500/20 text-green-400'
                                }`}>
                                {file.type}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Upload Placeholder */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="glass-effect rounded-xl p-4 border-2 border-dashed border-white/20 flex flex-col items-center justify-center aspect-square cursor-pointer hover:border-cyan-500/50 transition-colors"
                >
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm">Upload New</p>
                </div>
            </div>

            {filteredMedia.length === 0 && media.length > 0 && (
                <div className="glass-effect rounded-2xl p-12 text-center">
                    <p className="text-gray-400">No files match your search.</p>
                </div>
            )}

            {media.length === 0 && (
                <div className="glass-effect rounded-2xl p-12 text-center">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No files uploaded yet. Upload your first file! 📁</p>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors"
                    >
                        Upload Files
                    </button>
                </div>
            )}

            {/* File Details Modal */}
            {selectedFile && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">File Details</h2>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="aspect-video rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 overflow-hidden">
                                {selectedFile.type === 'image' && selectedFile.url.startsWith('data:') ? (
                                    <img src={selectedFile.url} alt={selectedFile.name} className="max-w-full max-h-full object-contain" />
                                ) : selectedFile.type === 'image' ? (
                                    <ImageIcon className="w-24 h-24 text-cyan-400" />
                                ) : selectedFile.type === 'video' ? (
                                    <video src={selectedFile.url} controls className="max-w-full max-h-full" />
                                ) : (
                                    <FileText className="w-24 h-24 text-green-400" />
                                )}
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm">File Name</label>
                                <p className="text-white font-semibold">{selectedFile.name}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-sm">File Size</label>
                                    <p className="text-white font-semibold">{formatFileSize(selectedFile.size)}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm">Type</label>
                                    <p className="text-white font-semibold capitalize">{selectedFile.type}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm">Uploaded Date</label>
                                <p className="text-white font-semibold">{selectedFile.uploadedDate}</p>
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm mb-2 block">File URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={selectedFile.url.substring(0, 50) + '...'}
                                        readOnly
                                        className="flex-1 px-4 py-2 rounded-lg glass-effect text-white border border-white/10"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(selectedFile.url)}
                                        className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => handleDelete(selectedFile.id)}
                                    className="flex-1 px-6 py-3 rounded-full font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                >
                                    Delete File
                                </button>
                                <a
                                    href={selectedFile.url}
                                    download={selectedFile.name}
                                    className="flex-1 px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors text-center"
                                >
                                    <Download className="w-5 h-5 inline mr-2" />
                                    Download
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Tips */}
            <div className="glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">💡 Media Management Tips</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Use descriptive file names for better organization</li>
                    <li>• Optimize images before uploading (compress, resize)</li>
                    <li>• Recommended image dimensions: 1920x1080 for banners, 800x600 for posts</li>
                    <li>• Accepted formats: JPG, PNG, GIF, WebP, MP4, PDF</li>
                    <li>• Files are stored in browser localStorage (base64 encoded)</li>
                </ul>
            </div>
        </div>
    );
}
