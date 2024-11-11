"use client";
import SignIn from "@/Dialogs/SignIn";
const Hero = () => {
  return (
    <div
      className="hero min-h-screen relative inset-x-0 top-0 z-0 bg-cover bg-center"
      style={{
        backgroundImage: "url(image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SignIn />
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome to <br /> R.C. Patel Institute of Technology
          </h1>
          <p className="mb-5 text-lg">
            Discover a world of innovation, excellence, and a commitment to
            academic success at SES's R.C. Patel Institute of Technology,
            Shirpur. Our mission is to empower aspiring engineers and tech
            leaders with top-notch education and hands-on experience in an
            environment designed for growth.
          </p>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              (
                document.getElementById("login") as HTMLDialogElement
              ).showModal();
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
