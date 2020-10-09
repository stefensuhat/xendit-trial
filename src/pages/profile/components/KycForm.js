import {
    Box, fade, Paper, Table, TableBody, TableCell, TableRow, Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import accounting from 'accounting';
import cx from 'clsx';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import startCase from 'lodash/startCase';
import ActionForm from 'pages/profile/components/ActionForm.js';
import FormHeader from 'pages/profile/components/FormHeader.js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles(({ spacing }) => ({
    title: {
        marginBottom: spacing(2),
    },
    AWAITING_DATA: {
        background: fade(grey['500'], 0.1),
        color: grey['800'],
    },
    cell: {
        borderBottom: 0,
    },
}));

const keys = [
    {
        title: 'Business Details',
        parentKey: 'business_details',
        objects: [
            { key: 'business_type' },
            { key: 'legal_name' },
            { key: 'business_description' },
            { key: 'website' },
            { key: 'legal_address' },
            { key: 'preferred_mailing_address' },
        ],
    },
    {
        title: 'Establishment Details',
        parentKey: 'establishment_details',
        objects: [
            { key: 'business_npwp_number' },
            { key: 'tdr_nib_number' },
            { key: 'business_license_number' },
            { key: 'bank_name' },
            { key: 'bank_account_number' },
            { key: 'bank_account_name' },
        ],
    },
    {
        title: 'Person Details',
        parentKey: 'person_details',
        objects: [
            { key: 'authorized_signatory_role' },
            { key: 'authorized_signatory_full_name' },
            { key: 'authorized_signatory_email' },
            { key: 'authorized_signatory_phone_number' },
            { key: 'authorized_signatory_npwp_number' },
            { key: 'authorized_signatory_ktp_number' },
            { key: 'pic_role' },
            { key: 'pic_full_name' },
            { key: 'pic_email' },
            { key: 'pic_phone_number' },
        ],
    },
];

function KycForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { item, kycEditMode } = useSelector((state) => state.business);

    const handleEditToggle = () => {
        dispatch.business.toggleKycEditMode(!kycEditMode);
        // setEditMode((current) => !current);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        await dispatch.business.post(values);
        handleEditToggle();
        setSubmitting(false);
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" color="primary" className={classes.title}>KYC Requirement</Typography>

                <Box className={cx(classes.box, classes[item.kyc_status])} p={1} borderRadius={8}>
                    <Typography variant="caption" align="center">KYC Status</Typography>
                    <Typography variant="subtitle2">
                        {item.kyc_status}
                    </Typography>
                </Box>
            </Box>

            <Paper component={Box} p={2} variant="outlined">
                <FormHeader title="Requirement Checklist" onEditClick={handleEditToggle} editMode={kycEditMode} />

                <Box mb={3} />

                <Formik enableReinitialize initialValues={item} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <Table>
                                <TableBody>
                                    {keys.map(({ title, parentKey, objects }) => (
                                        <>
                                            <TableRow>
                                                <TableCell classes={{ root: classes.cell }} colSpan={3}>
                                                    <Typography variant="h6" color="primary">{title}</Typography>
                                                </TableCell>
                                            </TableRow>

                                            {objects.map((object) => {
                                                let value = item[parentKey] ? item[parentKey][object.key] : item[object.key];

                                                if (object.type === 'number') {
                                                    value = accounting.formatMoney(value, '', 0, '.', ','); // €4.999,99
                                                }

                                                if (object.type === 'boolean') {
                                                    value = value ? 'YES' : 'NO';
                                                }

                                                return (
                                                    <TableRow>
                                                        <TableCell classes={{ root: classes.cell }}>
                                                            {object.label || startCase(object.key)}
                                                        </TableCell>
                                                        <TableCell classes={{ root: classes.cell }}>
                                                            {kycEditMode ? (
                                                                <Field
                                                                    fullWidth
                                                                    component={TextField}
                                                                    size="small"
                                                                    name={`${parentKey}.${object.key}`}
                                                                    variant="outlined"
                                                                />
                                                            ) : value}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}

                                        </>
                                    ))}
                                </TableBody>
                            </Table>

                            {kycEditMode && <ActionForm onCancelClick={handleEditToggle} isLoading={isSubmitting} />}

                        </Form>
                    )}
                </Formik>
            </Paper>
        </>
    );
}

KycForm.propTypes = propTypes;
KycForm.defaultProps = defaultProps;

export default KycForm;
