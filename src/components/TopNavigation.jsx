import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Input from "@cloudscape-design/components/input";
import logo from './logo-small-top-navigation.svg';

export default () => {
  const [searchInput, setSearchInput] = React.useState("");
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
          href: "/editProfile"
        }
      ]}
      search={
        <Input
          type="search"
          placeholder="Search to find the right scheme for you..."
          ariaLabel="Search"
          onChange={({ detail }) => setSearchInput(detail.value)}
          value={searchInput}
        />
      }
    />
  );
}