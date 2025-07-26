import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebase/config';
import { type ItemWithFiles, itemSchema } from '../pages/schemas/itemsSchemas';

interface UploadProgress {
  progress: number | null;
  error: Error | null;
  downloadURL: string | null;
}

const useFirebaseStorage = () => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: null,
    error: null,
    downloadURL: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const uploadFilesAndSaveData = async (itemDataWithFiles: ItemWithFiles) => {
    setIsUploading(true);
    const imageUrls: string[] = [];
    const files = itemDataWithFiles.itemImages || [];

    try {
      for (const file of files) {
        const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<string>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              setUploadProgress((prev) => ({ ...prev, progress }));
            },
            (error) => {
              console.error('Error uploading file:', error);
              setUploadProgress({ progress: null, error, downloadURL: null });
              setIsUploading(false);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', downloadURL);
              imageUrls.push(downloadURL);
              resolve(downloadURL);
            }
          );
        });
      }

      // Validar os dados antes de salvar no Firestore
      const itemDataToSave = itemSchema.parse({
        ...itemDataWithFiles,
        itemImages: imageUrls,
        createdAt: new Date(), // Ou serverTimestamp() se preferir
        id: crypto.randomUUID(), // Gere um ID único no frontend
      });

      const docRef = await addDoc(collection(db, 'items'), itemDataToSave);
      console.log('Document written with ID: ', docRef.id);
      setUploadProgress({ progress: 100, error: null, downloadURL: null });
      setIsUploading(false);
      return docRef.id;

    } catch (error) {
      console.error('Error uploading files or saving data:', error);
      setUploadProgress({ progress: null, error: error as Error, downloadURL: null });
      setIsUploading(false);
      throw error;
    }
  };

  return { uploadProgress, isUploading, uploadFilesAndSaveData };
};

export default useFirebaseStorage;