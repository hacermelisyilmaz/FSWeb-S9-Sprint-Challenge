import React, { useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [stepNumber, setStepNumber] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  function getXY(aActiveIndex) {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const sqNumber = aActiveIndex + 1;
    let X = sqNumber % 3 ? sqNumber % 3 : 3;
    let Y = Math.ceil(sqNumber / 3);

    return [X, Y];
  }

  function getXYMesaj(aGetXY, aActiveIndex) {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const [X, Y] = aGetXY(aActiveIndex);
    return `Koordinatlar (${X}, ${Y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setActiveIndex(initialIndex);
    setStepNumber(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için, şu anki indeksi değiştirmemeli.
    let flag = false;

    if (yon === "left") {
      if (getXY(activeIndex)[0] === 1) {
        flag = true;
        setMessage("Sola gidemezsiniz");
      } else setActiveIndex(activeIndex - 1);
    } else if (yon === "up") {
      if (getXY(activeIndex)[1] === 1) {
        flag = true;
        setMessage("Yukarıya gidemezsiniz");
      } else setActiveIndex(activeIndex - 3);
    } else if (yon === "right") {
      if (getXY(activeIndex)[0] === 3) {
        flag = true;
        setMessage("Sağa gidemezsiniz");
      } else setActiveIndex(activeIndex + 1);
    } else if (yon === "down") {
      if (getXY(activeIndex)[1] === 3) {
        flag = true;
        setMessage("Aşağıya gidemezsiniz");
      } else setActiveIndex(activeIndex + 3);
    }

    flag || setStepNumber(stepNumber + 1);
  }

  function clickHandler(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    sonrakiIndex(evt.target.id);
  }

  function changeHandler(evt) {
    const emailDOM = document.getElementById("email");
    setEmail(emailDOM.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    setEmail(initialEmail);

    axios
      .post("http://localhost:9000/api/result", {
        email: email,
        x: getXY(activeIndex)[0],
        y: getXY(activeIndex)[1],
        steps: stepNumber,
      })
      .then(function (response) {
        setMessage(response.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates" data-testid="coordinates-info">
          {getXYMesaj(getXY, activeIndex)}
        </h3>
        <h3
          id="steps"
          data-testid="steps-info"
        >{`${stepNumber} kere ilerlediniz`}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === activeIndex ? " active" : ""}`}
          >
            {idx === activeIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={clickHandler} data-testid="button-left">
          SOL
        </button>
        <button id="up" onClick={clickHandler} data-testid="button-up">
          YUKARI
        </button>
        <button id="right" onClick={clickHandler} data-testid="button-right">
          SAĞ
        </button>
        <button id="down" onClick={clickHandler} data-testid="button-down">
          AŞAĞI
        </button>
        <button id="reset" onClick={reset} data-testid="button-reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={changeHandler}
          value={email}
          data-testid="email-input"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
