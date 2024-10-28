import React, { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

const WordEditor = () => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    // Word faylini yuklash
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Rasm yuklash
    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    // Word faylga rasmni qo'shish
    const addImageToWord = async () => {
        if (!file || !image) {
            alert("Fayl va rasm yuklang!");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const content = event.target.result;
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            // Rasmni oxirgi paragrafiga qo‘shish
            const imageTag = `<w:p><w:r><w:drawing><wp:inline><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:blipFill><a:blip r:embed="${image}"/></pic:blipFill></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
            doc.setData({ image: imageTag });

            try {
                doc.render();
                const updatedContent = doc.getZip().generate({ type: 'blob' });
                saveAs(updatedContent, 'updated_document.docx');
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Word fayliga rasm qo‘shish</h1>
            <input type="file" accept=".docx" onChange={handleFileChange} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={addImageToWord}>Rasmni qo'shish va yuklab olish</button>
        </div>
    );
};

export default WordEditor;
