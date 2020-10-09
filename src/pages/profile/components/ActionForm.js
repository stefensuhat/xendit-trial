import { Button } from '@material-ui/core';
import { LoadingButton } from 'components';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = { onCancelClick: PropTypes.func.isRequired, isLoading: PropTypes.bool };
const defaultProps = { isLoading: false };

function ActionForm({ onCancelClick, isLoading }) {
    return (
        <>
            <LoadingButton type="submit" loading={isLoading} variant="contained">
                Save
            </LoadingButton>
            <Button onClick={onCancelClick}>Cancel</Button>
        </>
    );
}

ActionForm.propTypes = propTypes;
ActionForm.defaultProps = defaultProps;

export default ActionForm;
