import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import Header from "@cloudscape-design/components/header";
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";

import {
    Container,
    ContentLayout,
    Modal
} from '@cloudscape-design/components';

const LOCAL_HOST = "http://localhost:8000";

export default (props) => {
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [disabled, setDisabled] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isEligibilityLoading, setIsEligibilityLoading] = React.useState(false);
    const [isModelVisible, setIsModalVisible] = React.useState(false);
    const [eligibilityResult, setEligibilityResult] = React.useState();
    const [itemList, setItemList] = React.useState([]);

    React.useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`${LOCAL_HOST}/search`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setItemList(data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();

        return () => {
            // Cleanup if needed
        };
    }, []);

    async function checkEligibility(url, schemeName) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...props.profile, governmentScheme: schemeName })
            });
            const result = await response.json();
            setEligibilityResult(result);
        } catch (error) {
            console.error('Eligibility check error:', error);
        } finally {
            setIsEligibilityLoading(false);
        }
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
                <Modal
                    visible={isModelVisible}
                    onDismiss={() => {
                        setIsModalVisible(false);
                        setEligibilityResult();
                    }}
                    header="Eligibility Status"
                >
                    <div aria-live="polite" hidden={!isEligibilityLoading}>
                        <Box
                            margin={{ bottom: "xs", left: "l" }}
                            color="text-body-secondary"
                            textAlign="center"
                        >
                            Checking Eligibility...
                        </Box>
                        <LoadingBar variant="gen-ai-masked" />
                    </div>

                    {eligibilityResult && (
                        <div className="scheme-details">
                            <p><strong>Scheme Name:</strong> {eligibilityResult.schemeName}</p>
                            <p><strong>Profile:</strong> {props.currentProfile}</p>
                            <p>
                                <strong>Eligibility: </strong>
                                {eligibilityResult.eligibility ? (
                                    <span className="icon green"><strong>✔️</strong></span>
                                ) : (
                                    <span className="icon red"><strong>❌</strong></span>
                                )}
                            </p>
                            <p><strong>Reason:</strong> {eligibilityResult.reason}</p>
                        </div>
                    )}
                </Modal>
                <Cards
                    onSelectionChange={({ detail }) => {
                        setSelectedItems(detail.selectedItems);
                        setDisabled(detail.selectedItems.length === 0);
                    }}
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
                    trackBy="name"
                    selectionType="single"
                    header={
                        <Header
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="normal" disabled={disabled} onClick={() => {
                                        setSelectedItems([]);
                                        setDisabled(true);
                                    }}>
                                        Clear
                                    </Button>
                                    <Button variant="primary" disabled={disabled} onClick={() => {
                                        setIsModalVisible(true);
                                        setIsEligibilityLoading(true);
                                        checkEligibility(`${LOCAL_HOST}/checkEligibility`, selectedItems[0].name);
                                    }}>
                                        Check Eligibility
                                    </Button>
                                </SpaceBetween>
                            }
                        />
                    }
                />
                <div aria-live="polite" hidden={!isLoading}>
                    <Box
                        margin={{ bottom: "xs", left: "l" }}
                        color="text-body-secondary"
                        textAlign="center"
                    >
                        Loading featured schemes
                    </Box>
                    <LoadingBar variant="gen-ai-masked" />
                </div>
                {props.chat}
            </Container>
        </ContentLayout>
    );
};
