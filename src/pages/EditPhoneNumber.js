import React, { useEffect, useState } from 'react'
import Header from '../companents/Header'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/Api'
import urls from '../api/Urls'
 import { useSelector} from 'react-redux'

const EditPhoneNumber = () => {
    const [willEditPhone, setWillEditPhone] = useState(null)
    const { phoneId } = useParams()
    const { categoriesState } = useSelector(state => state)
     const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        surname: "",
        number: "",
        categoryId: categoriesState.categories[0].id
    })


    useEffect(() => {
        api.get(`${urls.phoneNumber}/${phoneId}`)
            .then((res) => {
                setWillEditPhone(res.data)
                setForm(res.data)
            })
            .catch((err) => {
                console.log(err)
                alert("Serverde Bir Hata Oluştu")
                navigate("/")
            })
    }, [])

    const EditHandle = (event) => {
        event.preventDefault()
        if (form.name === "" || form.surname === "" || form.number === "") {
            alert("İsim , Soyisim ve Numara Alanı Boş Bırakılamaz")
            return
        }

        const updatePhone = {
            id:willEditPhone.id,
            name: form.name,
            surname: form.surname,
            number: form.number
         }
        api.put(`${urls.phoneNumber}/${willEditPhone.id}`, updatePhone)
            .then((res) => {
                 navigate("/")
                document.location.reload()
            })
            .catch((err) => {
                alert("Güncelleme Sırasında Bir Hata Oluştu")
            })
    }

    if (willEditPhone === null) {
        return null
    }

    return (
        <>
            <Header />
            <form onSubmit={EditHandle}>
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
                        <button className='btn btn-success w-50' type='sumbit'>Güncelle</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditPhoneNumber