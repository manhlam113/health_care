import { useEffect, useState } from "react";
import FormFill from "./components/FormFill";
import { Routes, Route, Navigate } from "react-router-dom";
import Table from "./components/Table";

function App() {
  const dataTable = JSON.parse(localStorage.getItem("covidForm"));
  const [edit, setEdit] = useState(0);
  const [dataForm, setDataForm] = useState(dataTable ?? []);
  useEffect(() => {
    localStorage.setItem("covidForm", JSON.stringify(dataForm));
  }, [dataForm, edit]);

  return (
    <div className="container-fluid">
      <div className="container">
        <Routes>
          <Route path="*" element={<Navigate to={"/table"}></Navigate>}></Route>
          <Route
            path="/declaration"
            element={
              <FormFill
                dataForm={dataForm}
                setDataForm={setDataForm}
                setEdit={setEdit}
                edit={edit}
              ></FormFill>
            }
          ></Route>
          <Route
            path="/table"
            element={
              <Table
                dataForm={dataForm}
                setDataForm={setDataForm}
                dataTable={dataTable}
              ></Table>
            }
          ></Route>
          <Route
            path="/edit/:id"
            element={
              <FormFill
                dataForm={dataForm}
                setDataForm={setDataForm}
                setEdit={setEdit}
                edit={edit}
              ></FormFill>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
