import { LuLock, LuMail, LuUser } from "react-icons/lu";

export const REGISTER_FORM = [
  {
    name: "name",
    type: "text",
    placeholder: "Full name",
    validation: { required: true, minLength: 5 },
    icon: () => <LuUser className="size-5 text-blue-500" />,
  },
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    validation: { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}/ },
    icon: () => <LuMail className="size-5 text-blue-500" />,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    validation: { required: true, minLength: 6 },
    icon: () => <LuLock className="size-5 text-blue-500" />,
  },
];

export const LOGIN_FORM = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    validation: { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}/ },
    icon: () => <LuMail className="size-5 text-blue-500" />,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    validation: { required: true, minLength: 6 },
    icon: () => <LuLock className="size-5 text-blue-500" />,
  },
];

