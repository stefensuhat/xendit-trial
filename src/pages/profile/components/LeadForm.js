import {
    Box, fade, Paper, Table, TableBody, TableCell, TableRow, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import accounting from 'accounting';
import cx from 'clsx';
import startCase from 'lodash/startCase';
import React from 'react';
import { useSelector } from 'react-redux';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles(({ spacing, palette }) => ({
    title: {
        marginBottom: spacing(2),
    },
    cell: {
        borderBottom: 0,
    },
    HIGH: {
        background: fade(palette.success.main, 0.3),
        color: palette.success.main,
    },
    MEDIUM: {
        background: fade(palette.warning.main, 0.3),
        color: palette.warning.main,
    },
    LOW: {
        background: fade(palette.error.main, 0.3),
        color: palette.error.main,
    },
}));

const keys = [
    {
        title: 'Account Info',
        parentKey: '',
        objects: [
            { key: 'business_name' },
            { key: 'business_id' },
            { key: 'business_email' },
        ],
    },
    {
        title: 'Business Info',
        parentKey: 'registration_details',
        objects: [
            { key: 'registration_time' },
            { key: 'entity_type' },
            { key: 'industry_sector' },
            { key: 'employee_count' },
            { key: 'applicant_role' },
        ],
    },
    {
        title: 'Payment Processing Info',
        parentKey: 'registration_details',
        objects: [
            {
                key: 'transaction_count',
                label: 'Transaction Count / month',
                type: 'number',
            },
            {
                key: 'transaction_volume',
                label: 'Transaction volume / month',
                type: 'number',
            },
        ],
    },
    {
        title: 'Device Info',
        parentKey: 'registration_details',
        objects: [
            { key: 'vpn_detected', type: 'boolean' },
        ],
    },
];

function LeadForm() {
    const classes = useStyles();
    const { item } = useSelector((state) => state.business);

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" color="primary" className={classes.title}>Lead Qualification</Typography>

                <Box className={cx(classes.box, classes[item.Qualification_score])} p={1} borderRadius={8}>
                    <Typography variant="subtitle2">Q Score</Typography>
                    <Typography variant="subtitle2">
                        {item.Qualification_score}
                    </Typography>
                </Box>
            </Box>

            <Paper component={Box} p={2} variant="outlined">
                <Table>
                    <TableBody>
                        {keys.map(({ title, parentKey, objects }) => (
                            <React.Fragment key={objects}>
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
                                        <TableRow key={object.key}>
                                            <TableCell classes={{ root: classes.cell }}>
                                                {object.label || startCase(object.key)}
                                            </TableCell>
                                            <TableCell classes={{ root: classes.cell }}>
                                                {value}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

            </Paper>
        </>
    );
}

LeadForm.propTypes = propTypes;
LeadForm.defaultProps = defaultProps;

export default LeadForm;
