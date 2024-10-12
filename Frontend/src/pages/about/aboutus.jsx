
    const Card = ({ title, children, icon }) => {
        return (
            <div className="flex flex-col items-center h-80 bg-gray-50 rounded-lg shadow-lg p-6 mx-4 my-4 transition-transform transform hover:shadow-2xl hover:scale-105">
                <div className="flex items-center">
                    <div className="text-blue-600 text-4xl">{icon}</div>
                    <h2 className="text-blue-700 text-xl font-bold ml-2">{title}</h2>
                </div>
                <div className="text-gray-800 mt-10">{children}</div> 
            </div>
        );
    };



    const AboutUs = () => {
            return (
                <div className="flex flex-col items-center overflow-y-auto snap-y snap-mandatory h-screen p-4">
                    <h1 className="text-4xl text-blue-500 font-bold mb-10 mt-10">Welcome to Our Bookstore</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
                        <Card title="Our Mission" icon="📚">
                            <p className="font-serif"> 
                                To bring people together through the joy of reading by offering a diverse range of books for everyone.
                            </p>
                        </Card>
                        <Card title="Our Values" icon="💡">
                            <ul className="list-disc list-inside ">
                                <li className="mb-2 font-serif">
                                    <span className="font-semibold text-blue-700">Quality:</span> High-quality books from best-selling authors.
                                </li>
                                <li className="mb-2 font-serif">
                                    <span className="font-semibold text-green-600">Community:</span> Building a community of passionate readers.
                                </li>
                                <li className="mb-2 font-serif">
                                    <span className="font-semibold text-red-500">Diversity:</span> Celebrating diverse voices in literature.
                                </li>
                            </ul>
                        </Card>

                        <Card title="Get in Touch" icon="✉️">
                            <p className="font-serif">
                                We&apos;d love to hear from you! Reach out at 
                                <a href="mailto:contact@bookstore.com" className="text-blue-500 hover:underline"> contact@bookstore.com</a>.
                            </p>
                        </Card>
                    </div>
                </div>
            );
    };

export default AboutUs;
