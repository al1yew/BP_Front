import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { UserContext } from "../../contexts/user";

export default function Users() {

    const [users, setUsers] = useState([]);

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:37234/api/users/getall",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                params: {
                    "username": user.userName
                }
            })
            .then(res => setUsers(res.data))
    }, [])

    function handleDelete(id) {
        axios.delete(`http://localhost:37234/api/users/`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            params: {
                "id": id,
                "username": user.userName
            }
        })
            .then(res => setUsers(res.data))
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.error(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
            })
    }

    return (
        <div id="tablecontainer">
            {
                !users.length &&
                <div className="loader"></div>
            }

            <div className="container">
                <div className="row all">
                    <div className="top col-lg-12 col-12">
                        <div className="col-lg-2 col-6 left">
                            Users
                        </div>
                        <div className="col-lg-1 col-3 text-end right">
                            <Link to="/manage/users/create" className="btn btn-primary">
                                Create
                            </Link>
                        </div>
                    </div>
                    {
                        users.length &&
                        <div className="tablecontainer col-lg-12 col-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center">No</th>
                                        <th scope="col" className="text-center">Name</th>
                                        <th scope="col" className="text-center">Surname</th>
                                        <th scope="col" className="text-center">Email</th>
                                        <th scope="col" className="text-center">Phone</th>
                                        <th scope="col" className="text-center">Username</th>
                                        <th scope="col" className="text-center">Reset Password</th>
                                        <th scope="col" className="text-center">Update</th>
                                        <th scope="col" className="text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.map((data, index) => {
                                        return (
                                            <tr key={data?.id}>
                                                <th scope="row" className="text-center">{index + 1}</th>
                                                <td className="text-center">{data?.name}</td>
                                                <td className="text-center">{data?.surname}</td>
                                                <td className="text-center">{data?.email}</td>
                                                <td className="text-center">{data?.phoneNumber}</td>
                                                <td className="text-center">{data?.userName}</td>
                                                <td className="text-center">
                                                    <button type="button" className="btn btn-info" onClick={() => navigate(`/manage/users/resetpassword/${data?.id}`)}>
                                                        Reset Password
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" className="btn btn-warning" onClick={() => navigate(`/manage/users/update/${data?.id}`)}>
                                                        Update
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(data?.id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}