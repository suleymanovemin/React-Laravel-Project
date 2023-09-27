import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  const abortController = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts", {
          signal: abortController.signal,
        });
        setData(response.data.posts);
      } catch (error) {
        if (error.name === "AbortError") {
          // İstek iptal edildiğinde yapılacak işlemleri burada ele alabilirsiniz.
          console.log("İstek iptal edildi");
        } else {
          // Diğer hata durumları için işlem yapabilirsiniz.
          console.error("Hata oluştu:", error);
        }
      }
    };

    fetchData();

    return () => {
      // Component unmount olduğunda isteği iptal et
      abortController.abort();
    };
  }, []);

  // console.log(data);

  return (
    <div className="container mx-auto mt-8 max-w-7xl">
      <div className="grid grid-cols-4 gap-4">
        {data?.map((a) => (
          <div key={a.id} className="border rounded p-2">
            <div className="w-full h-full max-h-[240px] ">
              <Link to={`/details/${a.id}`}>
                <img
                  className="w-full h-full object-cover object-top"
                  src={`http://localhost:8000/uploads/${a.image}`}
                  alt=""
                />
              </Link>
            </div>
            <div>
              <Link
                to={`/details/${a.id}`}
                className="text-center block my-3 text-[20px] text-slate-400 hover:text-sky-400"
              >
                {a.title}
              </Link>
              <p className="text-center my-2 text-sky-400">{a.user.name} {a.user.surname}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
