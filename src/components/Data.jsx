import React from 'react'
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function Data() {
  const { id } = useParams();
  return (
    <div className='container mx-auto my-10'>
    <QRCodeSVG value="https://bnpz.uz/" size="256" />
    </div>
  )
}
