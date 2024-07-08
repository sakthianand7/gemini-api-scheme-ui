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
  SideNavigation,
  SpaceBetween,
  SplitPanel,
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import HomePageCards from '../components/HomePageCards';

const LOCALE = 'en';

export default function HomePage() {
  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <AppLayout
        navigationOpen={false}
        navigation={
          <SideNavigation
            header={{
              href: '#',
              text: 'Service name',
            }}
            items={[{ type: 'link', text: `Page #1`, href: `#` }]}
          />
        }
        toolsOpen={false}
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
