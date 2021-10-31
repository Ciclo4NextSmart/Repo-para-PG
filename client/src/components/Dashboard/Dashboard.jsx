import React, { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import DataTable from "react-data-table-component";
import FormCreateProducts from '../FormCreateProducts/FormCreateProducts';
import FormUpdateProducts from '../FormUpdateProduct/EditableRow';
import { useDispatch, useSelector, } from "react-redux";
import { deleteProduct, getAbout } from "../../redux/actions";
import { MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import AlertPopup from '../AlertPopups/AlertPopups';
import Modal from "../Modal/Modal";
import FormAbout from '../FormAbout/FormAbout';
import { MdOutlineAddCircle } from 'react-icons/md'
import "./Dashboard.css";

export default function Dashboard() {

    const [idToUpdate, setidToUpdate] = useState('')

    const [pending, setPending] = useState(true);

    useEffect(() => {
        dispatch(getAbout());
        const timeout = setTimeout(() => {
            setPending(false);
        }, 0.5000);
        return () => clearTimeout(timeout);
    }, []);

    const dispatch = useDispatch()

    const products = useSelector(state => state.products);

    const [items, setItems] = useState(products);

    const columns = [
        {
            name: "Name",
            selector: "name",
            sortable: true
        }
        ,
        {
            name: "Brand",
            selector: "brand",
            sortable: true
        },
        {
            name: "Model",
            selector: "model",
            sortable: true
        },
        {
            name: "Category",
            selector: "category",
            sortable: true
        }
        ,
        {
            name: "Price",
            selector: "price",
            sortable: true
        },
        {
            name: "Stock",
            selector: "stock",
            sortable: true
        },
        {
            name: "Actions",
            cell: row => (<div className="actions">
                <button type="button" onClick={() => {
                    handleOpenPopupUpdate()
                    setidToUpdate(row._id)
                }}><FaRegEdit /></button>

                <button type="button" onClick={() => {
                    handleDeleteProduct(row._id);
                    handeOpenAlertDelete();
                }}
                >
                    <MdDeleteForever />
                </button>
            </div>)
        },

        /*  {
             name: "",
             selector: "image",
             sortable: true
         } */
    ]

    useEffect(() => {
        setItems(products)
    }, [products])

    const handleDeleteProduct = (id) => {
        setidDelete(id);
    }

    // estado para mostrar popup Crear
    const [showPopupCreate, setShowPopupCreate] = useState(false);

    const handleOpenPopupCreate = () => {
        setShowPopupCreate(true)
    }
    const handleClosePopupCreate = () => {
        setShowPopupCreate(false)
    }

    // estado para mostrar popup Update
    const [showPopupUpdate, setShowPopupUpdate] = useState(false);

    const handleOpenPopupUpdate = () => {
        setShowPopupUpdate(true)
    }
    const handleClosePopupUpdate = () => {
        setShowPopupUpdate(false)
    }

    // todo para borrar
    const [idDelete, setidDelete] = useState(null)

    const [activeAlertDelete, setactiveAlertDelete] = useState(false);
    const handeOpenAlertDelete = () => {
        setactiveAlertDelete(!activeAlertDelete)
    }

    const [successDelete, setsuccessDelete] = useState(false);
    const handleDeleteSuccess = () => {
        setsuccessDelete(!successDelete)
    }

    useEffect(() => {
        if (successDelete) {
            dispatch(deleteProduct(idDelete));

            handleDeleteSuccess();
        }
    }, [successDelete])

    //Popup de creado
    const [successCreated, setsuccessCreated] = useState(false)
    const showPopup = (boolean) => setsuccessCreated(boolean)

    // estado para mostrar popup About
    const [showPopupUpdateAbout, setShowPopupUpdateAbout] = useState(false);

    const handleOpenPopupUpdateAbout = () => {
        setShowPopupUpdateAbout(true)
    }
    const handleClosePopupUpdateAbout = () => {
        setShowPopupUpdateAbout(false)
    }

    return (
        <>

            <div className="table">
                <div className="add-button-div">
                    <button className='create add-button' onClick={handleOpenPopupCreate}><MdOutlineAddCircle size={28} /></button>
                </div>
                <DataTable
                    columns={columns}
                    data={items}
                    progressPending={pending}
                    title="My products"
                    striped
                    highlightOnHover
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 8]}
                    pagination
                />
            </div>




            <ReactModal isOpen={showPopupCreate} className='reactModalContent' overlayClassName='reactModalOverlay'>
                <FormCreateProducts handleClosePopup={handleClosePopupCreate} showPopup={showPopup} />
            </ReactModal>

            <ReactModal isOpen={showPopupUpdate} className='reactModalContent' overlayClassName='reactModalOverlay'>
                <FormUpdateProducts handleClosePopup={handleClosePopupUpdate} id={idToUpdate} />
            </ReactModal>

            <AlertPopup
                activeAlert={activeAlertDelete}
                actionAlert='delete'
                handleOpenAlert={handeOpenAlertDelete}
                handleSuccess={handleDeleteSuccess}
            />

            <Modal
                show={successCreated}
                hideFunc={() => showPopup(false)}
                message='Product created with success!'
            />

            <ReactModal isOpen={showPopupUpdateAbout} className='reactModalContent' overlayClassName='reactModalOverlay'>
                <FormAbout handleClosePopup={handleClosePopupUpdateAbout} />
            </ReactModal>
        </>
    )
};