import { Storage } from '@google-cloud/storage';
import path from 'path';

// Set up Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(
    process.cwd(),
    './secrets/autorizo-441221-543456ed3158.json'
  ), // Root path
});
const bucket = storage.bucket('autorizo-avatar'); // Replace with your bucket name

export const uploadImageToStorage = async (
  userId: string,
  imageBuffer: Buffer
): Promise<{ fileName: string; imageUrl: string }> => {
  const fileName = `${userId}-${Date.now()}.jpeg`; // Unique file name to avoid collisions
  const file = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const blobStream = file.createWriteStream({
      resumable: false,
      contentType: 'image/jpeg',
    });

    blobStream.on('finish', async () => {
      try {
        const imageUrl = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60, // 1 hour
        });
        resolve({ fileName, imageUrl: imageUrl[0] });
      } catch (error: Error | any) {
        reject(new Error('Error generating signed URL: ' + error.message));
      }
    });

    blobStream.on('error', (err) => {
      reject(new Error('Storage error: ' + err.message));
    });

    blobStream.end(imageBuffer);
  });
};
