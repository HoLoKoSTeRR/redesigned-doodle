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
          <TextField sortable={false} source="id" label={"post.id"} />
          <TextField sortable={false} source="title" label={"post.title"} />
          <TextField sortable={false} source="content" label={"post.content"} />
          <DateField source="postDate" label={"post.list.postDate"} />
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
      <TextInput disabled source="id" label={"post.id"} />
      <TextInput source="title" label={"post.title"} />
      <TextInput multiline source="content" label={"post.content"} />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label={"post.id"} />
      <TextInput multiline source="content" label={"post.id"} />
    </SimpleForm>
  </Create>
);

export const PostShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" label={"post.title"} />
      <RichTextField source="content" label={"post.content"} />
      <DateField source="postDate" label={"post.list.postDate"} />
      <ImageField
        source="imagePath"
        title="title"
        label={"post.list.imagePath"}
      />
    </SimpleShowLayout>
  </Show>
);
