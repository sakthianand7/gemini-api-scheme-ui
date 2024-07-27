import React from 'react';
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import Header from "@cloudscape-design/components/header";
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";
import Cards from "@cloudscape-design/components/cards";

import {
    Container,
    ContentLayout,
    Modal
} from '@cloudscape-design/components';
import Box from "@cloudscape-design/components/box";
import SearchResultsPage from './SearchResultsPage';

const LOCAL_HOST = "http://localhost:8000"
let itemList = []
const SearchResults = (props) => {
    const [isLoading, setIsLoading] = React.useState(true);

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

                })

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                itemList = data;
                setIsLoading(false);

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchResults(`${LOCAL_HOST}/searchScheme`);

    }, []);

    return (<ContentLayout
    >
        <Container
        >
            <SpaceBetween direction="horizontal" size='xl' />
            <div hidden={isLoading}>
                <SearchResultsPage results={itemList} />
            </div>
            <div aria-live="polite" hidden={!isLoading}>
                <Box
                    margin={{ bottom: "xs", left: "l" }}
                    color="text-body-secondary"
                    textAlign="center"
                >
                    Searching for <strong>{query}</strong>
                </Box>
                <LoadingBar variant="gen-ai-masked" />
            </div>
            {props.chat}
        </Container>
    </ContentLayout>)
};

export default SearchResults;