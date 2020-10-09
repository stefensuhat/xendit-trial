import KycForm from 'pages/profile/components/KycForm.js';
import LeadForm from 'pages/profile/components/LeadForm.js';
import React, { useState } from 'react';

const navs = [
    {
        key: 'lead',
        label: 'Lead',
        element: KycForm,
    },
    {
        key: 'kyc',
        label: 'KYC',
        element: LeadForm,
    },
];

export const TabContext = React.createContext({
    navs,
    activeKey: navs[0].key,
    setActiveKey: () => {
    },
});

function TabContextProvider({ children }) {
    const [activeKey, setActiveKey] = useState('lead');

    function onChangeTab(value) {
        setActiveKey(value);
    }

    return (
        <TabContext.Provider value={{ navs, activeKey, onChangeTab }}>
            {children}
        </TabContext.Provider>
    );
}

export default TabContextProvider;
