import { SideNavigation, Badge } from "@cloudscape-design/components";

/**
 * Side Nav bar
 */
export default () => {
  return (
    <SideNavigation
      header={{
        href: "#/",
        text: "Explore",
      }}
      items={[
        {
          type: "section-group",
          title: "Pages",
          items: [
            { type: "link", text: "Home Page", href: "/" },
            { type: "link", text: "Edit Profile", href: "/editProfile" },
          ],
        },

        { type: "divider" },
        {
          type: "link",
          text: "Notifications",
          href: "#/notifications",
          info: <Badge color="red">2</Badge>,
        },
        {
          type: "link",
          text: "Feedback",
          href: "https://example.com",
          external: true,
        },
      ]}
    />
  );
};
