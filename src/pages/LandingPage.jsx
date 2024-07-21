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
import ChatPopUp from './ChatPopUp';
const LOCALE = 'en';
let search_query = "";
export default function LandingPage() {
  const [currentProfile, setCurrentProfile] = React.useState();
  const [navOpen, setNavOpen] = React.useState(false);
  const [profile, setProfile] = React.useState();

  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <TopNavigation setCurrentProfile={setCurrentProfile} setProfile={setProfile} />
      <AppLayout
        navigationOpen={navOpen}
        toolsHide={true}
        onNavigationChange={() => setNavOpen(!navOpen)}
        navigation={
          <SideNavigation />
        }
        content={
          <div>
            <BrowserRouter>
              <Routes>
                <Route>
                  <Route path="/" element={<HomePage
                    profile={profile}
                    currentProfile={currentProfile}
                    chat={<ChatPopUp />
                    }
                  />} />
                  <Route path="/editProfile" element={<EditProfileTable />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        }
      />
    </I18nProvider>
  );
}
