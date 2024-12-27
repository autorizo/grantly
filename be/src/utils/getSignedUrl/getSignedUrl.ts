import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join(
    process.cwd(),
    './secrets/autorizo-441221-543456ed3158.json'
  ), // Root path
});

const bucket = storage.bucket('autorizo-avatar');

export const getSignedUrl = async (unsignedUrl: string) => {
  const file = bucket.file(unsignedUrl);

  const [signedUrl] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60, // 1 hour
  });

  return signedUrl;
};
