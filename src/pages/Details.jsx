import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  let { id } = useParams();
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((response) => setdata(response));
  }, []);

  return (
    <div>
      Details {id}
      {data?.data?.user[0]?.title}
      {data?.data?.user[0]?.id}
    </div>
  );
};

export default Details;
