import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';

export default () => (
    <Card>
        <CardHeader title="Frequently Asked Question" />
        <Card>
            <CardHeader title="How this application dashboard works?" />
            <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        </Card>
        <Card>
            <CardHeader title="Am I able to add new data using this dashboard?" />
            <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        </Card>
    </Card>
);