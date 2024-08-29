import link from "@/public/assets/images/Link.svg";
import short from "@/public/assets/images/ShortenBtn.svg";
import clip from "@/public/assets/images/Clip.svg";
import ques from "@/public/assets/images/QuestionCircle.svg";
import toggleLeft from "@/public/assets/images/ToggleLeft.svg";
import cube from "@/public/assets/images/Cubes.svg";
import swirl from "@/public/assets/images/Swirl.svg";
import clock from "@/public/assets/images/Clock.svg";
import chart from "@/public/assets/images/Chart.svg";
import cog from "@/public/assets/images/Cog.svg";
import active from "@/public/assets/images/Active.svg";
import inactive from "@/public/assets/images/Inactive.svg";
import copy from "@/public/assets/images/Copy.svg";
import show from "@/public/assets/images/Chevron.svg";
import edit from "@/public/assets/images/Edit.svg";
import del from "@/public/assets/images/Delete.svg";
import chevron from "@/public/assets/images/Chevron.svg";
import saram from "@/public/assets/images/Alaram.svg";
import dat from "@/public/assets/images/Date.svg";
import filter from "@/public/assets/images/Filter.svg";
import add from "@/public/assets/images/PlusCircle.svg";

const IMAGES = {
  link, short,clip,ques,toggleLeft,cube,swirl,clock,chart, cog,active,inactive,copy,show,edit,del,dat,chevron,saram,filter,add,
};

export default IMAGES;
import { InputField, Passwords } from "@/src/types/types";

export const registerFormFields = (
  name: string,
  email: string,
  passwords: Passwords,
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
): InputField[] => [
  {
    placeholder: "Name",
    value: name,
    onChange: handleNameChange,
    type: "text",
  },
  {
    placeholder: "Email",
    value: email,
    onChange: handleEmailChange,
    type: "email",
  },
  {
    placeholder: "Password",
    value: passwords.password,
    onChange: handlePasswordChange,
    type: "password",
  },
  {
    placeholder: "Confirm Password",
    value: passwords.confirmPassword,
    onChange: handleConfirmPasswordChange,
    type: "password",
  },
];

