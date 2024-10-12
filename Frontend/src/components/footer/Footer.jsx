const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white p-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-white pb-2 w-max">
            Useful Links
          </h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">Authors</li>
            <li className="cursor-pointer hover:text-gray-300">Blog</li>
            <li className="cursor-pointer hover:text-gray-300">About Us</li>
            <li className="cursor-pointer hover:text-gray-300">Contact Us</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-white pb-2 w-max">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">Egypet - Cairo</div>
            <div className="flex items-center">123-456-789</div>
            <div className="flex items-center">info@user.com</div>
          </div>
        </div>

        {/* About Us */}
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-white pb-2 w-max">
            About Us
          </h3>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis aperiam fugiat ullam distinctio iusto sunt, numquam,
            quis reiciendis pariatur error itaque? Voluptatem libero maiores
            eveniet fugiat provident architecto minima pariatur!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
