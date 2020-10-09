import KycForm from 'pages/profile/components/KycForm.js';
import LeadForm from 'pages/profile/components/LeadForm.js';
import React, { useState } from 'react';

export const navs = [
    {
        key: 'lead',
        label: 'Lead',
        element: LeadForm,
    },
    {
        key: 'kyc',
        label: 'KYC',
        element: KycForm,
    },
];

export const TabContext = React.createContext({
    navs,
    activeKey: navs[0].key,
    setActiveKey: () => {
    },
});

function TabContextProvider({ children }) {
    const [activeKey, setActiveKey] = useState(navs[0].key);

    function onChangeTab(value) {
        console.log('value: ', value);

        setActiveKey(value);
    }

    return (
        <TabContext.Provider value={{ navs, activeKey, onChangeTab }}>
            {children}
        </TabContext.Provider>
    );
}

export default TabContextProvider;
