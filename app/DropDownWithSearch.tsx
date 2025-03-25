import { FC } from "react";

interface DropDownProps {
  selectedOption: string | null;
  searchTerm: string;
  isOpen: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectOption: (option: string) => void;
}

const DropDownWithSearch: FC<DropDownProps> = ({
  selectedOption,
  searchTerm,
  isOpen,
  setSearchTerm,
  setIsOpen,
  selectOption,
}) => {
    const options = [
        "USDT",
        "USDC",
        "DAI",
        "UNI",
        "AAVE",
        "LINK",
        "MKR",
        "BAT",
        "SHIB",
        "CRO",
        "BUSD",
        "SNX",
        "COMP",
        "CRV",
        "YFI",
        "LRC",
        "MATIC",
        "1INCH",
        "WETH",
        "TUSD",
        "ZRX",
        "MANA",
        "GRT",
        "BAL",
        "KNC",
        "REN",
        "STMX",
        "XRP",
        "ALCX",
        "EWT",
        "KSM",
        "RARI",
        "SAND",
        "FARM",
        "SUSHI",
        "TRB",
        "KEEP3R",
        "CHZ",
        "CEL",
        "RBN",
        "FTM",
        "MITH",
        "QKC",
        "FORTH",
        "XEM",
        "LEND",
        "NEXO",
        "DODO",
        "CTSI",
        "NMR",
        "Hegic",
        "BNT",
        "OCEAN",
        "LOKI",
        "REI",
        "OP",
        "CVC",
        "KAI",
        "XYO",
        "VRA",
        "MDX",
      ];

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="relative w-20">
      <button onClick={() => setIsOpen(!isOpen)} className="w-20 h-10 border bg-gray rounded-md text-color-gray p-2 hover:bg-gray-hover">
        {selectedOption || "more"}
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-gray border rounded-md shadow-lg z-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 border-b text-black"
          />
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => selectOption(option)}  // Auswahl einer Option
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownWithSearch;
