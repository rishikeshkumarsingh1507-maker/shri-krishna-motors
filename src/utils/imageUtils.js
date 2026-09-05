/**
 * Image processing utilities for client-side device photo uploads.
 * Reads Files from file input, scales high-res phone/camera photos to optimal
 * web resolution (max 1600px width/height) and compresses to lightweight JPEGs
 * to avoid exceeding storage quotas while preserving high showroom fidelity.
 */

export const compressImageFile = (file, maxDimension = 1600, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('File is not a valid image'));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // High quality bicubic resampling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to web-optimized data URL
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file from device'));
    reader.readAsDataURL(file);
  });
};

/**
 * Process multiple files selected from device
 */
export const processMultipleImageFiles = async (fileList, maxCount = 10) => {
  const files = Array.from(fileList).slice(0, maxCount);
  const promises = files.map(file => compressImageFile(file));
  return Promise.all(promises);
};
