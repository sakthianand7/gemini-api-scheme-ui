import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import Header from "@cloudscape-design/components/header";

let itemList = [];

export default () => {
    const [
        selectedItems,
        setSelectedItems
    ] = React.useState();
    const [disabled, setDisabled] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        const fetchResults = async (url) => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

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
        fetchResults('http://localhost:8000/search');

    }, []);
    return (
        <Cards
            onSelectionChange={({ detail }) => {
                setSelectedItems(detail?.selectedItems ?? [])
                setDisabled(false);
            }
            }
            selectedItems={selectedItems}
            ariaLabels={{
                itemSelectionLabel: (e, i) => `select ${i.name}`,
                selectionGroupLabel: "Item selection"
            }}
            cardDefinition={{
                header: item => (
                    <Link href={item.website_url} fontSize="heading-m">
                        {item.name}
                    </Link>
                ),
                sections: [
                    {
                        id: "description",
                        header: "Details",
                        content: item => item.description
                    },
                    {
                        id: "eligibility",
                        header: "Eligibility",
                        content: item => item.eligibility
                    }
                ]
            }}
            cardsPerRow={[
                { cards: 1 },
                { minWidth: 500, cards: 2 }
            ]}
            items={itemList}
            loading={isLoading}
            loadingText="Loading schemes"
            trackBy="name"
            empty={
                <Box
                    margin={{ vertical: "xs" }}
                    textAlign="center"
                    color="inherit"
                >
                    <SpaceBetween size="m">
                        <b>Enable location access to get featured schemes</b>
                    </SpaceBetween>
                </Box>
            }
            selectionType="single"

            header={
                <Header
                    actions={
                        <SpaceBetween
                            direction="horizontal"
                            size="xs"
                        >
                            <Button variant="normal" disabled={disabled}>
                                Clear
                            </Button>
                            <Button variant="primary" disabled={disabled}>
                                Check Eligibility
                            </Button>
                        </SpaceBetween>
                    }
                >
                </Header>
            }
        />
    );
}