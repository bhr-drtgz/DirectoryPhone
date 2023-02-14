import React, { useState } from 'react'
import Header from '../companents/Header'
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/Api';
import urls from '../api/Urls';
import actionTypes from './../redux/action/actionType';
import { useNavigate } from 'react-router-dom';


const AddPhoneNumber = () => {
    const { categoriesState } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        surname: "",
        number: "",
        categoryId: categoriesState.categories[0].id
    })

    const HandleSubmit = (event) => {
        event.preventDefault()
        console.log(form)
        if (form.name === "" || form.surname === "" || form.number === "") {
            alert("İsim , Soyisim ve Numara Alanı Boş Bırakılamaz")
            return
        }
        const newNumber = {
            ...form,
            id: String(new Date().getTime())
        }
        api
            .post(urls.phoneNumber, newNumber)
            .then((res) => {
                dispatch({
                    type: actionTypes.phoneNumberActions.ADD_PHONENUMBER, payload: newNumber
                })
                navigate("/")
            })
            .catch((err) => { })
    }

    return (
        <div>
            <Header />
            <div >
                <div className='d-flex aligne-item-center justify-content-center my-3'>
                    <h3 className=''>KİŞİ EKLE</h3>
                </div>
            </div>
            <form onSubmit={HandleSubmit}>
                <div className='container my-5'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Adı:</label>
                        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} type="text" className="form-control" id="name" placeholder="Ör: Bahri" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Soyadı:</label>
                        <input value={form.surname} onChange={(event) => setForm({ ...form, surname: event.target.value })} type="text" className="form-control" id="surname" placeholder="Ör: Dörtgöz" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Telefon Numarası:</label>
                        <input value={form.number} onChange={(event) => setForm({ ...form, number: event.target.value })} type="number" className="form-control" id="number" placeholder="Ör: 5556667788" />
                    </div>
                    {/* <select
                        defaultValue={categoriesState.categories[0].id}
                        value={form.categoryId} onChange={(event) =>
                            setForm({ ...form, categoryId: event.target.value })}
                        className='form-select'>
                        {
                            categoriesState.categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </select> */}
                    <div className='d-flex aligne-item-center justify-content-center my-5'>
                        <button className='btn btn-success w-50' type='sumbit'>KAYDET</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPhoneNumber