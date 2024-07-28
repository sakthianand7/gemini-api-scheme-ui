import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Input from "@cloudscape-design/components/input";

const LOCAL_HOST = "http://localhost:8000"

let idProfileMapping = {};
let profileList = [];

/**
 * Top Nav bar
 */
export default ({ setCurrentProfile, setProfile }) => {

  const [searchInput, setSearchInput] = React.useState(localStorage.getItem("searchQuery"));
  const [profileName, setProfileName] = React.useState((localStorage.getItem('profileName') === null) || (localStorage.getItem('profileName') === "") ? "Self" : localStorage.getItem('profileName'));
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
        idProfileMapping = transformArrayToKeyValue(data);
        profileList = transformArrayToIdText(data);
        setProfile(idProfileMapping[profileName]);
        setCurrentProfile(profileName);
        localStorage.setItem('profileName', profileName);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchResults(`${LOCAL_HOST}/getProfiles/sakthi_anand`);

  }, []);

  function handleSearchChange(value) {
    setSearchInput(value);
  }

  const handleKeyPress = (event) => {
    if (event.detail.keyCode === 13 && searchInput.trim().length > 0) {
      localStorage.setItem('searchQuery', searchInput);
      localStorage.setItem('profile', JSON.stringify(idProfileMapping[profileName]));
      window.location.href = `/searchSchemes`
    }
  };
  return (
    <TopNavigation
      identity={{
        href: "/",
        title: "Sherlock Schemes",
        logo: {
          src: '/sherlock-schemes.png',
          alt: "Service"
        }
      }}
      utilities={[
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
          iconName: "edit",
          ariaLabel: "edit",
          title: "Manage Profiles",
          href: "/editProfile",
          text: "Manage Profiles"
        },
        {
          type: "menu-dropdown",
          text: profileName,
          items: profileList,
          onItemClick: ({ detail }) => { setProfileName(detail.id); setProfile(idProfileMapping[detail.id]); setCurrentProfile(detail.id); localStorage.setItem('profileName', detail.id); }
        }
      ]}
      search={
        <Input
          onChange={({ detail }) => { handleSearchChange(detail.value); localStorage.setItem('searchQuery', detail.value) }}
          type="search"
          value={searchInput}
          ariaLabel="Search"
          placeholder="Search to find the right scheme for you..."
          onKeyUp={handleKeyPress}
        />
      }
    />
  );
}