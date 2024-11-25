import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setResponse(res.data); // Set response from backend
      } else {
        alert("Error uploading video: " + res.statusText);
      }
    } catch (err) {
      console.error(err);
      alert(
        err.response && err.response.data && err.response.data.error
          ? `Error: ${err.response.data.error}`
          : "Unknown error occurred"
      );
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Video Violence Detection</h1>
      <p>Upload a video to check if violence is detected.</p>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button
        onClick={handleUpload}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload Video
      </button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results</h2>
          {response.violence_detected ? (
            <div>
              <p style={{ color: "red", fontWeight: "bold" }}>
                Violence Detected!
              </p>
              <img
                src={`http://127.0.0.1:5000/uploads/${response.frame_path}`}
                alt="Violence Frame"
                style={{
                  width: "300px",
                  border: "2px solid red",
                  borderRadius: "5px",
                }}
              />
            </div>
          ) : (
            <p style={{ color: "green", fontWeight: "bold" }}>
              No Violence Detected!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
