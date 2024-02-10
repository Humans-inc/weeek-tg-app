import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import upload from '../../assets/upload.svg';
import styles from './DropZone.module.scss';

const DropZone = () => {
  const [files, setFiles] = useState([]);
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

  return (
    <section>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className={styles.uploadFiles}>
        <input {...getInputProps()} />
        <img src={upload} alt="" />
        <p>Выбрать файлы</p>
      </div>
      <div>
        {files.length > 0 && files.map((file, index) => <p>{index}</p>)}
      </div>
    </section>
  );
};

export {DropZone};