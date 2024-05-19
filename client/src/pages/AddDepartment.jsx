import { useState, useEffect } from "react";
import LoginDiv from "../components/LoginDiv";
import Loader from "../components/Loader";
const AddDepartment = () => {
  const [offices, setOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const firstGetWin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/offices`);
      const windowApi = await response.json();
      setOffices(windowApi.offices);
      console.log(offices);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    firstGetWin();
  }, []);
  if (sessionStorage.getItem("token") && isLoading === false) {
    return (
      <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center text-4xl">
        <label className="form-control w-full max-w-xs">
          <form action="/api/addDepartment" method="post">
            <select
              className="select select-bordered  focus:border-success w-96 text-3xl mb-4"
              name="office"
              required
            >
              <option value={""} disabled selected>
                SELECT OFFICE
              </option>
              {offices.map((office) => {
                return <option value={office.id}>{office.name}</option>;
              })}
            </select>
            <div className="label">
              <span className="label-text text-4xl text-white">
                Window Name:
              </span>
            </div>
            <input
              type="text"
              placeholder="F1"
              name="name"
              className="input input-bordered focus:border-success w-96 text-3xl uppercase"
              required
            />
            <div className="label mt-5">
              <span className="label-text text-4xl text-white">
                Window Service:
              </span>
            </div>
            <input
              type="text"
              placeholder="Get Business Permit"
              name="description"
              className="input input-bordered focus:border-success w-96 text-3xl uppercase"
              required
            />
            <button
              type="submit"
              className="btn btn-primary mt-8 w-96 text-2xl"
            >
              Add
            </button>
          </form>
        </label>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default AddDepartment;
