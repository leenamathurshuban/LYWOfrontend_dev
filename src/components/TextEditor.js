import React, { useState,useEffect } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

const TextEditor = ({data,onUpdate}) => {
  const [editorValue, setEditorValue] = useState(data || ''); 
  const [errorMessage, setErrorMessage] = useState(''); 




  const maxWords = 500; 

  const handleChange = (value) => {
    console.log("handlechange----------",value)
    const wordCount = getWordCount(value); 

    if (wordCount <= maxWords) {
      setEditorValue(value); 
      setErrorMessage(''); 
      onUpdate(value)
    } else {
      setErrorMessage('You have reached the maximum limit of 500 words.'); 
    }
  };

  const getWordCount = (text) => {
    const plainText = text.replace(/<[^>]+>/g, ''); 
    return plainText.length; 
  };

  const wordCount = getWordCount(editorValue); 

  console.log("editorValue---------",editorValue)


    // Sync the local editorValue state with the incoming data prop
  useEffect(() => {
    if (data !== editorValue) {
      setEditorValue(data);
    }
  }, [data]); // Only update when 'data' changes

  return (
    <div style={{ width: '100%', height: '200px', margin: '0 auto' }}>
      <ReactQuill
        value={editorValue}
        onChange={handleChange} 
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
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
      {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div> }
    </div>
  );
};

export default TextEditor;






// import React, { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useSelector } from 'react-redux';

// const TextEditor = ({ data, onUpdate }) => {
//   const [editorValue, setEditorValue] = useState(data || ''); // Initialize editorValue with data prop
//   const [errorMessage, setErrorMessage] = useState('');
//   const maxWords = 500;

//   // Sync the local editorValue state with the incoming data prop
//   useEffect(() => {
//     if (data !== editorValue) {
//       setEditorValue(data);
//     }
//   }, [data]); // Only update when 'data' changes

//   const handleChange = (value) => {
//     const wordCount = getWordCount(value);

//     if (wordCount <= maxWords) {
//       setEditorValue(value);
//       setErrorMessage('');
//       onUpdate(value); // Pass the updated value to parent (for Redux or other use)
//     } else {
//       setErrorMessage('You have reached the maximum limit of 500 words.');
//     }
//   };

//   const getWordCount = (text) => {
//     const plainText = text.replace(/<[^>]+>/g, ''); // Strip HTML tags to count only words
//     return plainText.length;
//   };

//   const wordCount = getWordCount(editorValue);

//   return (
//     <div style={{ width: '100%', height: '200px', margin: '0 auto' }}>
//       <ReactQuill
//         value={editorValue} // Make sure value is controlled via editorValue state
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
//       {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
//     </div>
//   );
// };

// export default TextEditor;
