import { createContext, useEffect, useState } from "react";
import { categories } from "../constants/index";
import api from "../utils/api";


//*contextin temelini createcontext ile oluturduk
export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [videos, setVideos] = useState();
  const [error, setError] = useState(null);
  const [İsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const type = selectedCategory.type;
    const url =
      type === "home"
        ? "/home"
        : type === "trending"
        ? "/trending"
        : type === "category"
        ? `/search?query=${selectedCategory.name}`
        : "";

    api
      .get(url)
      .then((res) => setVideos(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);
  

  return (
    <VideoContext.Provider value={{ selectedCategory, setSelectedCategory , videos,error,İsLoading}}>
      {children}
    </VideoContext.Provider>
  );
};
