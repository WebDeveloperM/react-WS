import React, { useRef } from 'react';
import QRCode from 'react-qr-code';

const QRCodeComponent = ({ qrValue, onGenerate }) => {
    const qrRef = useRef();

    const generateQRCode = () => {
        const svg = qrRef.current.querySelector('svg');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgData = new XMLSerializer().serializeToString(svg);

        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngUrl = canvas.toDataURL('image/png');
            onGenerate(pngUrl); // PNG-ni qaytarish
        };
    };

    return (
        <div>
            <div ref={qrRef}>
                <QRCode value={qrValue} size={128} />
            </div>
            <button onClick={generateQRCode}>Generate QR Code</button>
        </div>
    );
};

export default QRCodeComponent;
