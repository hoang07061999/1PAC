import React from "react";

const FormInfoCountry = ({ imgSrc, name, population, capital }) => (
  <div className="formInfoCountry">
    <div className="formInfoCountry_wrapFlag">
      <img className="formInfoCountry_flag" src={imgSrc} alt={name} />
    </div>
    <div className="formInfoCountry_row">
      <div className="formInfoCountry_field">
        <div className="formInfoCountry_field-label">Tên quốc gia</div>
        <input className="formInfoCountry_field-input" disabled value={name} />
      </div>
      <div className="formInfoCountry_field">
        <div className="formInfoCountry_field-label">Dân cư (Năm 2018)</div>
        <input
          className="formInfoCountry_field-input"
          disabled
          value={population}
        />
      </div>
      <div className="formInfoCountry_field">
        <div className="formInfoCountry_field-label">Thủ đô</div>
        <input
          className="formInfoCountry_field-input"
          disabled
          value={capital}
        />
      </div>
    </div>
  </div>
);

export default FormInfoCountry;
