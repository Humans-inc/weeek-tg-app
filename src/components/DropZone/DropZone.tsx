import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import upload from '../../assets/upload.svg';
import styles from './DropZone.module.scss';
import { FilePreview } from '../FilePreview/FilePreview';

export interface File {
  id: string;
  orig: string;
  name: string;
  size: number;
  uploadDate: string;
  url: string;
}

const DropZone = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 4,
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      const formData = new FormData();
      acceptedFiles.forEach((image) => formData.append('images', image));
      fetch('https://s1.hmns.in/upload', { method: 'POST', body: formData })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log({ bad: res.status });
          }
        })
        .then((data) => setFiles(data))
        .catch((e) => console.error(e));
    }
  }, [acceptedFiles]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  // {
  //   "id": "723230d9ce218da",
  //   "orig": "Frame 86.png",
  //   "name": "723230d9ce218da.png",
  //   "size": 170,
  //   "uploadDate": "2024-02-12T13:47:41.250Z",
  //   "url": "https://s1.hmns.in/files/723230d9ce218da.png"
  // }

  return (
    <section>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className={styles.uploadFiles}>
        <input {...getInputProps()} />
        <img src={upload} alt="" />
        <p>Выбрать файлы</p>
      </div>
      <div style={{ marginBottom: '40px' }}>
        {files.length > 0 &&
          files.map((file, index) => (
            <FilePreview {...file} key={`${file.size}-${index}`} />
          ))}
      </div>
    </section>
  );
};

export { DropZone };
