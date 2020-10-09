import KycForm from 'pages/profile/components/KycForm.js';
import LeadForm from 'pages/profile/components/LeadForm.js';

export const drawerWidth = 240;

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
