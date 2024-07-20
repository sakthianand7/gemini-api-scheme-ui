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
export default function EditProfileTable() {
    const [
        selectedItems,
        setSelectedItems
    ] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [profileFormName, setProfileFormName] = React.useState("");
    const [enableEdit, setEnableEdit] = React.useState(false);
    const [enableDelete, setEnableDelete] = React.useState(false);
    const items = [
        {
            name: "Self",
            occupation: "Government Employee",
            gender: "male",
            age: 27,
            location: "Chennai",
            monthly_income: 10000,
            marital_status: "Single",
            number_of_dependents: 2,
            disability_status: "None"
        },
        {
            name: "Mother",
            occupation: "Homemaker",
            gender: "Female",
            age: 40,
            location: "Chennai",
            monthly_income: 10000,
            marital_status: "Married",
            number_of_dependents: 2,
            disability_status: "None"
        }
    ]
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
                    <form onSubmit={e => e.preventDefault()}>
                        <Form
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button formAction="none" variant="link">
                                        Cancel
                                    </Button>
                                    <Button variant="primary">Submit</Button>
                                </SpaceBetween>
                            }
                        >
                            <Container
                                header={
                                    <Header variant="h2">
                                        {profileFormName}
                                    </Header>
                                }
                            >
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="First field">
                                        <Input />
                                    </FormField>
                                    <FormField label="Second field">
                                        <Input />
                                    </FormField>
                                    <FormField label="Third field">
                                        <Input />
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        </Form>
                    </form>
                </Modal>
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
            </Container>
        </ContentLayout>);
}