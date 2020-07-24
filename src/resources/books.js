import React from "react";
import { List, Datagrid, TextField, DateField } from 'react-admin';

export const BookList = props => {
    console.log('props', props);
    return (
        <List {...props} bulkActionButtons={false}>
            <Datagrid >
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="description" />
                <TextField source="isbn" />
                <DateField source="createdAt" />
            </Datagrid>
        </List>
    );
}