import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import Header from "@cloudscape-design/components/header";

export default () => {
    const itemList = [{ "name": "Pradhan Mantri Jan Dhan Yojana (PMJDY)", "description": "Provides basic banking accounts with overdraft facilities, RuPay debit cards, and micro-insurance to promote financial inclusion.", "eligibility": "Unbanked and underbanked population", "website_url": "https://www.pmjdy.gov.in/" }, { "name": "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)", "description": "Guarantees 100 days of wage employment in a year to rural households for unskilled manual work. Provides a social safety net for the rural poor.", "eligibility": "Rural households with adult members willing to do unskilled manual work", "website_url": "https://mnrega.nic.in/" }, { "name": "Swachh Bharat Mission (SBM)", "description": "Aims to eliminate open defecation and create a clean India by improving sanitation conditions.", "eligibility": "All citizens of India", "website_url": "https://swachhbharatmission.gov.in/" }, { "name": "Pradhan Mantri Ujjwala Yojana (PMUY)", "description": "Provides LPG connections to poor families to replace traditional cooking fuels and improve health by reducing indoor air pollution.", "eligibility": "Poor families", "website_url": "https://pmujjwalayोजना.gov.in/" }, { "name": "Beti Bachao Beti Padhao (BBBP)", "description": "Aims to improve the survival and education of girls to address the issue of declining child sex ratio.", "eligibility": "All citizens of India (awareness campaign)", "website_url": "https://betibachaopadhao.gov.in/" }];
    const [
        selectedItems,
        setSelectedItems
    ] = React.useState();
    const [disabled, setDisabled] = React.useState(true);

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
            loadingText="Loading resources"
            trackBy="name"
            empty={
                <Box
                    margin={{ vertical: "xs" }}
                    textAlign="center"
                    color="inherit"
                >
                    <SpaceBetween size="m">
                        <b>No resources</b>
                        <Button>Create resource</Button>
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