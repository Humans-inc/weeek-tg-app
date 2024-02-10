/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from '@tinymce/tinymce-react';

const TinyMCE = ({ handleChange }: any) => {
  return (
    <Editor
      apiKey="v6gobd9x6i3c23v657raceriks3k7hul4wz2dybpu8pp03ni"
      init={{
        language: 'ru',
        height: 260,
        plugins: ['lists'],
        toolbar: 'blocks | bullist numlist',
        menubar: false,
        placeholder:
          'Приложите ссылку на страницу. Расскажите, каким должен быть результат',
      }}
      onChange={handleChange}
    />
  );
};

export {TinyMCE}