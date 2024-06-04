"use client";

import React from 'react';
import axios from 'axios';

const Header = () => {
  return (
    <header className="text-white py-4 text-center fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-blue-600 to-green-500">
      <h1 className="text-3xl font-bold">Dosyalarınızı Kolayca Dönüştürün</h1>
      <p className="text-lg">Ses, Video ve diğer Dosyalarınızı bir formattan diğerine çevrimiçi olarak ücretsiz dönüştürün!</p>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="text-white py-4 text-center fixed bottom-0 left-0 right-0 z-10 bg-gray-800">
      <p> ©2024 Image to PDF Converter. All rights reserved. @Halil Ibrahim</p>
    </footer>
  );
};

const Home = () => {
  const [file, setFile] = React.useState(null);
  const [pdfPath, setPdfPath] = React.useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPdfPath(response.data.path);
    } catch (error) {
      console.error('Failed to convert image to PDF', error);
      alert('Failed to convert image to PDF');
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-20 bg-gradient-to-b from-blue-900 to-blue-600 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              PDF Dönüştür
            </button>
          </form>
          {pdfPath && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Converted PDF</h2>
              <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">
                Download PDF
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;