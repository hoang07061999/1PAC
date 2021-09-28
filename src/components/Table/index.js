import React from "react";
import formatDate from "../../hooks/formatDate";

import useSortTable from "../../hooks/useSortTable";
import Loading from "../Loading";

const Table = ({
  dataHead,
  dataRow,
  handleInfo = () => {},
  handleBookmark = () => {},
  handleRemove = () => {},
  bookmark,
  listBookmark,
}) => {
  const dataSort = useSortTable(dataRow);
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {dataHead?.map((item, index) => (
              <th key={`th-${index.toString()}`}>
                <div
                  onClick={() =>
                    item.sort && item.key && dataSort.requestSort(item.key)
                  }
                  className={`table_th ${index === 0 && "table_th-first"} ${
                    item.sort && "sort"
                  }`}
                >
                  <p modifiers={["northTexasGreen", "500", "md"]}>
                    {item.title}
                  </p>
                  {item.sort && item.key && (
                    <i
                      className={`table_iconSort ${
                        dataSort.sortConfig?.key === item.key
                          ? "table_iconSort-active"
                          : ""
                      }`}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRow && dataRow.length > 0 ? (
            dataSort.items.map((item, index) => (
              <tr key={`tr-${index.toString()}`}>
                <td>{item.Country}</td>
                <td>{item.NewConfirmed}</td>
                <td>{item.TotalConfirmed}</td>
                <td>{item.NewDeaths}</td>
                <td>{item.TotalDeaths}</td>
                <td>{item.NewRecovered}</td>
                <td>{item.TotalRecovered}</td>
                <td>{formatDate(item.Date)}</td>
                <td>
                  <div className="table_action">
                    {!bookmark ? (
                      <>
                        <i
                          onClick={() => handleInfo(item.Country)}
                          className="table_iconInfo"
                        />
                        <i
                          onClick={() => handleBookmark(item)}
                          className={
                            listBookmark.some((list) => list.ID === item.ID)
                              ? "table_iconBookmarked"
                              : "table_iconBookmark"
                          }
                        />
                      </>
                    ) : (
                      <>
                        <i
                          onClick={() => handleInfo(item.Country)}
                          className="table_iconInfo"
                        />
                        <i
                          onClick={() => handleRemove(item.ID)}
                          className="table_iconRemove"
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>
                <Loading isShow={true} />
                <p className="table_invalidDataText">Hiện chưa có dữ liệu</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
