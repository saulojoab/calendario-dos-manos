import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { ptBR } from "react-date-range/src/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format } from "date-fns";
import styles from "./main.module.scss";

export default function Main() {
  const [state, setState] = useState([
    {
      startDate: new Date("2021", "10", "01"),
      endDate: addDays(new Date("2021", "10", "01"), 1),
      key: "selection",
    },
  ]);
  const [name, setName] = useState("");

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    console.log(selection);
    setState([selection]);
  };

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function submitData() {
    const payload = {
      dates: state[0],
      name,
    };

    console.log(payload);
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>COE QUERIDO AMIGO, FORTAL?!?!</span>
      <span className={styles.subTitle}>
        Por favor, insira seu nome e os dias que você{" "}
        <span className={styles.alert}> =NÃO PODE IR= </span> pra viagem!
      </span>
      <span className={styles.subTitle}>
        Usaremos isso como base pra ver os dias disponíveis.
      </span>

      <div className={styles.inputContainer}>
        <span className={styles.label}>Insira seu nome abaixo:</span>
        <input
          onChange={handleNameChange}
          className={styles.input}
          type="text"
          placeholder="Seu nome"
        />
      </div>

      <br />

      <div
        className={name != "" ? styles.calendarDivShow : styles.calendarDivHide}
      >
        <span className={styles.label}>
          Selecione um intervalo de datas abaixo:
        </span>
        <div className={styles.calendarContainer}>
          <DateRangePicker
            disabled={name === ""}
            onChange={handleOnChange}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={false}
            ranges={state}
            direction="horizontal"
            minDate={new Date("2021", "10", "01")}
            startDate={new Date("2021", "10", "01")}
            locale={ptBR}
          />
        </div>

        <span className={styles.dateSelected}>
          Você selecionou de <b>{format(state[0].startDate, "dd/MM/yyyy")}</b>{" "}
          até <b>{format(state[0].endDate, "dd/MM/yyyy")}</b>.
        </span>
        <span className={styles.dateSelected}>
          <b>LEMBRE:</b> Essas datas não estarão mais disponíveis pra viagem.
        </span>

        <button onClick={submitData} className={styles.button}>
          Enviar
        </button>
      </div>
    </div>
  );
}