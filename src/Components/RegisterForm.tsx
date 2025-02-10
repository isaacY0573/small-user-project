import React, { useState, useEffect } from "react";

const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [countries, setCountries] = useState<{ name: string; flag: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<{ name: string; flag: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                if (!response.ok) throw new Error("Failed to fetch countries");
                const data = await response.json();
                const formattedData = data.map((country: any) => ({
                    name: country.name.common,
                    flag: country.flags.svg,
                }));
                setCountries(formattedData);
            } catch (error) {
                setError("Error fetching countries. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!event.target.closest("#countryDropdown")) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Password:", password);
        console.log("Selected Country:", selectedCountry?.name || "None");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-[400px] p-8 bg-white rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                {loading && <p className="text-center mt-4">Loading countries...</p>}

                {!loading && !error && (
                    <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="firstName" className="text-gray-600 font-medium">First Name</label>
                            <input
                                className="p-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                id="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastName" className="text-gray-600 font-medium">Last Name</label>
                            <input
                                className="p-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                id="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-600 font-medium">Password</label>
                            <input
                                className="p-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Country Dropdown */}
                        <div className="flex flex-col relative">
                            <label htmlFor="country" className="text-gray-600 font-medium">Country</label>
                            <div 
                                id="countryDropdown"
                                className="flex items-center p-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 cursor-pointer bg-white"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {selectedCountry && (
                                    <img 
                                        src={selectedCountry.flag} 
                                        alt={selectedCountry.name} 
                                        className="w-6 h-4 mr-2 rounded-sm"
                                    />
                                )}
                                <span className="flex-1">{selectedCountry?.name || "Select a country"}</span>
                            </div>
                            
                            {dropdownOpen && (
                                <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                                    {countries.map((country) => (
                                        <li 
                                            key={country.name} 
                                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                            onClick={() => {
                                                setSelectedCountry(country);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <img src={country.flag} alt={country.name} className="w-6 h-4 mr-2 rounded-sm"/>
                                            {country.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button type="submit" className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
