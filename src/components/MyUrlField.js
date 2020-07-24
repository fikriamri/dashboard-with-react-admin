// in src/MyUrlField.js
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
});

const MyUrlField = ({ record = {}, source }) => {
  const classes = useStyles();
    return (
        <a href={`https://${record[source]}`} className={classes.link} target="_blank">
            {record[source]}
            <LaunchIcon className={classes.icon} />
        </a>
    );
}

export default MyUrlField;