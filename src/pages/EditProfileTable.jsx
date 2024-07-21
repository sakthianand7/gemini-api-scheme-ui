import * as React from "react";
import Table from "@cloudscape-design/components/table";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Modal from "@cloudscape-design/components/modal";
import Form from "@cloudscape-design/components/form";
import Container from "@cloudscape-design/components/container";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import {
    ContentLayout
} from '@cloudscape-design/components';
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";
import Box from "@cloudscape-design/components/box";

const LOCAL_HOST = "http://localhost:8000"
let items = [
]
export default function EditProfileTable() {

    const [
        selectedItems,
        setSelectedItems
    ] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [profileFormName, setProfileFormName] = React.useState("");
    const [enableEdit, setEnableEdit] = React.useState(false);
    const [enableDelete, setEnableDelete] = React.useState(false);

    const transformArray = (array) => {
        return array.map(item => {
            const { id, ...rest } = item;
            return { name: id, ...rest };
        });
    };

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
                items = transformArray(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchResults(`${LOCAL_HOST}/getProfiles/sakthi_anand`);

    }, []);
    return (
        <ContentLayout
        >
            <SpaceBetween direction="horizontal" size='l' />
            <Container
            >
                <Modal
                    onDismiss={() => setVisible(false)}
                    visible={visible}
                    header="Profile"
                >

                </Modal>
                <div aria-live="polite" hidden={!isLoading}>
                    <Box
                        margin={{ bottom: "xs", left: "l" }}
                        color="text-body-secondary"
                        textAlign="center"
                    >
                        Loading Profiles
                    </Box>
                    <LoadingBar variant="gen-ai-masked" />
                </div>
                <div hidden={isLoading}>
                    <Table
                        renderAriaLive={({
                            firstIndex,
                            lastIndex,
                            totalItemsCount
                        }) =>
                            `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
                        }
                        onSelectionChange={({ detail }) => {
                            setSelectedItems(detail.selectedItems)
                            if (detail.selectedItems.length === 1) {
                                setEnableEdit(true);
                            } else {
                                setEnableEdit(false);
                            }
                            if (detail.selectedItems.length > 0) {
                                setEnableDelete(true);
                            }
                            else {
                                setEnableDelete(false);
                            }
                        }
                        }
                        selectedItems={selectedItems}
                        ariaLabels={{
                            selectionGroupLabel: "Items selection",
                            allItemsSelectionLabel: ({ selectedItems }) =>
                                `${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"
                                } selected`,
                            itemSelectionLabel: ({ selectedItems }, item) =>
                                item.name
                        }}
                        columnDefinitions={[
                            {
                                id: "name",
                                header: "Profile name",
                                cell: item => item.name,
                                sortingField: "name",
                                isRowHeader: true
                            },
                            {
                                id: "gender",
                                header: "Gender",
                                cell: item => item.gender,
                                sortingField: "gender"
                            },
                            {
                                id: "age",
                                header: "Age",
                                cell: item => item.age
                            },
                            {
                                id: "occupation",
                                header: "Occupation",
                                cell: item => item.occupation
                            },
                            {
                                id: "country",
                                header: "Country",
                                cell: item => item.country
                            },
                            {
                                id: "location",
                                header: "Location",
                                cell: item => item.location
                            },
                            {
                                id: "monthly_income",
                                header: "Monthly Income",
                                cell: item => item.monthly_income
                            },
                            {
                                id: "marital_status",
                                header: "Marital Status",
                                cell: item => item.marital_status
                            },
                            {
                                id: "number_of_dependents",
                                header: "Number of Dependents",
                                cell: item => item.number_of_dependents
                            },
                            {
                                id: "disability_status",
                                header: "Disability Status",
                                cell: item => item.disability_status
                            }
                        ]}
                        columnDisplay={[
                            { id: "name", visible: true },
                            { id: "gender", visible: true },
                            { id: "age", visible: true },
                            { id: "occupation", visible: true },
                            { id: "country", visible: true },
                            { id: "location", visible: true },
                            { id: "monthly_income", visible: true },
                            { id: "marital_status", visible: true },
                            { id: "number_of_dependents", visible: true },
                            { id: "disability_status", visible: true }

                        ]}
                        enableKeyboardNavigation
                        items={items}
                        loadingText="Loading resources"
                        selectionType="multi"
                        trackBy="name"
                        filter={
                            <TextFilter
                                filteringPlaceholder="Find resources"
                                filteringText=""
                            />
                        }
                        header={
                            <Header
                                counter={
                                    selectedItems.length
                                        ? "(" + selectedItems.length + "/" + items.length + ")"
                                        : "(" + items.length + ")"
                                }
                                actions={
                                    <SpaceBetween
                                        direction="horizontal"
                                        size="xs"
                                    >
                                        <Button disabled={!enableEdit}>Edit</Button>
                                        <Button disabled={!enableDelete} >Delete</Button>
                                        <Button variant="primary" onClick={() => {
                                            setVisible(true);
                                            setProfileFormName("Create new profile");
                                        }}>
                                            Create profile
                                        </Button>
                                    </SpaceBetween>
                                }
                            >
                                List of Profiles
                            </Header>
                        }
                    />
                </div>
            </Container>
        </ContentLayout>);
}