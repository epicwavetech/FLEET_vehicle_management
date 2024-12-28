import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Navbar.scss";

const Navbar = ({ onSearch, onFetchAll, isFetchLoading, isSearchBtnLoading }) => {
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
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search by name, contact no, or email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="navbar-search-input"
                    required
                />
                <button type="submit" className="navbar-search-button" disabled={isSearchBtnLoading}>
                    {isSearchBtnLoading ? <div className="search-spinner"></div> : "Search"}
                </button>
            </form>

            <button className="fetch-all-btn" onClick={onFetchAll} disabled={isFetchLoading} >
                {isFetchLoading ? <div className="fetch-spinner"></div> : "Fetch All Clients"}
            </button>
        </div>
    );
};

// Prop validation
Navbar.propTypes = {
    onSearch: PropTypes.func.isRequired, // Ensure onSearch is a required function
    isSearchBtnLoading: PropTypes.bool.isRequired,
    isFetchLoading: PropTypes.bool.isRequired,
    onFetchAll: PropTypes.func.isRequired,


};

export default Navbar;
