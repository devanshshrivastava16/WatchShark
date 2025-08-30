import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Player = () => {
  const { type, id, season, episode } = useParams();
  const [selectedServer, setSelectedServer] = useState("server1");
  const [embedUrl, setEmbedUrl] = useState("");

  const servers = [
    { id: "server1", name: "VidSrc", baseUrl: "https://vidsrc.xyz/embed" },
    { id: "server2", name: "2Embed", baseUrl: "https://www.2embed.cc/embed" },
  ];

  useEffect(() => {
    let url = "";
    const server = servers.find((s) => s.id === selectedServer);

    if (server) {
      if (type === "movie") {
        if (server.name === "VidSrc") {
          url = `${server.baseUrl}/movie?tmdb=${id}&autoplay=1`;
        } else if (server.name === "2Embed") {
          url = `${server.baseUrl}/${id}`; // Using TMDB ID as per 2Embed docs
        }
      } else if (type === "tv" && season && episode) {
        if (server.name === "VidSrc") {
          url = `${server.baseUrl}/tv?tmdb=${id}&season=${season}&episode=${episode}&autoplay=1&autonext=1`;
        } else if (server.name === "2Embed") {
          url = `${server.baseUrl}tv/${id}&s=${season}&e=${episode}`;
        }
      } else if (type === "tv") {
        if (server.name === "VidSrc") {
          url = `${server.baseUrl}/tv?tmdb=${id}`;
        } else if (server.name === "2Embed") {
          url = `${server.baseUrl}tvfull/${id}`;
        }
      }
    }
    setEmbedUrl(url);
  }, [type, id, season, episode, selectedServer]);

  const handleServerChange = (e) => {
    setSelectedServer(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black">
      <div style={{ padding: "10px", color: "white" }}>
        <label htmlFor="server-select" style={{ marginRight: "10px" }}>
          Change Server:
        </label>
        <select
          id="server-select"
          value={selectedServer}
          onChange={handleServerChange}
          style={{
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {servers.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>
      </div>
      {embedUrl ? (
        <iframe
          key={embedUrl}
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
          title="Movie/Series Player"
        ></iframe>
      ) : (
        <div style={{ color: "white" }}>Loading player...</div>
      )}
    </div>
  );
};

export default Player;
