import { FaFacebookSquare, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
      <div>
        <h1 className="w-full text-3xl font-bold text-themeturnede">
          TURNED-E!
        </h1>
        <p className="py-4">
          TURNED-E! Education aims to provide high-quality STEAM education
          services and solutions. We mainly offer tailormade STEAM course at all
          education levels.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <a href="https://www.facebook.com/TURNEDEEDUCATION/">
            <FaFacebookSquare size={30} />
          </a>
          {/* <FaInstagram size={30} />
          <FaGithubSquare size={30} /> */}
          <a href="https://www.linkedin.com/company/turned-e-education/?originalSubdomain=hk">
            <FaLinkedin size={30} />
          </a>
          <a href="https://www.youtube.com/@turned-eeducation5461">
            <FaYoutube size={30} />
          </a>
        </div>
      </div>
      {/* <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-gray-400">Solutions</h6>
          <ul>
            <li className="py-2 text-sm">Analytics</li>
            <li className="py-2 text-sm">Marketing</li>
            <li className="py-2 text-sm">Commerce</li>
            <li className="py-2 text-sm">Insights</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Support</h6>
          <ul>
            <li className="py-2 text-sm">Pricing</li>
            <li className="py-2 text-sm">Documentation</li>
            <li className="py-2 text-sm">Guides</li>
            <li className="py-2 text-sm">API Status</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Course</h6>
          <ul>
            <li className="py-2 text-sm">About</li>
            <li className="py-2 text-sm">Blog</li>
            <li className="py-2 text-sm">Jobs</li>
            <li className="py-2 text-sm">Press</li>
            <li className="py-2 text-sm">Careers</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Legal</h6>
          <ul>
            <li className="py-2 text-sm">Claim</li>
            <li className="py-2 text-sm">Policy</li>
            <li className="py-2 text-sm">Terms</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
