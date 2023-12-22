import useFetch from "./UseFetch"


function Home() {
 // const [count, setCount] = useState(0)
    const fetchUrl = '';
    const { data, isLoading, error } = useFetch(fetchUrl)

    return (
        <>
            {error && <div> Error loading the page. </div>}
            {isLoading && <div> Loading... </div>}
            {data && <div> </div> }
        </>
  );
}

export default Home
