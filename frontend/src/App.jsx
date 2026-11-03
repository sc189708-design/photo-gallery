import React, { useState, useEffect, useReducer, useCallback, useMemo } from "react";
import { favoriteReducre } from "./favoriteReducre";
import useFetchPhotos from "./hooks/useFetchPhotos";
function App() {
  const { photo, loding, error } = useFetchPhotos();
  const [search, setSearch] = useState("");
  const [likePhotos, dispatch] = useReducer(favoriteReducre, JSON.parse(localStorage.getItem("favoriteReducre")) || [])

  const handleSerarch = useCallback((e) => {
    setSearch(e.target.value);
  }, [setSearch]);

  const findauthor = useMemo(() => {
    return photo.filter((item) =>
      item.author.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [photo, search]);

  const handleLiketoggle = (photoId) => {
    dispatch({
      type: "TOGGLE_FAV",
      photoId: photoId
    });
  };

  useEffect(() => {
    localStorage.setItem("favoriteReducre", JSON.stringify(likePhotos))
  }, [likePhotos])

  const handelDownload = async (download_url) => {
    try {
      const response = await fetch(download_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a');
      a.href = url;
      a.download = `${download_url || 'photo'}.jpg`
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(a);
    } catch (err) {
      console.error("Photo download field", err)
      alert('something is wrong plase try again')
    };
  };

  if (loding) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        picture are uploding plase wait...
      </div>
    );
  };
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <div className="text-red-500 text-2xl font-bold mb-2">Error occurred!</div>
        <p className="text-gray-700 text-lg bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full bg-indigo-600 min-h-15 flex items-center justify-between p-2 gap-3">
        <h1 className="text-2xl font-bold text-white tracking-tighter">Photo <span className="text-white">Gallery</span></h1>
        <input type="text"
          className="w-20 focus:w-64 min-w-15 bg-white  rounded-2xl  text-gray-700 p-2 border-none"
          value={search}
          onChange={handleSerarch}
          placeholder="Search" />
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold">
            SC
          </div>

          <span className="text-white text-xs font-medium text-center">
            Suraj Chandel
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 p-2">
        {findauthor.map((photo) => (
          <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden p-2" key={photo.id}>
            <img src={photo.download_url}
              alt={photo.author}
              className="w-full h-64 object-cover rounded-xl" />

            <h2 className="text-xl text-gray-800 ">{photo.author}</h2>

            <div className=" flex gap-5">
              <button
                onClick={() => handleLiketoggle(photo.id)}
                className="flex items-center gap-1 focus:outline-none transition-transform active:scale-95">
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  fill={likePhotos.includes(photo.id) ? "currentColor" : "none"}
                  viewBox=" 0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 transition-color duration-200 ${likePhotos.includes(photo.id) ? "text-red-500 " : " text-gray-400 hover:text-red-400"
                    }`}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span className="text-xs text-gray-500">
                  {likePhotos.includes(photo.id) ? "Liked" : "Like"}
                </span>
              </button>

              <button
                onClick={() => handelDownload(photo.download_url)}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg  text-xs font-medium transition-colors">
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  fill="none"
                  viewBox=" 0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;