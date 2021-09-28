import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import * as DUMMY from "../../assets/dummy/dummy";
import Pagination from "../../components/Pagination";
import Container from "../../components/Container";
import PopupCountry from "../../components/PopupDetailCountry";
import getCountriesService, {
  getCapitalCountry,
  getDataCovidByDate,
  getFlagCountry,
  getInfoCountry,
} from "../../services/requests";
import formatDate from "../../hooks/formatDate";
import {
  getListBookmarkStorage,
  setListBookmarkStorage,
} from "../../services/storage";

const Summary = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingChart, setLoadingChart] = useState(false);
  const [listCountries, setListCountries] = useState([]);
  const [listBookmark, setListBookmark] = useState([]);
  const [page, setPage] = useState(1);
  const [dataCountry, setDataCountry] = useState();

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    const initPage = async () => {
      try {
        const res = await getCountriesService();
        if (getListBookmarkStorage()) setListBookmark(getListBookmarkStorage());
        setListCountries(res.Countries);
      } finally {
        console.log("finally");
      }
    };
    initPage();
  }, []);

  const formatDateRequest = (date) => {
    var d = date,
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const formatDataChart = (data) => ({
    labels: data.map((item) => formatDate(item.Date)),
    confirmed: data.map((item) => item.Confirmed),
    deaths: data.map((item) => item.Deaths),
    recovered: data.map((item) => item.Recovered),
  });

  const handleInfo = async (name) => {
    try {
      setLoading(true);
      setOpenModal(true);
      let date = new Date();
      let currentDate = formatDateRequest(date);
      let last = formatDateRequest(
        new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
      );
      const infoCountry = await getInfoCountry(name);
      const flagCountry = await getFlagCountry(name);
      const capitalCountry = await getCapitalCountry(name);
      const covidData = await getDataCovidByDate(name, {
        from: last,
        to: currentDate,
      });
      setDataCountry({
        name: infoCountry.country,
        flag: flagCountry.flag,
        capital: capitalCountry.capital,
        population:
          infoCountry.populationCounts[infoCountry.populationCounts.length - 1]
            .value,
        dataChart: formatDataChart(covidData),
        from: last,
        current: currentDate,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDate = async (data) => {
    try {
      setLoadingChart(true);
      const covidData = await getDataCovidByDate(data.name, {
        from: data.inputs.from,
        to: data.inputs.to,
      });
      setDataCountry({
        ...dataCountry,
        from: data.inputs.from,
        current: data.inputs.to,
        dataChart: formatDataChart(covidData),
      });
    } finally {
      setLoadingChart(false);
    }
  };

  const handleBookmark = async (data) => {
    let list = [...listBookmark];
    if (list.length <= 0) {
      list.push(data);
    } else if (!list.some((item) => item.ID === data.ID)) {
      list = [...list, data];
    }
    setListBookmark(list);
    setListBookmarkStorage(list);
  };

  const handleRemove = (id) => {
    let list = [...listBookmark];
    setListBookmark(list.filter((item) => item.ID !== id));
    setListBookmarkStorage(list.filter((item) => item.ID !== id));
  };

  const PerPage = 10;
  const indexOfLastNews = page * PerPage;
  const indexOfFirstNews = indexOfLastNews - PerPage;
  const currentList = listCountries.slice(indexOfFirstNews, indexOfLastNews);

  return (
    <div className="summary">
      <Container>
        <h3 className="summary_title"> Tình trạng Covid thế giới </h3>
        <div className="summary_table">
          <Table
            dataHead={DUMMY.headerTable}
            dataRow={currentList}
            handleInfo={handleInfo}
            handleBookmark={handleBookmark}
            listBookmark={listBookmark}
          />
        </div>
        <div className="summary_pagination">
          <Pagination
            total={listCountries.length}
            perPage={PerPage}
            prevLabel="Back"
            nextLabel="Next"
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            handleChangePage={handleChangePage}
          />
        </div>
        {listBookmark && listBookmark.length > 0 && (
          <div className="summary_tableBookmark">
            <h3 className="summary_title"> List Bookmark </h3>
            <Table
              dataHead={DUMMY.headerTable}
              dataRow={listBookmark}
              bookmark={true}
              handleInfo={handleInfo}
              handleRemove={handleRemove}
            />
          </div>
        )}
      </Container>
      <PopupCountry
        isOpen={openModal}
        handleClose={() => {
          setOpenModal(false);
        }}
        loadingChart={loadingChart}
        handleSubmitDate={handleSubmitDate}
        countryData={dataCountry}
        isLoading={loading}
      />
    </div>
  );
};

export default Summary;
