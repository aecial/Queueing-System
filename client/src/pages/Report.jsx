import React, { useEffect, useState } from "react";

const Report = () => {
  const [departments, setDepartments] = useState([]);
  const [reportCount, setReportCount] = useState();
  const [since, setSince] = useState("");
  const [averageServiceTime, setAverageServiceTime] = useState();
  async function getDepartments() {
    const response = await fetch(`/api/departments`);
    const departments = await response.json();
    setDepartments(departments.departments);
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
    const response = await fetch(`/api/report/${dept}`);
    const reportInformation = await response.json();
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
  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center">
      <div>
        <div class="label">
          <span class="label-text">Select Department:</span>
        </div>
        <select
          onChange={(e) => handleSelect(e.target.value)}
          className="select select-primary w-full max-w-xs"
        >
          <option value={""} selected>
            ALL
          </option>
          {departments.map((department) => {
            return <option value={department.id}>{department.name}</option>;
          })}
        </select>
      </div>
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Service Count</div>
          <div className="stat-value">{reportCount}</div>
          <div className="stat-desc">Since: {since.split("T")[0]}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Average Service Time</div>
          <div className="stat-value text-secondary">
            {averageServiceTime ? averageServiceTime.toFixed(2) + "s" : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
