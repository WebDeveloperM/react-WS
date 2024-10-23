import { data } from 'autoprefixer';
import React from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function Home({ messages }) {
    const navigate = useNavigate();

    const dateFormat = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`
    }


    return (

        <div>
            <ul className='grid grid-cols-12 gap-3 mt-10'>
                {messages?.map((data, index) => (
                    <li className='col-span-4' key={index}>{
                        <div className="block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white py-2">
                                {
                                    data.alias.substring(3, data.alias.indexOf(',', 2)).split(' ')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                        .join(' ')
                                }
                            </h5>

                            <div className='grid grid-cols-12'>
                                <div className='col-span-4'>
                                    JSHSHR:
                                    <p className='font-bold text-sm mt-1'>
                                        {data.alias.substring(data.alias.indexOf("1.2.860.3.16.1.2=") + "1.2.860.3.16.1.2=".length, data.alias.indexOf("1.2.860.3.16.1.2=") + "1.2.860.3.16.1.2=".length + 14)}
                                    </p>
                                </div>
                                <div className='col-span-4'>
                                    STIR:
                                    <p className='font-bold text-sm mt-1'>
                                        {data.alias.substring(data.alias.indexOf("uid=") + "uid=".length, data.alias.indexOf("uid=") + "uid=".length + 9)}
                                    </p>
                                </div>
                                <div className='col-span-4'>
                                    Mulkchilik turi:
                                    <p className='font-bold text-sm mt-1'>
                                        {data.alias.substring(data.alias.indexOf("1.2.860.3.16.1.2=") + "1.2.860.3.16.1.2=".length, data.alias.indexOf("1.2.860.3.16.1.2=") + "1.2.860.3.16.1.2=".length + 14)}
                                    </p>
                                </div>

                            </div>
                            <div className='grid grid-cols-12 mt-5'>
                                <div className='col-span-5'>
                                    Sertifikat raqami:
                                    <p className='font-bold text-sm mt-1'>
                                        {data.alias.substring(data.alias.indexOf("serialnumber=") + "serialnumber=".length, data.alias.indexOf("serialnumber=") + "serialnumber=".length + 8)}
                                    </p>
                                </div>
                                <div className='col-span-7'>
                                    Sertifikatning amal qilish muddati:

                                    <p className='font-bold text-sm mt-1'>
                                        {dateFormat(data.alias.substring(data.alias.indexOf("validfrom=") + "validfrom=".length, data.alias.indexOf("validfrom=") + "validfrom=".length + 19))}
                                        <span className='px-1'>-</span>
                                        {dateFormat(data.alias.substring(data.alias.indexOf("validto=") + "validto=".length, data.alias.indexOf("validto=") + "validto=".length + 19))}

                                    </p>
                                </div>
                            </div>
                            <p className='py-3'></p>
                            <GrLinkNext className='flex float-right right-2 text-4xl mr-5 rounded bg-blue-600 text-white p-1.5 cursor-pointer duration-200 hover:scale-110 ' onClick={() => navigate(`/id/${data.name}`)} />
                            <p className='py-5'></p>
                        </div>
                    }</li>
                ))}

            </ul>
        </div>


    )
}

export default Home