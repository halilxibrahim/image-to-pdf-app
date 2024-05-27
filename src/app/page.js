"use client"

import React from 'react';
import axios from 'axios';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-300 to-blue-300 text-white py-4 text-center fixed top-0 left-0 right-0 z-10">
      <h1 className="text-3xl font-bold">Image to PDF Converter</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center fixed bottom-0 left-0 right-0 z-10">
      <p>© 2024 Image to PDF Converter. All rights reserved. @Halil ibrahim</p>
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
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-2"
            />
            <button
              type="submit"
              className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 w-full"
            >
              Convert to PDF
            </button>
          </form>
          {pdfPath && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Converted PDF</h2>
              <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
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