import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Autosuggest from "@cloudscape-design/components/autosuggest";
import logo from './logo-small-top-navigation.svg';

const LOCAL_HOST = "http://localhost:8000"

let idProfileMapping = {};
let profileList = [];
export default ({ setQuery, setProfile }) => {
  const [searchInput, setSearchInput] = React.useState("");
  const [profileName, setProfileName] = React.useState("Self");

  const suggestions = [
    { value: "Am I eligible for Mudra Yojana" },
    { value: "Scheme to help with childcare expenses" },
    { value: "Scheme to help with medical bills" }
  ];

  const transformArrayToIdText = (array) => {
    return array.map(item => {
      const { id, text } = item; // Extract only id and text
      return { id, text };
    });
  };
  const transformArrayToKeyValue = (array) => {
    const result = {};
    array.forEach(item => {
      const { id, text, ...rest } = item; // Exclude "text" key
      result[id] = rest;
    });
    return result;
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
        console.log(data);
        idProfileMapping = transformArrayToKeyValue(data);
        profileList = transformArrayToIdText(data);
        setProfile(idProfileMapping[profileName])
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchResults(`${LOCAL_HOST}/getProfiles/sakthi_anand`);

  }, []);

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
          items: profileList,
          onItemClick: ({ detail }) => { setProfileName(detail.id); setProfile(idProfileMapping[detail.id]) }
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