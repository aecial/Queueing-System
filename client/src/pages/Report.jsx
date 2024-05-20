import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Report = () => {
  const [departments, setDepartments] = useState([]);
  const [offices, setOffices] = useState([]);
  const [isOfficeSelected, setIsOfficeSelected] = useState(false);
  const [isWindowSelected, setIsWindowSelected] = useState(false);
  const [selectedDept, setSelectedDept] = useState();
  const [months, setMonths] = useState([]);
  const [reportCount, setReportCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [since, setSince] = useState("");
  const [averageServiceTime, setAverageServiceTime] = useState();
  const [initialReport, setInitialReport] = useState({
    reportCount: 0,
    since: "",
    averageServiceTime: 0,
  });
  async function getDepartments(office) {
    try {
      const response = await fetch(`/api/deptByOffice/${office}`);
      const departments = await response.json();
      setDepartments(departments.department);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getOffices() {
    try {
      const response = await fetch(`/api/offices`);
      const offices = await response.json();
      console.log(offices.offices);
      setOffices(offices.offices);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }
  useEffect(() => {
    getOffices();
  }, []);
  async function getReport() {
    const response = await fetch(`/api/report`);
    const reportInformation = await response.json();
    const initialData = {
      reportCount: reportInformation.reportCount,
      since: reportInformation.since.createdAt,
      averageServiceTime: reportInformation.reportAverage._avg.service_time,
    };
    setInitialReport(initialData);
    setReportCount(reportInformation.reportCount);
    setSince(reportInformation.since.createdAt);
    setAverageServiceTime(reportInformation.reportAverage._avg.service_time);
  }
  async function getReportByOffice(office) {
    const response = await fetch(`/api/reportByOffice/${office}`);
    const reportInformation = await response.json();
    setReportCount(reportInformation.reportCount);
    if (reportInformation.since == null) {
      setSince("N/A");
    } else {
      setSince(reportInformation.since.createdAt);
    }

    setAverageServiceTime(reportInformation.reportAverage._avg.service_time);
  }
  useEffect(() => {
    getReport();
  }, []);
  async function handleOfficeSelect(office) {
    if (office) {
      setIsOfficeSelected(true);
      getDepartments(office);
      getReportByOffice(office);
    } else {
      setIsOfficeSelected(false);
      setIsWindowSelected(false);
      setSelectedDept(null);
      setDepartments([]);
      setReportCount(initialReport.reportCount);
      setSince(initialReport.since);
      setAverageServiceTime(initialReport.averageServiceTime);
    }

    // const response = await fetch(`/api/report/${dept}`);
    // const reportInformation = await response.json();
    // // Extract months from the response and set them into state
    // if (reportInformation.months && reportInformation.months.length > 0) {
    //   setMonths(reportInformation.months.map((item) => item.month));
    // } else {
    //   setMonths([]); // If no months are available, set state to empty array
    // }

    // if (reportInformation.reportCount === 0) {
    //   setReportCount(0);
    //   setSince("");
    //   setAverageServiceTime(0);
    // } else {
    //   setReportCount(reportInformation.reportCount);
    //   setSince(reportInformation.since.createdAt);
    //   setAverageServiceTime(reportInformation.reportAverage._avg.service_time);
    // }
  }
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
  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center text-4xl">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className="label">
              <span className="label-text text-4xl">Select Office:</span>
            </div>
            <select
              onChange={(e) => handleOfficeSelect(e.target.value)}
              className="select select-primary w-full max-w-xs text-lg"
            >
              <option value={""} selected>
                ALL
              </option>
              {offices.map((office) => {
                return (
                  <option key={office.id} value={office.id}>
                    {office.name}
                  </option>
                );
              })}
            </select>
            {isOfficeSelected && (
              <>
                <div className="label">
                  <span className="label-text text-4xl">Select Window:</span>
                </div>
                <select
                  onChange={(e) => handleSelect(e.target.value)}
                  className="select select-primary w-full max-w-xs text-lg"
                >
                  <option value={""} selected disabled></option>
                  {departments.map((department) => {
                    return (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    );
                  })}
                </select>
              </>
            )}

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
              <div className="stat-value text-primary">{reportCount}</div>
              <div className="stat-desc">Since: {since.split("T")[0]}</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Average Service Time</div>
              <div className="stat-value text-secondary">
                {averageServiceTime
                  ? averageServiceTime.toFixed(2) + "s"
                  : "N/A"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
