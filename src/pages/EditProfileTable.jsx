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
import Select from "@cloudscape-design/components/select";
import { ContentLayout } from '@cloudscape-design/components';
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";
import Box from "@cloudscape-design/components/box";

const LOCAL_HOST = "http://localhost:8000";
let items = [];

export default function EditProfileTable(props) {
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [profileFormName, setProfileFormName] = React.useState("");
    const [
        filteringText,
        setFilteringText
    ] = React.useState("");
    const [buttonText, setButtonText] = React.useState('Copy Profile');
    const [profileFormData, setProfileFormData] = React.useState({
        name: "",
        gender: "",
        age: "",
        occupation: "",
        country: "",
        location: "",
        monthly_income: "",
        marital_status: "",
        number_of_dependents: "",
        disability_status: ""
    });
    const [errors, setErrors] = React.useState({});
    const [enableCopy, setEnableCopy] = React.useState(false);
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

    const handleInputChange = (name, value) => {
        setProfileFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setProfileFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!profileFormData.name) newErrors.name = "Profile name is required.";
        if (!profileFormData.gender) newErrors.gender = "Gender is required.";
        // Add more validation as needed
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateProfile = async () => {
        if (!validateForm()) return;
        try {
            const body = profileFormData;
            body.text = profileFormData.name;
            body.id = profileFormData.name;
            body.gender = profileFormData.gender.value;
            body.disability_status = profileFormData.disability_status.value;
            body.marital_status = profileFormData.marital_status.value;
            const response = await fetch(`${LOCAL_HOST}/addProfile/sakthi_anand`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setIsLoading(false);
            setVisible(false);
            window.location.href = `/editProfile`
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleEditProfile = async () => {
        if (!validateForm()) return;
        try {
            const body = profileFormData;
            body.text = profileFormData.name;
            body.id = profileFormData.name;
            body.gender = profileFormData.gender.value;
            body.disability_status = profileFormData.disability_status.value;
            body.marital_status = profileFormData.marital_status.value;
            const response = await fetch(`${LOCAL_HOST}/updateProfile/sakthi_anand/${body.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setIsLoading(false);
            setVisible(false);
            window.location.href = `/editProfile`

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await Promise.all(selectedItems.map(async (item) => {
                const response = await fetch(`${LOCAL_HOST}/deleteProfile/${item.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }));

            items = items.filter(item => !selectedItems.find(selected => selected.id === item.id));
            setIsLoading(false);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleSelectionChange = ({ detail }) => {
        setSelectedItems(detail.selectedItems);
        setEnableEdit(detail.selectedItems.length === 1);
        setEnableCopy(detail.selectedItems.length === 1);
        setEnableDelete(detail.selectedItems.length > 0);
    };

    const removeKey = (obj, keyToRemove) => {
        const { [keyToRemove]: removed, ...rest } = obj;
        return rest;
    };

    const handleCopy = (profile) => {
        const textToCopy = Array.isArray(profile) ? profile[0] : JSON.parse(profile);
        let updatedData = removeKey(textToCopy, "name");
        updatedData = removeKey(updatedData, "text");
        // Format the data into a readable string
        const copyText = Object.entries(updatedData)
            .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)
            .join(' , ');

        navigator.clipboard.writeText(copyText)
            .then(() => {
                setButtonText('Profile Copied!');
                setTimeout(() => setButtonText('Copy Profile'), 1000); // Reset text after 2 seconds
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <ContentLayout>
            <SpaceBetween direction="horizontal" size='l' />
            <Container>
                <Modal
                    onDismiss={() => setVisible(false)}
                    visible={visible}
                    header={profileFormName}
                    footer={
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button variant="link" onClick={() => setVisible(false)}>Cancel</Button>
                            <Button variant="primary" onClick={profileFormName === "Create New Profile" ? handleCreateProfile : handleEditProfile}>
                                {profileFormName}
                            </Button>
                        </SpaceBetween>
                    }
                    size="medium"
                >
                    <Form>
                        <SpaceBetween direction="vertical" size="s">
                            <FormField label="Profile Name" errorText={errors.name}>
                                <Input
                                    value={profileFormData.name}
                                    onChange={({ detail }) => handleInputChange("name", detail.value)}
                                    placeholder="Enter profile name"
                                />
                            </FormField>
                            <FormField label="Gender" errorText={errors.gender}>
                                <Select
                                    selectedOption={profileFormData.gender}
                                    onChange={({ detail }) =>
                                        handleSelectChange("gender", detail.selectedOption)
                                    }
                                    options={[
                                        { value: "Male", label: "Male" },
                                        { value: "Female", label: "Female" },
                                        { value: "Other", label: "Other" }
                                    ]}
                                />
                            </FormField>
                            <FormField label="Age" errorText={errors.age}>
                                <Input
                                    type="number"
                                    value={profileFormData.age}
                                    onChange={({ detail }) => handleInputChange("age", detail.value)}
                                    placeholder="Enter age"
                                />
                            </FormField>
                            <FormField label="Occupation" errorText={errors.occupation}>
                                <Input
                                    value={profileFormData.occupation}
                                    onChange={({ detail }) => handleInputChange("occupation", detail.value)}
                                    placeholder="Enter occupation"
                                />
                            </FormField>
                            <FormField label="Country" errorText={errors.country}>
                                <Input
                                    value={profileFormData.country}
                                    onChange={({ detail }) => handleInputChange("country", detail.value)}
                                    placeholder="Enter country"
                                />
                            </FormField>
                            <FormField label="Location" errorText={errors.location}>
                                <Input
                                    value={profileFormData.location}
                                    onChange={({ detail }) => handleInputChange("location", detail.value)}
                                    placeholder="Enter location"
                                />
                            </FormField>
                            <FormField label="Monthly Income" errorText={errors.monthly_income}>
                                <Input
                                    type="number"
                                    value={profileFormData.monthly_income}
                                    onChange={({ detail }) => handleInputChange("monthly_income", detail.value)}
                                    placeholder="Enter monthly income"
                                />
                            </FormField>
                            <FormField label="Marital Status" errorText={errors.marital_status}>
                                <Select
                                    selectedOption={profileFormData.marital_status}
                                    onChange={({ detail }) =>
                                        handleSelectChange("marital_status", detail.selectedOption)
                                    }
                                    options={[
                                        { value: "Single", label: "Single" },
                                        { value: "Married", label: "Married" },
                                        { value: "Divorced", label: "Divorced" }
                                    ]}
                                />
                            </FormField>
                            <FormField label="Number of Dependents">
                                <Input
                                    type="number"
                                    value={profileFormData.number_of_dependents}
                                    onChange={({ detail }) => handleInputChange("number_of_dependents", detail.value)}
                                    placeholder="Enter number of dependents"
                                />
                            </FormField>
                            <FormField label="Disability Status">
                                <Select
                                    selectedOption={profileFormData.disability_status}
                                    onChange={({ detail }) =>
                                        handleSelectChange("disability_status", detail.selectedOption)
                                    }
                                    options={[
                                        { value: "Disabled", label: "Disabled" },
                                        { value: "Not Disabled", label: "Not Disabled" }
                                    ]}
                                />
                            </FormField>
                        </SpaceBetween>
                    </Form>
                </Modal>
                <div aria-live="polite" hidden={!isLoading}>
                    <Box margin={{ bottom: "xs", left: "l" }} color="text-body-secondary" textAlign="center">
                        Loading Profiles
                    </Box>
                    <LoadingBar variant="gen-ai-masked" />
                </div>
                <div hidden={isLoading}>
                    <Table
                        renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
                            `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
                        }
                        onSelectionChange={handleSelectionChange}
                        selectedItems={selectedItems}
                        stickyColumns={{ first: 1, last: 0 }}
                        ariaLabels={{
                            selectionGroupLabel: "Items selection",
                            allItemsSelectionLabel: ({ selectedItems }) =>
                                `${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"} selected`,
                            itemSelectionLabel: ({ selectedItems }, item) =>
                                item.name
                        }}
                        columnDefinitions={[
                            {
                                id: "name",
                                header: "Profile Name",
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
                                filteringText={filteringText}
                                filteringPlaceholder="Find profile"
                                filteringAriaLabel="Filter instances"
                                onChange={({ detail }) =>
                                    setFilteringText(detail.filteringText)
                                }
                            />
                        }
                        header={
                            <Header
                                counter={
                                    selectedItems.length
                                        ? `(${selectedItems.length}/${items.length})`
                                        : `(${items.length})`
                                }
                                actions={
                                    <SpaceBetween direction="horizontal" size="xs">
                                        <Button disabled={!enableCopy} onClick={() => handleCopy(selectedItems)}>{buttonText}</Button>
                                        <Button disabled={!enableEdit} onClick={() => {
                                            setVisible(true);
                                            setProfileFormName("Edit Profile");
                                            const selectedProfile = selectedItems[0];
                                            setProfileFormData({
                                                name: selectedProfile.name,
                                                gender: {
                                                    label: selectedProfile.gender,
                                                    value: selectedProfile.gender
                                                },
                                                age: selectedProfile.age,
                                                occupation: selectedProfile.occupation,
                                                country: selectedProfile.country,
                                                location: selectedProfile.location,
                                                monthly_income: selectedProfile.monthly_income,
                                                marital_status: {
                                                    label: selectedProfile.marital_status,
                                                    value: selectedProfile.marital_status
                                                },
                                                number_of_dependents: selectedProfile.number_of_dependents,
                                                disability_status: {
                                                    label: selectedProfile.disability_status,
                                                    value: selectedProfile.disability_status
                                                }
                                            });
                                        }}>Edit</Button>
                                        <Button disabled={!enableDelete} onClick={handleDeleteProfile}>Delete</Button>
                                        <Button variant="primary" onClick={() => {
                                            setVisible(true);
                                            setProfileFormName("Create New Profile");
                                            setProfileFormData({
                                                name: "",
                                                gender: "",
                                                age: "",
                                                occupation: "",
                                                country: "",
                                                location: "",
                                                monthly_income: "",
                                                marital_status: "",
                                                number_of_dependents: "",
                                                disability_status: ""
                                            });
                                        }}>Create Profile</Button>
                                    </SpaceBetween>
                                }
                            >
                                List of Profiles
                            </Header>
                        }
                    />
                </div>
                {props.chat}
            </Container>
        </ContentLayout>
    );
}
