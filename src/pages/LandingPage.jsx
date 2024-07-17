'use client';
import React from 'react';
import {
  AppLayout
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import TopNavigation from "../components/TopNavigation";
import SideNavigation from '../components/SideNavigation';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import EditProfileTable from './EditProfileTable';
import SearchResultsPage from './SearchResults';
const LOCALE = 'en';
let search_query = "";
export default function LandingPage() {
  const [navOpen, setNavOpen] = React.useState(false);
  function getSearchQuery(query) {
    search_query = query
  }
  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <TopNavigation setQuery={getSearchQuery} />
      <AppLayout
        navigationOpen={navOpen}
        toolsHide={true}
        onNavigationChange={() => setNavOpen(!navOpen)}
        navigation={
          <SideNavigation />
        }
        content={

          <BrowserRouter>
            <Routes>
              <Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/editProfile" element={<EditProfileTable />} />
                <Route path="/search" element={<SearchResultsPage
                  data={search_query}
                />} />
              </Route>
            </Routes>
          </BrowserRouter>
        }
      />
    </I18nProvider>
  );
}
