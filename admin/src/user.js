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
} from "react-admin";
import { PasswordInput } from "ra-ui-materialui";

const validateFullName = [required(), minLength(2), maxLength(25)];
const validatePassword = [required(), minLength(8), maxLength(16)];
const validateEmail = [email(), required()];
const validateAge = [number(), minValue(18)];
const validateGender = choices(
  ["m", "f", "nc"],
  "Please choose one of the values"
);

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);
let genders = [
  { id: "m", name: "Male" },
  { id: "f", name: "Female" },
  { id: "nc", name: "Prefer not say" },
];
let bugs = [
  {
    id: 1,
    type: "orphography",
    name: "Орфографические ошибки",
  },
  {
    id: 2,
    type: "invalid_field_type",
    name: "Числовое поле принимает буквы",
  },
  {
    id: 3,
    type: "required_field_error",
    name: "Отображает ошибку если не заполнено необязательное поле/не отображает если не заполнено обязательное",
  },
  {
    id: 4,
    type: "unhidden_password",
    name: "Конфиденциальная информация (пароль) отображается в незашифрованном виде",
  },
  {
    id: 5,
    type: "inactive",
    name: "Серые(неактивные) кнопки работают",
  },
  {
    id: 6,
    type: "not_email",
    name: "Поле для ввода имейла примет данные, не содержащие @",
  },
  {
    id: 7,
    type: "clear_button",
    name: "Не работают крестики очистки полей",
  },
  {
    id: 8,
    type: "whrong_password",
    name: "Система принимает слишком короткий/длинный пароль",
  },
];
const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.email}"` : ""}</span>;
};

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="full_name" validate={validateFullName} />
      <TextInput label="Age" source="age" validate={validateAge} />
      <SelectInput
        label="Gender"
        source="gender"
        choices={genders}
        validate={validateGender}
      />

      <TextInput label="Email" source="email" validate={validateEmail} />

      <CheckboxGroupInput row={false} source="bugs" choices={bugs} required />
      <PasswordInput multiline label="Enter new password" source="password" />
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
      <PasswordInput multiline source="password" validate={validatePassword} />

      <CheckboxGroupInput row={false} source="bugs" choices={bugs} required />
    </SimpleForm>
  </Create>
);

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="email" />
      <RichTextField source="password" />
    </SimpleShowLayout>
  </Show>
);
