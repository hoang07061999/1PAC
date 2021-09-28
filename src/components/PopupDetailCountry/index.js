import React, { useEffect, useState } from "react";
import Chart from "../Chart/chart";
import FormInfoCountry from "../FormInfoCountry";
import Loading from "../Loading";
import ModalCustom from "../Modal";

const PopupCountry = ({
  isOpen,
  handleClose = () => {},
  handleSubmitDate = () => {},
  countryData,
  isLoading,
  loadingChart,
}) => {
  const [inputs, setInputs] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    if (countryData) {
      setInputs({
        from: countryData.from,
        to: countryData.current,
      });
    }
  }, [countryData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitDate({ inputs, name: countryData.name });
  };

  return (
    <ModalCustom isOpen={isOpen} handleClose={handleClose}>
      <div className="popupCountry">
        <h3 className="popupCountry_title"> Thông tin quốc gia </h3>
        {isLoading || !countryData ? (
          <Loading isShow={true} />
        ) : (
          <div className="popupCountry_content">
            <div className="popupCountry_formInfoCountry">
              <FormInfoCountry
                imgSrc={countryData.flag}
                population={countryData.population}
                name={countryData.name}
                capital={countryData.capital}
              />
            </div>
            <div className="covidData">
              <h3 className="popupCountry_title">Tình hình dịch bệnh</h3>
              <div className="popupCountry_control">
                <form onSubmit={handleSubmit}>
                  <div className="popupCountry_row">
                    <div className="popupCountry_field">
                      <div className="popupCountry_field-label">Từ ngày</div>
                      <input
                        onChange={({ target }) =>
                          setInputs((inputs) => ({
                            ...inputs,
                            from: target.value,
                          }))
                        }
                        name="from"
                        type="date"
                        value={inputs.from}
                        className="popupCountry_field-input"
                      />
                    </div>
                    <div className="popupCountry_field">
                      <div className="popupCountry_field-label">Đến ngày</div>
                      <input
                        onChange={({ target }) =>
                          setInputs((inputs) => ({
                            ...inputs,
                            to: target.value,
                          }))
                        }
                        name="to"
                        value={inputs.to}
                        type="date"
                        className="popupCountry_field-input"
                      />
                    </div>
                    <button type="submit" className="popupCountry_button">
                      Tìm kiếm
                    </button>
                  </div>
                </form>
              </div>
              <div className="popupCountry_chart">
                {loadingChart ? (
                  <Loading isShow={true} />
                ) : (
                  <Chart data={countryData.dataChart} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalCustom>
  );
};

export default PopupCountry;
