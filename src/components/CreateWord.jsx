import React from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const CreateWordDocument = () => {
    const createDocument = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun("Bu yangi yaratildi va tahrirlangan hujjat."),
                                new TextRun({
                                    text: " Bu esa qalin yozuv.",
                                    bold: true,
                                }),
                            ],
                        }),
                        new Paragraph({
                            text: "Bu yangi sahifada yozilgan matn.",
                        }),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, 'NewDocument.docx');
    };

    return <button onClick={createDocument}>Create Word Document</button>;
};

export default CreateWordDocument;
