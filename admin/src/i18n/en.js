import englishMessages from "ra-language-english";

export const messages = {
  simple: {
    action: {
      resetViews: "Reset views",
    },
  },
  ...englishMessages,
  user: {
    label: "Users",
    list: {
      search: "Search",
    },
    form: {
      summary: "Summary",
      security: "Security",
    },
    edit: {
      title: 'User "%{title}"',
      id: "ID",
      full_name: "Full name",
      email: "Email",
      password: "Password",
      age: "Age",
      gender: "Sex",
      bugs: "Bugs",
    },
    action: {
      save_and_add: "Save and Add",
      save_and_show: "Save and Show",
    },
  },
  resources: {
    posts: {
      name: "Post |||| Posts",
      fields: {
        average_note: "Average note",
        body: "Body",
        comments: "Comments",
        commentable: "Commentable",
        commentable_short: "Com.",
        created_at: "Created at",
        notifications: "Notifications recipients",
        nb_view: "Nb views",
        password: "Password (if protected post)",
        pictures: "Related Pictures",
        published_at: "Published at",
        teaser: "Teaser",
        tags: "Tags",
        title: "Title",
        views: "Views",
      },
    },
    comments: {
      name: "Comment |||| Comments",
      fields: {
        body: "Body",
        created_at: "Created at",
        post_id: "Posts",
        author: {
          name: "Author",
        },
      },
    },
    users: {
      name: "User |||| Users",
      fields: {
        name: "Name",
        role: "Role",
      },
    },
  },
  post: {
    id: "ID",
    title: "Post",
    content: "Content",
    list: {
      search: "Search",
      imagePath: "Image",
      postDate: "Published at",
    },
    form: {
      summary: "Summary",
      body: "Body",
      miscellaneous: "Miscellaneous",
      comments: "Comments",
    },
    edit: {
      title: 'Post "%{title}"',
    },
    action: {
      save_and_add: "Save and Add",
      save_and_show: "Save and Show",
    },
  },
  comment: {
    list: {
      about: "About",
    },
  },
};

export default messages;
