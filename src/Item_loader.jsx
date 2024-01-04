import React, { useEffect, useState } from "react";
import "./Item_loader.css";
export default function Item_loader() {
  const [Items, setItems] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [Error, setError] = useState(null);
  const [Count, setCount] = useState(0);
  const [DisableButton, setDisableButton] = useState(false);
  async function loadData() {
    try {
      setLoader(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${
          Count === 0 ? 0 : Count * 10
        }`
      );
      const data = await response.json();
      if (data && data.products && data.products.length && Count>0) {
        setItems((prevData) => [...prevData, ...data.products]);
        
      }else setItems(data.products);
      setLoader(false);
    } catch (e) {
      setError(e);
      setLoader(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [Count]);

  useEffect(() => {
    if (Items && Items.length === 100) {
      setDisableButton(true);
    }
  }, [Items]);
  if (Loader) {
    return <div>data is loading pls wait!!!</div>;
  }

  return (
    <div className="load-more-container">
      <div className="product-container">
        {Items && Items.length
          ? Items.map((Item) => (
              <div className="products" key={Item.id}>
                <img src={Item.thumbnail} alt={Item.title} />
                <p>{Item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button
          className="but1"
          disabled={DisableButton}
          onClick={() => setCount(Count + 1)}
        >
          Load more
        </button>
        {DisableButton ? <p className="p1">you have reached 100 products</p> : null}
      </div>
    </div>
  );
}
