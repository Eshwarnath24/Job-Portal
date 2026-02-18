import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobsData] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null);


    const fetchJobsData = async () => {
        setJobsData(jobsData);
    };

    // Function to fetch company data
    const fetchCompanyData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } });

            if (data.success) {
                setCompanyData(data.company);

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchJobsData();

        const storedCompanyToken = localStorage.getItem('companyToken');

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }

    }, []);

    useEffect(() => {
        if (companyToken) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchCompanyData()
        }
    }, [companyToken])

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobsData,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

