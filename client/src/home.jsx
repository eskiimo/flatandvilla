import { useState, useEffect } from "react";
import "./App.css";
import CardList from "./cardList";
import { useCardContext } from "./context/cardContext";

function Home() {
  const [columns, setColumns] = useState([]);
  const context = useCardContext();

  const getColumns = async () => {
    await fetch("http://localhost:5000/columns")
      .then((res) => res.json())
      .then((result) => {
        setColumns(result.columns);
      });
  };

  useEffect(() => {
    getColumns();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const switchCol = async (to) => {
    await fetch(`http://localhost:5000/cards/${context.item}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    let newBody = JSON.stringify({
      name: context.value,
      column: to,
    });
    console.log("body:", newBody);
    await fetch(`https://localhost:5000/cards`, {
      method: "POST",
      body: newBody,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (event) => {
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
    switchCol(event.target.id);
  };

  return (
    <>
      <div className="container">
        {columns.map((col) => (
          <div
            key={col._id}
            className="column"
            id={col._id}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <p className="col-header">{col.name}</p>
            <CardList list={col.cards} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
