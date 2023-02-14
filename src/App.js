import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import api from "./api/Api";
import urls from "./api/Urls";
import actionTypes from "./redux/action/actionType";
import AddPhoneNumber from './pages/AddPhoneNumber';
import EditPhoneNumber from "./pages/EditPhoneNumber";

function App() {
  const dispatch = useDispatch()
  const { phoneNumberState, categoriesState } = useSelector(state => state)

  useEffect(() => {
    dispatch({ type: actionTypes.phoneNumberActions.GET_PHONENUMBER_START })
    api.get(urls.phoneNumber)
      .then((res) => {
        dispatch({ type: actionTypes.phoneNumberActions.GET_PHONENUMBER_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: actionTypes.phoneNumberActions.GET_PHONENUMBER_FAIL, payload: "Serverde Bir Hata Oluştu" })
      })

    dispatch({ type: actionTypes.categoryActions.GET_CATEGORİES_START })
    api.get(urls.categories)
      .then((res) => {
        dispatch({ type: actionTypes.categoryActions.GET_CATEGORİES_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: actionTypes.categoryActions.GET_CATEGORİES_FAIL, payload: "Serverde Bir Hata oluştu" })
      })

  }, [])

  if (phoneNumberState.success === false || categoriesState.success === false) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-phone" element={<AddPhoneNumber />} />
        <Route path="/edit-phone/:phoneId" element={<EditPhoneNumber />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
