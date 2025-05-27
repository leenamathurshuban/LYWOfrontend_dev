import React, { useState } from 'react';
import { FaSearchPlus, FaSearchMinus, FaPrint, FaDownload } from 'react-icons/fa';

const Step2 = ({candidateDetails}) => {
  const basePdfUrl = encodeURIComponent(`https://bittrend.shubansoftware.com${candidateDetails?.resume}`);
  const [zoom, setZoom] = useState(100);

  const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${basePdfUrl}#zoom=${zoom}`;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25));
  return (
     <div>
      {/* <div style={{ margin: '10px 0', textAlign: 'center' }}>
        <button onClick={handleZoomOut} >Zoom Out</button>
        <button onClick={handleZoomIn} >Zoom In</button>
      </div> */}
      <iframe
        key={zoom} // force reload on zoom change
        src={viewerUrl}
        width="100%"
        height="900px"
        title="PDF Resume"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  )
}

export default Step2