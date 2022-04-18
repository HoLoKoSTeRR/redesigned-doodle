import * as React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import {
  Show,
  SimpleShowLayout,
  RichTextField,
  DateField,
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  SimpleList,
  ImageField,
} from "react-admin";

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="_id" label="User" reference="profile" allowEmpty>
    <SelectInput optionText="username" />
  </ReferenceInput>,
];
export const PostList = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <List {...props} basePath="/posts">
      {isSmall ? (
        <SimpleList
          linkType="show"
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.content.substring(0, 40)}... `}
          tertiaryText={(record) =>
            new Date(record.postDate).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField sortable={false} source="id" />
          <TextField sortable={false} source="title" />
          <TextField sortable={false} source="content" />
          <DateField source="postDate" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput multiline source="content" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput multiline source="content" />
    </SimpleForm>
  </Create>
);

export const PostShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <RichTextField source="content" />
      <DateField label="Publication date" source="postDate" />
      <ImageField source="imagePath" title="title" />
    </SimpleShowLayout>
  </Show>
);
