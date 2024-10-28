import React, { useState } from 'react';
import mammoth from 'mammoth';

const WordEditor = () => {
  const [htmlContent, setHtmlContent] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setHtmlContent(result.value);
    }
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileUpload} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default WordEditor;
