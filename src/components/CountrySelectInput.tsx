import { Select, SelectProps } from "antd";
import { countries } from "country-flag-icons";
import { useTranslation } from "react-i18next";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

interface CountrySelectInputProps extends SelectProps { }

const CountrySelectInput: React.FC<CountrySelectInputProps> = (props) => {
  const { t } = useTranslation(["countries"]);
  const options: SelectProps["options"] = [...countries].map((shorthand) => ({
    value: shorthand,
    label: `${getUnicodeFlagIcon(shorthand)} ${t(shorthand)}`,
  }));

  return (
    <>
      <Select
        {...props}
        options={options}
        filterOption={(input, option) =>
          (option?.label || "")
            .toLocaleString()
            .toLocaleLowerCase()
            .includes(input)
        }
        showSearch
      />
    </>
  );
};

export default CountrySelectInput;
