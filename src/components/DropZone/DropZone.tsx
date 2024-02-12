/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, FC } from 'react';
import { useDropzone } from 'react-dropzone';
import upload from '../../assets/upload.svg';
import styles from './DropZone.module.scss';
import { FilePreview } from '../FilePreview/FilePreview';

interface DropZoneProps {
  handleFiles: any;
}

const DropZone: FC<DropZoneProps> = ({ handleFiles }) => {
  const [files, setFiles] = useState<any[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 4,
  });

  useEffect(() => {
    handleFiles(files);
  }, [files]);

  const removeFile = (file: any) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

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
          files.map((file: any, index) => {
            const fileObj = Object.assign(file, {
              preview: URL.createObjectURL(file),
            });

            return (
              <div className={styles.fileWrap} key={`${file.size}-${index}`}>
                <FilePreview
                  orig={file.path}
                  size={file.size}
                  url={fileObj.preview}
                />
                <button className={styles.deleteImg} onClick={removeFile(file)}>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 6.55147L6 18.5515"
                      stroke="#292A2D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6.55147L18 18.5515"
                      stroke="#292A2D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export { DropZone };
