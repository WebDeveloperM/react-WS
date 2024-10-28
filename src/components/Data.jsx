import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toSvg } from 'html-to-image';
export default function Data() {


  const [inputValue, setInputValue] = useState('');
  const qrRef = useRef();

  // Function to handle QR code download as an image
  const downloadQRCode = () => {
    toSvg(qrRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode.svg';
        link.click();
      })
      .catch((err) => {
        console.error('Error downloading the QR code:', err);
      });
  };
  const { id } = useParams();
  return (
    <div className='container mx-auto my-10'>
      <div ref={qrRef} className=''>

        <QRCodeSVG value="https://bnpz.uz/" 
          bgColor="#ffffff" // Background color
          fgColor="#000000" // Foreground color
          level="H" />
      </div>


      <button onClick={downloadQRCode} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Download QR Code
      </button>
    </div>
  )
}
