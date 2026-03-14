import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F8F9FC] border-t">
      {/* Top Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-bold text-lg mb-4 text-[#111827]">
            AIExamsNotesGenerator
          </h2>

          <p className="text-[#6B7280] text-sm mb-5 max-w-xs">
            Architecting the future of academic excellence through artificial
            intelligence enhanced design.
          </p>

          <div className="flex gap-4 text-gray-600 text-lg justify-center md:justify-start">
            <FaGithub />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold mb-4 text-[#111827]">Product</h3>
          <ul className="space-y-2 text-[#6B7280] text-sm">
            <li>Features</li>
            <li>Notes Generator</li>
            <li>Flashcards</li>
            <li>Study Guides</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4 text-[#111827]">Resources</h3>
          <ul className="space-y-2 text-[#6B7280] text-sm">
            <li>Documentation</li>
            <li>API</li>
            <li>Pricing</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-[#111827]">Company</h3>
          <ul className="space-y-2 text-[#6B7280] text-sm">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t py-5 px-6 text-sm text-[#6B7280] flex flex-col md:flex-row items-center md:justify-between max-w-6xl mx-auto gap-2 md:gap-0">
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} AIExamsNotesGenerator. All rights
          reserved.
        </p>
        <p className="text-center text-xs">English (US)</p>
      </div>
    </footer>
  );
};

export default Footer;
