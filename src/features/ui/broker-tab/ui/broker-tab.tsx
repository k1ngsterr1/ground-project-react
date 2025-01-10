import viktor from "@/assets/viktor.png";

export const BrokerTab = () => {
  return (
    <div className="bg-white shadow-xl rounded-[12px] flex flex-col items-center py-2 pb-5">
      <img src={viktor} className="w-[93px] h-[93px]" alt="Виктор Тымченко" />
      <span className="text-dark text-base font-semibold">Виктор Тымченко</span>
      <div className="flex items-center rounded-full justify-center bg-green/10 text-dark mt-2">
        <a
          className="cursor-pointer rounded-full py-[7px] px-[60px] text-dark transition-colors  hover:text-green"
          href="tel:+79785052992"
        >
          +7 978 505 2992
        </a>
      </div>
    </div>
  );
};
