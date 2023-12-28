import React, { useEffect, useState } from "react";
import { useCardContext } from "./context/cardContext";

function CardList({ list }) {
  const [cardsToDis, setCardsToDis] = useState([]);
  const [cardLoading, setCardLoading] = useState(false);
  const context = useCardContext();

  useEffect(() => {
    const loadCards = async () => {
      setCardLoading(true);
      await fetch(`https://flatandvila.onrender.com/cards/cardsbyid`, {
        method: "POST",
        body: JSON.stringify({ list }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("result", result);
          setCardsToDis(result?.cards);
        });
      setCardLoading(false);
    };

    loadCards();
  }, []);

  const dragStart = (e: any) => {
    context.setItem(e.target.id);
    context.setFrom(e.target.dataset.col);
    context.setValue(e.target.dataset.value);
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  return (
    <div className="card-list">
      {cardLoading ? (
        <p>loading..</p>
      ) : (
        cardsToDis.map((card: any) => {
          return (
            <p
              draggable="true"
              key={card._id}
              className="card-text"
              id={card._id}
              onDragStart={dragStart}
              data-col={card.column}
              data-value={card.name}
            >
              {card.name}
            </p>
          );
        })
      )}
    </div>
  );
}

export default CardList;
