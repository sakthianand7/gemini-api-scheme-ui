import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Modal from "@cloudscape-design/components/modal";

export default function EditProfileTable() {
    const [
        selectedItems,
        setSelectedItems
    ] = React.useState([]);
    const [visible, setVisible] = React.useState(false);

    const items = [
        {
            name: "Item 1",
            alt: "First",
            occupation: "This is the first item",
            gender: "1A",
            age: "Small"
        }
    ]
    return (
        <div>
            <Modal
                onDismiss={() => setVisible(false)}
                visible={visible}
                footer={
                    <Box float="right">
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button variant="link">Cancel</Button>
                            <Button variant="primary">Ok</Button>
                        </SpaceBetween>
                    </Box>
                }
                header="Modal title"
            >
                Your description should go here
            </Modal>
            <Table
                renderAriaLive={({
                    firstIndex,
                    lastIndex,
                    totalItemsCount
                }) =>
                    `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
                }
                onSelectionChange={({ detail }) =>
                    setSelectedItems(detail.selectedItems)
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
                    }
                ]}
                columnDisplay={[
                    { id: "name", visible: true },
                    { id: "gender", visible: true },
                    { id: "age", visible: true },
                    { id: "occupation", visible: true }
                ]}
                enableKeyboardNavigation
                items={items}
                loadingText="Loading resources"
                selectionType="multi"
                stickyColumns={{ first: 0, last: 1 }}
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
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                                <Button variant="primary" onClick={() => setVisible(true)}>
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
    );
}