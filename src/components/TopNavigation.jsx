import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Autosuggest from "@cloudscape-design/components/autosuggest";
import logo from './logo-small-top-navigation.svg';

const idProfileMapping = {
  "Self": {
    occupation: "Government Employee",
    gender: "male",
    age: 27,
    location: "Chennai",
    monthly_income: 10000,
    marital_status: "Single",
    number_of_dependents: 2,
    disability_status: "None"
  },
  "Mother": {
    occupation: "Homemaker",
    gender: "Female",
    age: 40,
    location: "Chennai",
    monthly_income: 10000,
    marital_status: "Married",
    number_of_dependents: 2,
    disability_status: "None"
  }
}

export default ({ setQuery, setProfile }) => {
  const [searchInput, setSearchInput] = React.useState("");
  const [profileName, setProfileName] = React.useState("Self");
  const suggestions = [
    { value: "Am I eligible for Mudra Yojana" },
    { value: "Scheme to help with childcare expenses" },
    { value: "Scheme to help with medical bills" }
  ];
  setProfile(idProfileMapping[profileName])

  function handleSearchChange(value) {
    setSearchInput(value);
    setQuery(value);
  }
  return (
    <TopNavigation
      identity={{
        href: "/",
        title: "Benefict",
        logo: {
          src: logo,
          alt: "Service"
        }
      }}
      utilities={[
        {
          type: "button",
          iconName: "search",
          ariaLabel: "Button",
          title: "Search",
          text: "Search Schemes",
          href: "/search"
        },
        {
          type: "button",
          iconName: "notification",
          title: "Notifications",
          ariaLabel: "Notifications (unread)",
          badge: true,
          disableUtilityCollapse: false
        },
        {
          type: "button",
          iconName: "settings",
          ariaLabel: "Settings",
          title: "Settings",
          href: "/editProfile",
          text: "Edit Profiles"
        },
        {
          type: "menu-dropdown",
          iconName: "user-profile",
          text: profileName,
          items: [{
            id: "Self",
            text: "Self"
          },
          {
            id: "Mother",
            text: "Mother"
          }],
          onItemClick: ({ detail }) => { setProfileName(detail.id); setProfile(idProfileMapping[profileName]); }
        }
      ]}
      search={
        <Autosuggest
          onChange={({ detail }) => handleSearchChange(detail.value)}
          value={searchInput}
          options={suggestions}
          ariaLabel="Search"
          placeholder="Search to find the right scheme for you..."
        />
      }
    />
  );
}