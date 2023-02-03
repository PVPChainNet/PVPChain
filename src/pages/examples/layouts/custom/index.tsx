import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {NextPage} from 'next';

import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import {ArrowUpIcon, GlobeAltIcon, ArrowPathIcon} from '@heroicons/react/24/solid';

import Page from '@/components/page';
import PageContent from '@/components/page/content';
import PageBox from '@/components/page/box';
import BackButton from '@/components/utility/BackButton';
import TabPanel from '@/components/utility/TabPanel';

type ContentPositionsT =
  | 'top'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'left'
  | 'right';

const CustomPage: NextPage = () => {
  const [contentPosition, setContentPosition] = useState<ContentPositionsT>('center');
  const [showContent, setShowContent] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [showConnectButton, setShowConnectButton] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleContentPositionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setContentPosition(event.target.selectedOptions[0].value as ContentPositionsT);
  };

  const reset = () => {
    setContentPosition('center');
    setShowContent(true);
    setShowHeader(true);
    setShowNav(true);
    setShowFooter(true);
    setShowConnectButton(true);
    setActiveTab(0);
  };

  return (
    <>
      <Page
        showAppContent={showContent}
        showAppFooter={showFooter}
        showAppHeader={showHeader}
        showConnectButton={showConnectButton}
        showNav={showNav}
        header="Custom Layout"
      >
        <PageContent contentPosition={contentPosition}>
          <PageBox classNames="mb-4">
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab
                label="Options"
                className="min-h-0 min-w-fit mr-4"
                icon={<GlobeAltIcon className="h-4 w-4" />}
                iconPosition="start"
              />
              <Tab
                label="Snippet"
                className="min-h-0 min-w-fit mr-4"
                icon={<GlobeAltIcon className="h-4 w-4" />}
                iconPosition="start"
              />
            </Tabs>
            <TabPanel index={0} value={activeTab}>
              <div className="flex items-center space-x-4 mt-4">
                <BackButton />
                <button className="app-btn app-btn--secondary" onClick={() => reset()}>
                  <ArrowPathIcon className="h-4 w-4 mr-1" />
                  Reset
                </button>
              </div>
              <p className="my-4 text-xl">
                Use the options below to change the page, then see the real-time example snippet.
              </p>
              <Divider />
              <div className="grid grid-cols-3 gap-8 mt-4">
                <div>
                  <p className="font-semibold">Layout Options:</p>
                  <ul>
                    <li className="flex items-center">
                      <div>App Header:</div>
                      <Switch checked={showHeader} onClick={() => setShowHeader(!showHeader)} />
                    </li>
                    <li className="flex items-center">
                      <div>App Footer:</div>
                      <Switch checked={showFooter} onClick={() => setShowFooter(!showFooter)} />
                    </li>
                    <li className="flex items-center">
                      <div>Connect Button:</div>
                      <Switch checked={showConnectButton} onClick={() => setShowConnectButton(!showConnectButton)} />
                    </li>
                    <li className="flex items-center">
                      <div>Navigation:</div>
                      <Switch checked={showNav} onClick={() => setShowNav(!showNav)} />
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-center">
                        <div>Content:</div>
                        <Switch checked={showContent} onClick={() => setShowContent(!showContent)} />
                      </div>
                      <small className="italic font-semibold flex items-center">
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                        Turning off will hide this box!
                      </small>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Content Options:</p>
                  <ul>
                    <li className="flex items-center">
                      <div>Position:</div>
                      <select
                        className="rounded-lg ml-2"
                        onChange={handleContentPositionChange}
                        defaultValue="center"
                        value={contentPosition}
                      >
                        <option value="top">top</option>
                        <option value="top-left">top-left</option>
                        <option value="top-center">top-center</option>
                        <option value="top-right">top-right</option>
                        <option value="bottom-left">bottom-left</option>
                        <option value="bottom">bottom</option>
                        <option value="bottom-right">bottom-right</option>
                        <option value="center-left">center-left</option>
                        <option value="center">center</option>
                        <option value="center-right">center-right</option>
                        <option value="left">left (default)</option>
                        <option value="right">right</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
            </TabPanel>
            <TabPanel index={1} value={activeTab}>
              <>
                <pre>
                  {`<Page showAppContent={${showContent}}
  showAppFooter={${showFooter}}
  showAppHeader={${showHeader}}
  showConnectButton={${showConnectButton}}
  showNav={${showNav}}>
    <PageContent contentPosition="${contentPosition}">
      <div>...</div>
    </PageContent>
  </Page>`}
                </pre>
              </>
            </TabPanel>
          </PageBox>
        </PageContent>
      </Page>
    </>
  );
};

export default CustomPage;
