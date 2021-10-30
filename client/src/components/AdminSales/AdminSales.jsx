import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { MdDeleteForever } from 'react-icons/md';
import { deleteOrder } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { LOCALHOST_URL } from "../../redux/constants/index"
import "./AdminSales.css"


const AdminSales = () => {

    //-------------  PARA TRAER TODAS LAS ORDENES

    const [ordenes, setOrdenes] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`${LOCALHOST_URL}/orders`)
            setOrdenes(request.data.map(el => el))
            return request
        }
        fetchData();
    }, []);


    //-------------  PARA ELIMINAR ORDENES

    const dispatch = useDispatch();

    const handleDeleteOrder = (id) => {
        dispatch(deleteOrder(id));
    }


    //-------------  PARA ACTUALIZAR EL STATUS DE LAS ORDENES




    const columns = [
        {
            name: "User",
            selector: "user",
            sortable: true
        },
        {
            name: "Name",
            selector: "items[0].name",
            sortable: true
        },
        {
            name: "Price by unit",
            selector: "items[0].price",
            sortable: true
        },
        {
            name: "Quantity",
            selector: "items[0].qty",
            sortable: true
        },
        {
            name: "Total price",
            selector: "totalPrice",
            sortable: true
        },
        {
            name: "Status",
            selector: "status",
            sortable: true
        },
        {
            name: "Actions",
            cell: row => (<div className="actions">
                <form>
                    <select type="button">
                        <option value="">Not processed</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Dispatched</option>
                    </select>
                    <input
                        type="submit"
                        value="Update"
                    />
                </form>
                <button type="button" onClick={() => {
                    handleDeleteOrder(row._id);
                }}
                >
                    <MdDeleteForever />
                </button>
            </div>)
        }
    ]

    return (
        <>
            <div className="admin-sales-body">
                <DataTable
                    columns={columns}
                    data={ordenes}
                    title="My sales"
                    striped
                    highlightOnHover
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 8]}
                    pagination
                    responsive
                />
            </div>
        </>
    )
}

export default AdminSales