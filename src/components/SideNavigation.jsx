import {
    SideNavigation
} from '@cloudscape-design/components';

export default () => {
    return (<SideNavigation
        header={{
            text: 'Features'
        }}
        items={
            [{ type: "link", text: "Home Page", href: "/" },
            { type: "link", text: "Edit Profile", href: "/editProfile" }
        ]
        }
    />);
}