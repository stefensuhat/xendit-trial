export const status = {
    AWAITING_DOCS: 'AWAITING_DOCS',
    AWAITING_SIGN: 'AWAITING_SIGN',
    PENDING_VERIFICATION: 'PENDING_VERIFICATION',
    PENDING_LIVE: 'PENDING_LIVE',
    LIVE: 'LIVE',
    DECLINED: 'DECLINED',
    SUSPEND: 'SUSPEND',
};

export const columns = [
    {
        id: 'Business_name|Business_email|Business_id',
        label: 'Business Name / Email / Id',
    },
    { id: 'Entity_type', label: 'Entity Type' },
    {
        id: 'Lead_owner',
        label: 'Lead Owner',
        filter: true,
    },
    {
        id: 'Mbo_personnel',
        label: 'MBO Personnel',
        filter: true,
    },
    {
        id: 'Qualification_score',
        label: 'Qualification Score',
        filter: true,
    },
    {
        id: 'Registration_Time',
        label: 'Registration Time',
        type: 'datetime',
        sort: true,
    },
    {
        id: 'Account_status',
        label: 'Account Status',
        filter: true,
    },
];
