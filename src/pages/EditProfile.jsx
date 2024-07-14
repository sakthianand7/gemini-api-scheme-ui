'use client';
import React from 'react';
import {
    AppLayout,
    Container,
    ContentLayout,
    HelpPanel,
    SpaceBetween,
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import TopNavigation from "../components/TopNavigation";
import EditProfileTable from './EditProfileTable';
import SideNavigation from '../components/SideNavigation';

const LOCALE = 'en';

export default function EditPrfile() {

    const [navOpen, setNavOpen] = React.useState(false);
    const [toolsOpen, setToolsOpen] = React.useState(false);

    return (
        <I18nProvider locale={LOCALE} messages={[messages]}>
            <TopNavigation />
            <AppLayout
                navigationOpen={navOpen}
                navigation={
                    <SideNavigation />
                }
                onNavigationChange={() => setNavOpen(!navOpen)}
                toolsOpen={toolsOpen}
                onToolsChange={() => setToolsOpen(!toolsOpen)}
                tools={<HelpPanel header={<h2>Overview</h2>}>Help content</HelpPanel>}
                content={
                    <ContentLayout
                    >
                        <SpaceBetween direction="horizontal" size='l' />
                        <Container
                        >
                            <EditProfileTable />
                        </Container>
                    </ContentLayout>
                }
            />
        </I18nProvider>
    );
}
