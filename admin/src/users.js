import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import { SimpleList, List, Datagrid, TextField, ImageField } from "react-admin";

export const UsersList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List title="All users" {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.bio}
        />
      ) : (
        <Datagrid>
          {/* <TextField source="id" /> */}
          <TextField sortable={false} source="username" />
          <TextField sortable={false} source="bio" />
          <ImageField sortable={false} source="imagePath" />
        </Datagrid>
      )}
    </List>
  );
};
