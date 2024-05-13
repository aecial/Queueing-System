import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import LoginDiv from "../components/LoginDiv";

const Report = () => {
  const [departments, setDepartments] = useState([]);
  const [isWindowSelected, setIsWindowSelected] = useState(false);
  const [selectedDept, setSelectedDept] = useState();
  const [months, setMonths] = useState([]);
  const [reportCount, setReportCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [since, setSince] = useState("");
  const [averageServiceTime, setAverageServiceTime] = useState();
  async function getDepartments() {
    try {
      const response = await fetch(`/api/departments`);
      const departments = await response.json();
      setDepartments(departments.departments);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getDepartments();
  }, []);
  async function getReport() {
    const response = await fetch(`/api/report`);
    const reportInformation = await response.json();
    setReportCount(reportInformation.reportCount);
    setSince(reportInformation.since.createdAt);
    setAverageServiceTime(reportInformation.reportAverage._avg.service_time);
  }
  useEffect(() => {
    getReport();
  }, []);
  async function handleSelect(dept) {
    if (dept === "") {
      setIsWindowSelected(false);
    }
    setIsWindowSelected(true);
    setSelectedDept(Number(dept));
    const response = await fetch(`/api/report/${dept}`);
    const reportInformation = await response.json();
    // Extract months from the response and set them into state
    if (reportInformation.months && reportInformation.months.length > 0) {
      setMonths(reportInformation.months.map((item) => item.month));
    } else {
      setMonths([]); // If no months are available, set state to empty array
    }

    if (reportInformation.reportCount === 0) {
      setReportCount(0);
      setSince("");
      setAverageServiceTime(0);
    } else {
      setReportCount(reportInformation.reportCount);
      setSince(reportInformation.since.createdAt);
      setAverageServiceTime(reportInformation.reportAverage._avg.service_time);
    }
  }
  async function monthSelect(dept, month) {
    const response = await fetch(`/api/report/${dept}/${month}`);
    const reportInformation = await response.json();
    if (reportInformation.reportCount === 0) {
      setReportCount(0);
      setSince("");
      setAverageServiceTime(0);
    } else {
      setReportCount(reportInformation.reportCount);
      setSince(reportInformation.since[0].createdAt);
      setAverageServiceTime(reportInformation.reportAverage._avg.service_time);
    }
  }

  function getMonthName(month) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1]; // Adjusting month value to match array index
  }
  if (sessionStorage.getItem("token")) {
    return (
      <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center text-4xl">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <div className="label">
                <span className="label-text text-4xl">Select Window:</span>
              </div>
              <select
                onChange={(e) => handleSelect(e.target.value)}
                className="select select-primary w-full max-w-xs text-lg"
              >
                <option value={""} selected>
                  ALL
                </option>
                {departments.map((department) => {
                  return (
                    <option key={department.id} value={department.id}>
                      Window {department.id}
                    </option>
                  );
                })}
              </select>
              {isWindowSelected && selectedDept !== "" ? (
                <select
                  onChange={(e) => monthSelect(selectedDept, e.target.value)}
                  className="select select-primary w-full max-w-xs text-lg mt-4"
                >
                  <option value={""} selected disabled>
                    SELECT MONTH
                  </option>
                  {months.map((month) => {
                    const monthName = getMonthName(month);
                    return (
                      <option key={month} value={month}>
                        {monthName}
                      </option>
                    );
                  })}
                </select>
              ) : null}
            </div>
            <div className="stats shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Tickets Completed</div>
                <div className="stat-value">{reportCount}</div>
                <div className="stat-desc">Since: {since.split("T")[0]}</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Average Service Time</div>
                <div className="stat-value text-secondary">
                  {averageServiceTime
                    ? averageServiceTime.toFixed(2) + "s"
                    : ""}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <LoginDiv />;
  }
};

export default Report;
