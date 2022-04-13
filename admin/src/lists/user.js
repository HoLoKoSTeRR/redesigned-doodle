import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  RichTextField,
  CheckboxGroupInput,
  required,
  minLength,
  maxLength,
  minValue,
  number,
  email,
  choices,
  PasswordInput,
} from "react-admin";

const validateFullName = [required(), minLength(2), maxLength(25)];
const validatePassword = [required(), minLength(8), maxLength(16)];
const validateEmail = [email(), required()];
const validateAge = [number(), minValue(18)];
const validateGender = choices(
  ["m", "f", "nc"],
  "Please choose one of the values"
);
let genders = [
  { id: "m", name: "Male" },
  { id: "f", name: "Female" },
  { id: "nc", name: "Prefer not say" },
];
let bugs = [
  {
    id: "orphography",
    name: "Орфографические ошибки",
  },
  {
    id: "invalid_field_type",
    name: "Числовое поле принимает буквы",
  },
  {
    id: "required_field_error",
    name: "Отображает ошибку если не заполнено необязательное поле/не отображает если не заполнено обязательное",
  },
  {
    id: "unhidden_password",
    name: "Конфиденциальная информация (пароль) отображается в незашифрованном виде",
  },
  {
    id: "inactive",
    name: "Серые(неактивные) кнопки работают",
  },
  {
    id: "not_email",
    name: "Поле для ввода имейла примет данные, не содержащие @",
  },
  {
    id: "clear_button",
    name: "Не работают крестики очистки полей",
  },
  {
    id: "whrong_password",
    name: "Система принимает слишком короткий/длинный пароль",
  },
];

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField sortable={false} source="id" />
      <TextField sortable={false} source="email" />
      <EditButton />
    </Datagrid>
  </List>
);
const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.email}"` : ""}</span>;
};

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="full_name" validate={validateFullName} />
      <TextInput disabled label="Email" source="email" />
      <PasswordInput label="Enter new password" source="password" />
      <TextInput label="Age" source="age" validate={validateAge} />
      <SelectInput
        label="Gender"
        source="gender"
        choices={genders}
        validate={validateGender}
      />

      <CheckboxGroupInput row={false} source="bugs" choices={bugs} required />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="full_name" validate={validateFullName} />
      <TextInput label="Age" source="age" validate={validateAge} />
      <SelectInput
        label="Gender"
        source="gender"
        choices={genders}
        validate={validateGender}
      />

      <TextInput label="Email" source="email" validate={validateEmail} />
      <PasswordInput
        multiline
        source="new_password"
        validate={validatePassword}
      />
      <CheckboxGroupInput row={false} source="bugs" choices={bugs} required />
    </SimpleForm>
  </Create>
);

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="email" />
      <TextField source="full_name" />
      <TextField source="gender" />
      <TextField source="age" />
      <TextField source="bugs" />
    </SimpleShowLayout>
  </Show>
);
