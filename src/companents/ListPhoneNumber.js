import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../api/Api';
import urls from '../api/Urls';
import actionTypes from '../redux/action/actionType';
import CustamModal from './CustamModal';


const ListPhoneNumber = () => {
    const { phoneNumberState, categoriesState } = useSelector(state => state)
    const dispatch = useDispatch()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [willDeletePhone, setWillDeletePhone] = useState("")


    const DeletePhone = (id) => {
        dispatch({ type: actionTypes.phoneNumberActions.DELETE_PHONENUMBER_START })
        api.delete(`${urls.phoneNumber}/${id}`)
            .then((res) => {
                dispatch({ type: actionTypes.phoneNumberActions.DELETE_PHONENUMBER_SUCCESS, payload: id })
            })
            .catch((err) => {
                dispatch({ type: actionTypes.phoneNumberActions.DELETE_PHONENUMBER_FAIL, payload: "Serverde Bir Hata Oluştu" })
            })
    }

    return (
        <div className='container my-5'>
            <div className='d-flex justify-content-end'>
                <div className='btn btn-success'>
                    <Link className='text-light' to='/add-phone'>KİŞİ EKLE</Link>
                </div>
            </div>
            <table className="table table-striped">
                <thead className='border-5 border-bottom border-warning'>
                    <tr>
                        <th>SIRA</th>
                        <th>ADI:</th>
                        <th>SOYADI:</th>
                        <th>TELEFON NUMARASI:</th>
                         <th>İŞLEMLER:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        phoneNumberState.phoneNumber.map((phone, index) => {
                            const myCategory = categoriesState.categories.find(
                                (item) => item.id === phone.categoryId);
                            return (
                                <tr key={phone.id}  >
                                    <th scope="row">{index + 1}</th>
                                    <td>{phone.name}</td>
                                    <td>{phone.surname}</td>
                                    <td>{phone.number}</td>
                                     <td>
                                        <button onClick={() => {
                                            setShowDeleteModal(true)
                                            setWillDeletePhone(phone.id)
                                        }} className='btn btn-danger'>Sil</button>
                                        <Link to={`edit-phone/${phone.id}`} type='button' className='btn btn-success'>Düzenle</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {showDeleteModal === true && (
                <CustamModal
                    title="Silme"
                    message="Silmek istediğinize emin misiniz?"
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={() => {
                        DeletePhone(willDeletePhone)
                        setShowDeleteModal(false)
                    }}
                />
            )}
        </div>
    )
}

export default ListPhoneNumber