import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar.jsx';
import VideoCard from '../components/VideoCard.jsx';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api.js';

const Results = () => {
  const [page, setPage] = useState(1);
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('search_query');

  useEffect(() => {
    if (query) {
      const params = {
        query: query,
        token: page > 1 ? token : undefined,
      };

      api.get('/search', { params }).then((res) => {
        console.log(res);

        //* Verilerin devamını almamızı sağlayacak token state
        setToken(res.data.continuation);

        setData((prev) => prev.concat(res.data.data));
      });
    }
  }, [query, page]);

  console.log(page);

  return (
    <div className="flex gap-3">
      <SideBar />
      <div className=" mx-auto h-[90vh] overflow-auto">
        <h2 className="text-xl">
          <span>{query} için sonuçlar</span>
        </h2>
        <div className="flex flex-col justify-center">
          {data.map(
            (item) =>
              item.type === 'video' && (
                <VideoCard key={item.videoId} video={item} isRow={true} />
              )
          )}
          <button
            onClick={() => setPage(page + 1)}
            className="bg-zinc-600 py-2 px-5 rounded-md my-10 mx-3 hover:bg-zinc-900 transition"
          >
            Daha Fazla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
