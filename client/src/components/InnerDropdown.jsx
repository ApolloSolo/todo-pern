import React from "react";

const InnerDropdown = ({ list }) => {
  return (
    <ul className="absolute md:right-[-30px] top-8 w-[150px] bg-[#737b6c] rounded-md py-2 border-[1px] border-[#5b6454] shadow-2xl">
      {
            list.map((link) => (
              <li key={link.name} className="ml-2 text-lg my-2">
                <a href={link.link} className="hover:text-gray-700 duration-200 font-semibold">{link.name}</a>
              </li>
            ))
          }
    </ul>
  );
};

export default InnerDropdown;