import React from 'react';
import '../css/SearchResultsPage.css';
import Button from "@cloudscape-design/components/button";
import Checkbox from "@cloudscape-design/components/checkbox";
import SpaceBetween from "@cloudscape-design/components/space-between";
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";
import { Modal } from '@cloudscape-design/components';
import Box from "@cloudscape-design/components/box";

const LOCAL_HOST = "http://localhost:8000";


const SearchResultsPage = ({ results }) => {
    const [visible, setVisible] = React.useState(false);
    const [selectedSchemes, setSelectedSchemes] = React.useState([]);
    const [isComparisonLoading, setIsComparisonLoading] = React.useState(false);
    const [comparisonData, setComparisonData] = React.useState("")

    const handleCheckboxChange = (index) => {
        setSelectedSchemes((prevSelectedSchemes) => {
            if (prevSelectedSchemes.includes(index)) {
                return prevSelectedSchemes.filter(i => i !== index);
            } else {
                return prevSelectedSchemes.length < 2 ? [...prevSelectedSchemes, index] : prevSelectedSchemes;
            }
        });
    };

    const allKeys = new Set(
        Object.values(comparisonData).flatMap(obj => Object.keys(obj))
    );

    const formatKey = (key) => {
        return key
            .replace(/_/g, ' ') // Replace underscores with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
    };

    async function compareSchemes(url) {
        const scheme1 = results[selectedSchemes[0]];
        const scheme2 = results[selectedSchemes[1]];
        setVisible(true);
        setIsComparisonLoading(true);
        const body = {
            scheme1: scheme1.schemeName,
            scheme2: scheme2.schemeName
        }
        console.log(body);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            setComparisonData(result);
            setIsComparisonLoading(false);
        } catch (error) {
            console.error('Eligibility check error:', error);
        }
    }

    return (
        <SpaceBetween size="xs">
            <Modal
                onDismiss={() => { setVisible(false); setComparisonData("") }}
                visible={visible}
            >
                <div aria-live="polite" hidden={!isComparisonLoading}>
                    <Box
                        margin={{ bottom: "xs", left: "l" }}
                        color="text-body-secondary"
                        textAlign="center"
                    >
                        Comparing the schemes...
                    </Box>
                    <LoadingBar variant="gen-ai-masked" />
                </div>
                {comparisonData && (<table className="modal-table">
                    <thead>
                        <tr>
                            <th className="modal-th">Fields</th>
                            {Object.keys(comparisonData).map((type) => (
                                <th key={type} className="modal-th">{type}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...allKeys].map((key) => (
                            <tr key={key}>
                                <td className="modal-key">{formatKey(key)}</td>
                                {Object.keys(comparisonData).map((type) => (
                                    <td key={type} className="modal-td">{comparisonData[type][key] || 'N/A'}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>)}
            </Modal>
            <div className="search-results-page">

                <div className='compare-scheme-button'>
                    <Button
                        disabled={selectedSchemes.length !== 2}
                        onClick={() => compareSchemes(`${LOCAL_HOST}/compareSchemes`)}
                    >
                        Compare Schemes
                    </Button>

                </div>
                <br />
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
                            <Checkbox
                                checked={selectedSchemes.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                            >
                                Select to compare
                            </Checkbox>
                        </div>
                    </div>
                ))}
            </div>
        </SpaceBetween>
    );
};

export default SearchResultsPage;
