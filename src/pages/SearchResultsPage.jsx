// components/SearchResultsPage.js
import React from 'react';
import './SearchResultsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Button from "@cloudscape-design/components/button";

const SearchResultsPage = ({ results }) => {
    return (
        <div className="search-results-page">
            {results.map((result, index) => (
                <div className="search-result-card" key={index}>
                    <div className="card-header">
                        <a href={result.schemeWebsiteUrl} target="_blank" rel="noopener noreferrer" className="result-title">
                            {result.schemeName}
                        </a>
                        <div className="result-url">{result.schemeWebsiteUrl}</div>
                    </div>
                    <div className="card-body">
                        <div className="result-details">{result.schemeDetails}</div>
                        <div className="result-eligibility">
                            <span className={result.eligible ? "eligible" : "not-eligible"}>
                                {result.eligible ? "Eligible" : "Not Eligible"}
                            </span>
                            <span> - {result.reason}</span>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Button>More info</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResultsPage;
