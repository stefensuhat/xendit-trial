import { fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { status } from 'pages/home/constant.js';

const useStyles = makeStyles(({ palette }) => {
    const bgOpacity = 0.3;

    return {
        high: {
            color: palette.success.main,
        },
        medium: {
            color: palette.warning.main,
        },
        low: {
            color: palette.error.main,
        },
        [status.PENDING_VERIFICATION]: {
            background: fade(palette.info.main, bgOpacity),
            color: palette.info.main,
            fontWeight: 'bold',
        },
        [status.PENDING_LIVE]: {
            background: fade(palette.info.main, bgOpacity),
            color: palette.info.main,
        },
        [status.LIVE]: {
            background: fade(palette.success.main, bgOpacity),
            color: palette.success.main,
        },
        [status.DECLINED]: {
            background: fade(palette.warning.main, bgOpacity),
            color: palette.warning.main,
        },
        [status.SUSPEND]: {
            background: fade(palette.error.main, bgOpacity),
            color: palette.error.main,
        },
    };
});

export default useStyles;
