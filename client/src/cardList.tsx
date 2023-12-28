import React, { useEffect, useState } from "react";
import { Card } from "./interfaces";
import { useCardContext } from "./context/cardContext";
import { useSwitchHook } from "./context/switch-hook";

function CardList({ list }) {
  const [cardsToDis, setCardsToDis] = useState([]);
  const [cardLoading, setCardLoading] = useState(false);
  const context = useCardContext();

  useEffect(() => {
    const loadCards = async () => {
      setCardLoading(true);
      await fetch(`http://localhost:5000/cards/cardsbyid`, {
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
        cardsToDis.map((card: Card) => {
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
      {/* {list.map((card: Card, index: any) => {
        return (
          <p
            className="card-text"
            draggable="true"
            id={card._id}
            onDragStart={dragStart}
            key={card._id}
            data-col={card.column}
          >
            {card.name}
          </p>
        );
      })} */}
    </div>
  );
}

export default CardList;
