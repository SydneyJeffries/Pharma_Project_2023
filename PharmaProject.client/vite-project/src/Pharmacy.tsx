import { useParams } from "react-router-dom";
import useFetch from "./UseFetch"


const Pharmacy = () =>  {
    // const [count, setCount] = useState(0)
    //@ts-expect-error ignore
    const { id } = useParams
    const fetchUrl = '' + id;
    const { data, isLoading, error } = useFetch(fetchUrl);


    return (
        <>
            {error && <div> Error loading the page. </div>}
            {isLoading && <div> Loading... </div>}
            {data && <div> </div> }
        </>
  );
}

export default Pharmacy
