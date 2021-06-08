import "../Home.css";
function Home() {
  return (
    <div className="d-flex text-center text-white bg-dark" id="body">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main className="px-3">
          <h1>YelpCamp</h1>
          <p className="lead">
            {" "}
            Welcome to YelpCamp! Jump right in and explore our many campgrounds.
            Feel free to share some of your own and comment on others!
          </p>
          <a
            href="/campgrounds"
            className="btn btn-lg btn-secondary font-weight-bold border-white bg-white"
          >
            View Campgrounds
          </a>
        </main>

        <footer className="mt-auto text-white-50">
          <p>&copy; 2020 </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
