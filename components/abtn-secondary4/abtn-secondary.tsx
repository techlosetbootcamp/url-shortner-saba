import type { NextPage } from "next";

export type AbtnSecondary4Type = {
  className?: string;
  namePlaceholder?: string;
};

const AbtnSecondary4: NextPage<AbtnSecondary4Type> = ({
  className = "",
  namePlaceholder,
}) => {
  return (
    <div
      className={`self-stretch shadow-[0px_4px_10px_rgba(0,_0,_0,_0.1)] rounded-29xl bg-gray-100 flex flex-row items-center justify-start py-[19px] px-[25px] z-[2] text-center text-xl font-inter border-[4px] border-solid border-mediumslateblue-200 ${className}`}
    >
      <div className="w-14 flex flex-row items-center justify-center">
        <div className="flex-1 flex flex-row items-center justify-start gap-[5px]">
          <input
            className="w-full [border:none] [outline:none] font-light font-inter text-base bg-[transparent] h-7 flex-1 relative leading-[28px] text-lightgray text-left flex items-center min-w-[27px] p-0"
            placeholder={namePlaceholder}
            type="text"
          />
          <div className="h-[23px] w-1.5 flex flex-row items-center justify-center">
            <div className="w-1.5 relative font-extralight text-transparent !bg-clip-text [background:linear-gradient(89.92deg,_#144ee3,_#eb568e_18.75%,_#a353aa_64.06%,_#144ee3)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] hidden mq450:text-base">
              |
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbtnSecondary4;
