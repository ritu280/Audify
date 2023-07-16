import React, { useState } from "react";
import { convertVideoToAudio } from "../utils/converter";

export default function LinkUpload() {
  const [videoUrl, setVideoUrl] = useState("");

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleConvert = async () => {
    // Call a function to convert the video to audio
    await convertVideoToAudio(videoUrl);
  };

  return (
    <div>
      <h1>Convert from Link</h1>
      <input
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={handleUrlChange}
      />
      <button onClick={handleConvert}>Convert to MP3</button>
    </div>
  );
}
