import React from "react";

interface TextComponentProps {
  text: string;
}
const TextComponent = ({ text }: TextComponentProps) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  const websiteRegex =
    /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}(?:\/\S*)?\b/g;
  const facebookRegex =
    /\b(?:https?:\/\/)?(?:www\.)?facebook\.com\/[@A-Za-z0-9._-]+/g;

  // Tìm kiếm các chuỗi phù hợp
  const emails = text.match(emailRegex) || [];
  const websites = text.match(websiteRegex) || [];
  const facebookPages = text.match(facebookRegex) || [];

  // Kết quả
  let newText1: string = "";
  emails.forEach((email, index) => {
    newText1 =
      index > 0
        ? newText1.replace(email, `<span><a>${email}</a> </span>`)
        : text.replace(email, `<span><a>${email}</a> </span>`);
  });
  let newText2: string = "";
  facebookPages.forEach((facebookPage, index) => {
    newText2 =
      index > 0
        ? newText2.replace(
            facebookPage,
            `<span><a href=${facebookPage}> ${facebookPage}</a></span>`
          )
        : newText1.replace(
            facebookPage,
            `<span><a href=${facebookPage}> ${facebookPage}</a></span>`
          );
  });

  const result = newText2 ? newText2 : text;
  return (
    <div>
      {result.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          <span key={index} dangerouslySetInnerHTML={{ __html: line }} />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextComponent;
