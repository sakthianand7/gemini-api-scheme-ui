import React from 'react';
import SpaceBetween from "@cloudscape-design/components/space-between";
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";
import {
    Container,
    ContentLayout,
    Modal
} from '@cloudscape-design/components';
import Box from "@cloudscape-design/components/box";
import SearchResultsPage from './SearchResultsPage';

const LOCAL_HOST = "http://localhost:8000";

const SearchResults = (props) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState([]);
    const [error, setError] = React.useState(null);

    const query = localStorage.getItem('searchQuery');
    const profile = localStorage.getItem('profile');

    React.useEffect(() => {
        const fetchResults = async (url) => {
            try {
                const messageBody = JSON.parse(profile);
                messageBody.query = query;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageBody)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setItemList(data);
                setIsLoading(false);

            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchResults(`${LOCAL_HOST}/searchScheme`);

    }, [query, profile]);

    return (
        <ContentLayout>
            <Container>
                <SpaceBetween direction="horizontal" size='xl' />
                {isLoading ? (
                    <div aria-live="polite">
                        <Box
                            margin={{ bottom: "xs", left: "l" }}
                            color="text-body-secondary"
                            textAlign="center"
                        >
                            Searching for <strong>{query}</strong>
                        </Box>
                        <LoadingBar variant="gen-ai-masked" />
                    </div>
                ) : error ? (
                    <Box
                        margin={{ bottom: "xs", left: "l" }}
                        color="text-danger"
                        textAlign="center"
                    >
                        <strong>Error:</strong> {error}
                    </Box>
                ) : (
                    <SearchResultsPage results={itemList} />
                )}
                {props.chat}
            </Container>
        </ContentLayout>
    );
};

export default SearchResults;
