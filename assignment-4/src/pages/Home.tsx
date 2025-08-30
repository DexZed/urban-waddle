import { Link } from "react-router";

function Home() {
  return (
    <>
      <div
        className="hero h-dvh"
        style={{
          backgroundImage: "url(./bg-home.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <div className="banner">
              <div className="slider">
                <div className="items"><img src="/1.avif" alt="" /> </div>
              </div>
            </div>
            <div>
              <Link
                to={"/library"}
                className="btn btn-nutral btn-outline rounded-3xl"
              >
                Go To Library
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
