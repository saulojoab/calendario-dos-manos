import React, { useEffect, useState } from "react";
import styles from "./CalendarPage.module.scss";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";
import { isSameDay } from "date-fns";

export default function CalendarPage(props) {
  const [data, setData] = useState([]);

  async function getData() {
    const res = await fetch("https://calendario-casas-api.herokuapp.com/datas");

    const dataObj = await res.json();
    const dataFormattedArray = [];
    dataObj.map((dataIterable) => {
      getDaysArray(
        new Date(dataIterable.dates.startDate),
        new Date(dataIterable.dates.endDate)
      ).map((val) => dataFormattedArray.push(val));
    });
    console.log(dataFormattedArray);
    setData(dataFormattedArray);
  }

  var getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  useEffect(() => {
    getData();
  }, []);

  function disableDay({ date }) {
    return data.find((d) => isSameDay(d, date));
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        Olá <b>{props.location?.state?.name || "ARROMBADO"}</b>, abaixo estão os
        dias disponíveis pra viagem.
      </span>
      <br />
      <span className={styles.subTitle}>
        Os =indisponíveis= estão desabilitados.
      </span>
      <br />

      {data.length > 0 && (
        <Calendar
          defaultActiveStartDate={new Date("2021", "11", "01")}
          tileDisabled={disableDay}
        />
      )}
    </div>
  );
}
