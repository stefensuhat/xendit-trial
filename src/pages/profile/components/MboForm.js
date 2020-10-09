import {
    Box, Button, FormControl, FormLabel, MenuItem, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LoadingButton } from 'components';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import get from 'lodash/get';
import ActionForm from 'pages/profile/components/ActionForm.js';
import FormHeader from 'pages/profile/components/FormHeader.js';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';

const propTypes = { onSubmit: PropTypes.func.isRequired };
const defaultProps = {};

const useStyles = makeStyles((theme) => ({
    formLabel: {
        marginBottom: theme.spacing(1),
    },
}));

function MboForm({ onSubmit }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { item } = useSelector((state) => state.business);
    const { availableFilters } = useSelector((state) => state.business);
    const [editMode, setEditMode] = useState(false);

    const handleEditToggle = () => {
        setEditMode((current) => !current);
    };

    useEffect(() => {
        if (editMode) {
            dispatch.business.getFilters('Mbo_personnel');
        }
    }, [editMode]);

    const handleSubmit = async (values, { setSubmitting }) => {
        onSubmit(values);
        handleEditToggle();
        setSubmitting(false);
    };

    return (
        <Paper component={Box} mb={2} p={2} variant="outlined">
            <FormHeader onEditClick={handleEditToggle} title="MBO" editMode={editMode} />

            <Formik
                enableReinitialize
                initialValues={item}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormControl fullWidth margin="normal">
                            <FormLabel className={classes.formLabel}>MBO Personnel</FormLabel>
                            <Fade spy={editMode} duration={150}>

                                {editMode
                                    ? (
                                        <Field
                                            component={TextField}
                                            select
                                            fullWidth
                                            size="small"
                                            name="internal_details.mbo_personnel"
                                            variant="outlined"
                                        >
                                            {availableFilters.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    ) : <Typography>{get(item, 'internal_details.mbo_personnel')}</Typography>}
                            </Fade>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel className={classes.formLabel}>Notes</FormLabel>
                            <Fade spy={editMode} duration={150}>

                                {editMode
                                    ? (
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            size="small"
                                            name="internal_details.mbo_personnel_notes"
                                            variant="outlined"
                                        />
                                    )
                                    : <Typography>{get(item, 'internal_details.mbo_personnel_notes') ?? '-'}</Typography>}
                            </Fade>
                        </FormControl>

                        {editMode && <ActionForm onCancelClick={handleEditToggle} isLoading={isSubmitting} />}
                    </Form>
                )}
            </Formik>
        </Paper>

    );
}

MboForm.propTypes = propTypes;
MboForm.defaultProps = defaultProps;

export default MboForm;
