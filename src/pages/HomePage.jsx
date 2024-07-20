import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import Header from "@cloudscape-design/components/header";

import {
    Container,
    ContentLayout
} from '@cloudscape-design/components';
let itemList = [];

const LOCAL_HOST = "http://localhost:8000"

export default (props) => {
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
        fetchResults(`${LOCAL_HOST}/search`);

    }, []);

    async function checkEligibility(url, schemeName) {
        const messageBody = props.profile;
        messageBody.governmentScheme = schemeName;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageBody)

        })
        const result = await response.json();
        console.log(result);
    }

    return (
        <ContentLayout
            header={
                <Header variant="h2" textAlign="center">
                    Benefict: Unlock Government Benefits You Deserve
                </Header>
            }
        >
            <SpaceBetween direction="horizontal" size='l' />
            <Container
                header={
                    <Header variant="h3" description="Government schemes with high public interest or social impact">
                        Featured Schemes
                    </Header>
                }
            >
                <Cards
                    onSelectionChange={({ detail }) => {
                        setSelectedItems(detail.selectedItems);
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
                                    <Button variant="normal" disabled={disabled} onClick={() => {
                                        setSelectedItems()
                                        setDisabled(true)
                                    }
                                    }>
                                        Clear
                                    </Button>
                                    <Button variant="primary" disabled={disabled} onClick={() => {
                                        checkEligibility(`${LOCAL_HOST}/chat`, selectedItems[0].name);
                                    }}>
                                        Check Eligibility
                                    </Button>
                                </SpaceBetween>
                            }
                        >
                        </Header>
                    }
                />

            </Container>
        </ContentLayout>

    );
}