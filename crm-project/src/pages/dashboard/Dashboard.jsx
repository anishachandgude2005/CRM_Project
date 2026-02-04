export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container-fluid">


      <h2 className="mb-4">Dashboard Overview</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Total Leads</h5>
            <h3>120</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Total Customers</h5>
            <h3>85</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Tasks Pending</h5>
            <h3>34</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
