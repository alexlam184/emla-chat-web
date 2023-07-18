import SemtronLogo from "../assets/images/semtron_logo.png";

/* The Navigation Bar */
function NavigationBar() {
  return (
    <nav className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-300 to-blue-100">
      {/* Semtron Icon */}
      <img
        src={SemtronLogo}
        alt="SemtronLogo"
        className="h-full w-[97%] sm:w-auto"
      />
    </nav>
  );
}

export default NavigationBar;
