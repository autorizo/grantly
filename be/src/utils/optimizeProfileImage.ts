import sharp from 'sharp';

export const optimizeProfileImage = async (buffer: Buffer): Promise<Buffer> => {
  try {
    return await sharp(buffer)
      .resize(500, 500, { fit: 'inside' }) // Resize the image (adjust if needed)
      .toFormat('jpeg')
      .jpeg({ quality: 80 }) // Set image quality (adjust as needed)
      .toBuffer();
  } catch (error: Error | any) {
    throw new Error('Image optimization failed: ' + error.message);
  }
};
