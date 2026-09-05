import React, { useRef, useState } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Plus, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  FolderOpen
} from 'lucide-react';
import { processMultipleImageFiles } from '../utils/imageUtils';

export const DeviceImagePicker = ({
  photos = [],
  onChange,
  minPhotos = 3,
  maxPhotos = 10,
  label = "Car Image Gallery",
  description = "Choose photos directly from your device (phone gallery or computer).",
  theme = "dark" // "dark" or "light"
}) => {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const remainingSlots = Math.max(0, maxPhotos - photos.length);

  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMsg('');

    if (remainingSlots <= 0) {
      setErrorMsg(`Maximum ${maxPhotos} photos reached.`);
      return;
    }

    const filesToTake = Array.from(fileList).filter(f => f.type.startsWith('image/')).slice(0, remainingSlots);
    if (filesToTake.length === 0) {
      setErrorMsg('Please select valid image files (.jpg, .jpeg, .png, .webp).');
      return;
    }

    setIsProcessing(true);
    try {
      const dataUrls = await processMultipleImageFiles(filesToTake, remainingSlots);
      const updated = [...photos, ...dataUrls];
      onChange(updated);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process image files from device. Please try again.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleRemove = (index) => {
    setErrorMsg('');
    const updated = photos.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleAddUrl = (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;
    if (photos.length >= maxPhotos) {
      setErrorMsg(`Maximum ${maxPhotos} photos reached.`);
      return;
    }
    onChange([...photos, urlInput.trim()]);
    setUrlInput('');
    setShowUrlInput(false);
  };

  const isDark = theme === "dark";

  return (
    <div className={`rounded-3xl p-5 border transition-all ${
      isDark 
        ? 'bg-neutral-950/80 border-white/10 text-white' 
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[var(--theme-primary)]" />
            <h4 className="text-sm font-bold tracking-tight">{label}</h4>
          </div>
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            {description}
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
            photos.length >= minPhotos && photos.length <= maxPhotos
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
          }`}>
            {photos.length >= minPhotos ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5" />
            )}
            <span>{photos.length} / {maxPhotos} Photos</span>
            {minPhotos > 0 && <span className="opacity-80 text-[10px]">(Min {minPhotos})</span>}
          </span>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
        multiple
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
      />

      {/* Grid of Existing Photos */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
          {photos.map((photo, idx) => (
            <div 
              key={idx} 
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-sm ${
                isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <img 
                src={photo} 
                alt={`Vehicle ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = '/images/hero/fortuner-hero.jpg';
                }}
              />
              
              {/* Badge for Primary / Index */}
              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-md text-[10px] font-bold text-white shadow-xs">
                {idx === 0 ? "Cover Photo" : `#${idx + 1}`}
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                aria-label={`Remove photo ${idx + 1}`}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white shadow-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer"
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Device Upload Area & Controls */}
      {photos.length < maxPhotos && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
            dragActive 
              ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 scale-[1.01]' 
              : isDark 
                ? 'border-neutral-700/80 hover:border-neutral-500 bg-neutral-900/50' 
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/70'
          }`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center gap-2 py-3">
              <Loader2 className="w-7 h-7 text-[var(--theme-primary)] animate-spin" />
              <span className="text-xs font-bold">Optimizing images from device...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--theme-primary)]/15 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30 shadow-inner">
                <Upload className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold">
                  Drag & drop your photos here, or browse from device
                </p>
                <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  Supports JPG, PNG, WebP up to 10 photos • Automatically optimized
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl btn-luxury text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Choose From Device</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isDark 
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-white/10' 
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>{showUrlInput ? 'Hide URL Input' : 'Add via Web Link'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Alternative URL Input Drawer */}
      {showUrlInput && photos.length < maxPhotos && (
        <form onSubmit={handleAddUrl} className="mt-3 flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste image link (e.g. https://... or /images/cars/...)"
            className={`flex-1 px-3.5 py-2 rounded-xl text-xs outline-none border font-medium ${
              isDark 
                ? 'bg-neutral-900 border-neutral-700 text-white focus:border-[var(--theme-primary)]' 
                : 'bg-white border-slate-300 text-slate-900 focus:border-[var(--theme-primary)]'
            }`}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl btn-luxury text-xs font-bold shrink-0 cursor-pointer"
          >
            Add Link
          </button>
        </form>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-red-400 font-semibold">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
