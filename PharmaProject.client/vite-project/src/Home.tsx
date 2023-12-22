import { Link } from "react-router-dom";
//import Pharmacy from "./Pharmacy";
import useFetch from "./UseFetch"
import IPharmacy from '../Interfaces/IPharmacy'
import '../node_modules/bootstrap-icons/icons/pencil-square.svg'
function Home() {
    // const [count, setCount] = useState(0)
    const fetchUrl = '';

    const { data, isLoading, error }: { data: IPharmacy[] | null, isLoading: boolean, error: boolean } = useFetch<IPharmacy[]>(fetchUrl);

    return (
        <>
            {error && <div> Error loading the page. </div>}
            {isLoading && <div> Loading... </div>}
            {data && <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Filled Prescriptions</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Updated Date</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>{data.map((pharma: IPharmacy) => (
                        <tr key={pharma.pharmacyId}>
                            <td scope="row">{pharma.name}</td>
                            <td> <div> {pharma.address}</div>
                                <div> {pharma.city}, {pharma.stateCode} {pharma.zip} </div>
                            </td>
                            <td>{pharma.filledPerscriptions}</td>
                            <td>{pharma.createdDate.toLocaleDateString()}</td>
                            <td>{pharma.updateDate.toLocaleDateString()}</td>
                            <td>
                                <Link to={`./Pharmacy/${pharma.pharmacyId}`}>
                                    <span>edit <i className="bi bi-pencil-square"></i></span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>}
        </>
    );
}

export default Home
