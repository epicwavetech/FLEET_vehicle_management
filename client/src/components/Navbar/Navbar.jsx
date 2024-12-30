import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Navbar.scss";
import { FaFileDownload } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";


const Navbar = ({ onSearch, onFetchAll, isFetchLoading, isSearchBtnLoading, handleDownloadXlsx }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSearchTerm("")
    };

    return (
        <div className="navbar">

            <h2 className="navbar-title">Clients Management</h2>
            <div className="working-nav">
                <form className="navbar-search" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder={`Search name/contact no/vehicle no`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="navbar-search-input"
                        required
                    />
                    <button type="submit" className="navbar-search-button" disabled={isSearchBtnLoading}>
                        {isSearchBtnLoading ? <div className="search-spinner"></div> : <IoSearch />}
                    </button>

                </form>

                <button className="fetch-all-btn" onClick={onFetchAll} disabled={isFetchLoading} >
                    {isFetchLoading ? <div className="fetch-spinner"></div> : "Fetch All Clients"}
                </button>
                <button className="download-btn"><FaFileDownload size={20} onClick={handleDownloadXlsx} /></button>

            </div>

        </div>
    );
};

// Prop validation
Navbar.propTypes = {
    onSearch: PropTypes.func.isRequired, // Ensure onSearch is a required function
    isSearchBtnLoading: PropTypes.bool.isRequired,
    isFetchLoading: PropTypes.bool.isRequired,
    onFetchAll: PropTypes.func.isRequired,
    handleDownloadXlsx: PropTypes.func.isRequired,


};

export default Navbar;
