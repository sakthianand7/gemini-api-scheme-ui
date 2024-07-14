'use client';
import React from 'react';
import {
  AppLayout,
  BreadcrumbGroup,
  Container,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  Link,
  SpaceBetween,
  SplitPanel,
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import HomePageCards from '../components/HomePageCards';
import TopNavigation from "../components/TopNavigation";
import SideNavigation from '../components/SideNavigation';
const LOCALE = 'en';

export default function HomePage() {
  const [navOpen, setNavOpen] = React.useState(false);
  const [toolsOpen, setToolsOpen]  = React.useState(false);

  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <TopNavigation />
      <AppLayout
        navigationOpen={navOpen}
        onNavigationChange={() => setNavOpen(!navOpen)}
        navigation={
          <SideNavigation/>
        }
        toolsOpen={toolsOpen}
        onToolsChange={() => setToolsOpen(!toolsOpen)}
        tools={<HelpPanel header={<h2>Overview</h2>}>Help content</HelpPanel>}
        content={
          <ContentLayout
            header={
              <Header variant="h2" textAlign="center">
                Benefict: Unlock Government Benefits You Deserve
              </Header>
            }
          >
            <SpaceBetween direction="horizontal" size='l'/>
            <Container
              header={
                <Header variant="h3" description="Government schemes with high public interest or social impact">
                  Featured Schemes
                </Header>
              }
            >
              <HomePageCards
              />
            </Container>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}
