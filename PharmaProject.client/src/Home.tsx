import { Link } from "react-router-dom";
import useFetch from "./UseFetch"
import IPharmacy from '../Interfaces/IPharmacy'
import { orgin } from './ConnectionString'

function Home() {

    const fetchUrl = orgin + '/Pharmacy';
    const { data, isLoading, error }: { data: IPharmacy[] | null, isLoading: boolean, error: boolean } = useFetch<IPharmacy[]>(fetchUrl);

    return (
        <>
            {error && <div> Error loading the page. </div>}
            {isLoading && <div> Loading... </div>}
            {data &&
                <div className="p-4 bg-white">
                    <table className="table table-hover table striped cols-lg text-center ">
                        <thead>
                            <tr>
                                <th scope="col" className="text-start col-lg" >Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Filled Prescriptions</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Updated Date</th>
                                <th scope="col" className="cols-sm"></th>
                            </tr>
                        </thead>
                        <tbody>{data.map((pharma: IPharmacy) => (
                            <tr key={pharma.pharmacyId}>
                                <td scope="row " className="text-start " >{pharma.name}</td>
                                <td>
                                    <div> {pharma.address}</div>
                                    <div> {pharma.city}, {pharma.stateCode} {pharma.zip} </div>
                                </td>
                                <td>{pharma.filledPerscriptions}</td>
                                <td>{new Date(pharma.createdDate).toLocaleDateString()}</td>
                                <td>{pharma.updatedDate ? new Date(pharma.updatedDate).toLocaleDateString() : 'N/A'}</td>
                                <td className="text-end cols-sm">
                                    <Link to={`./Pharmacy/${pharma.pharmacyId}`} className="link-primary">
                                        <span>Edit <i className="bi bi-pencil-square"></i></span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}

export default Home
