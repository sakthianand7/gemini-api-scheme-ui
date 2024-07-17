import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Autosuggest from "@cloudscape-design/components/autosuggest";
import logo from './logo-small-top-navigation.svg';

export default ({ setQuery }) => {
  const [searchInput, setSearchInput] = React.useState("");
  const [profileName, setProfileName] = React.useState("Self");
  const suggestions = [
    { value: "Am I eligible for Mudra Yojana" },
    { value: "Scheme to help with childcare expenses" },
    { value: "Scheme to help with medical bills" }
  ];

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
          },
          {
            id: "Father",
            text: "Father"
          }],
          onItemClick: ({ detail }) => { setProfileName(detail.id); console.log(detail); }
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