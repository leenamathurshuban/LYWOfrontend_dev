// import React, { useState,useEffect } from 'react';
// import ReactQuill from 'react-quill'; 
// import 'react-quill/dist/quill.snow.css'; 

// const TextEditor = ({data,onUpdate}) => {
//   const [editorValue, setEditorValue] = useState(data || ''); 
//   const [errorMessage, setErrorMessage] = useState(''); 

//   const maxWords = 500; 

//   const handleChange = (value) => {
//     const wordCount = getWordCount(value); 

//     if (wordCount <= maxWords) {
//       setEditorValue(value); 
//       setErrorMessage(''); 
//       onUpdate(value)
//     } else {
//       setErrorMessage('You have reached the maximum limit of 500 words.'); 
//     }
//   };

//   const getWordCount = (text) => {
//     const plainText = text.replace(/<[^>]+>/g, ''); 
//     return plainText.length; 
//   };

//   const wordCount = getWordCount(editorValue); 

//   useEffect(() => {
//     if (data !== editorValue) {
//       setEditorValue(data);
//     }
//   }, [data]); 

//   return (
//     <div style={{ width: '100%', height: '200px', margin: '0 auto' }}>
//       <ReactQuill
//         value={editorValue}
//         onChange={handleChange} 
//         modules={{
//           toolbar: [
//             ['bold', 'italic', 'underline'],
//             ['link', 'image'],
//           ],
//         }}
//         placeholder="Write something..."
//         style={{ height: '360px' }} 
//       />
//       {/* Word Counter */}
//       <div className="words_limit" style={{ textAlign: 'right', marginTop: '10px' }}>
//         {wordCount}/{maxWords}
//       </div>
//       {/* Error Message */}
//       {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div> }
//     </div>
//   );
// };

// export default TextEditor;



import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

const TextEditor = ({ data, onUpdate }) => {
  const [editorValue, setEditorValue] = useState(data || ''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const maxWords = 500;

  const handleChange = (value) => {
    const wordCount = getWordCount(value);

    if (wordCount <= maxWords) {
      setEditorValue(value); 
      setErrorMessage(''); 
      onUpdate(value); // Pass HTML content to the parent
    } else {
      setErrorMessage('You have reached the maximum limit of 500 words.'); 
    }
  };

  const getWordCount = (text) => {
    // Strip HTML tags to count words
    const plainText = text?.replace(/<[^>]+>/g, ''); 
    return plainText?.split(/\s+/).filter(Boolean).length;
  };

  const wordCount = getWordCount(editorValue);

  useEffect(() => {
    if (data !== editorValue) {
      setEditorValue(data); // Pass raw HTML to ReactQuill
    }
  }, [data]);

  return (
    <div style={{ width: '100%', height: '200px', margin: '0 auto' }}>
      <ReactQuill
        value={editorValue}
        onChange={handleChange} 
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['link'],
          ],
        }}
        placeholder="Write something..."
        style={{ height: '360px' }} 
      />
      {/* Word Counter */}
      <div className="words_limit" style={{ textAlign: 'right', marginTop: '10px' }}>
        {wordCount}/{maxWords}
      </div>
      {/* Error Message */}
      {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
    </div>
  );
};

export default TextEditor;
