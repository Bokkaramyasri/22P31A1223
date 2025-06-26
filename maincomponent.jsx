import React, { useState } from "react";
import axios from "axios";

function URLShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/shorten", {
        original_url: originalUrl,
      });

      setShortUrl(response.data.short_url);
    } catch (error) {
      console.error("Error shortening URL", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              alert("Copied to clipboard!");
            }}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default URLShortenerForm;