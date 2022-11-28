import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../../services/Api";
import loading from "../../assets/images/loading.gif";

import styles from "./ProductDetail.module.css";

import { isInCart, quantityCount, shortenDes } from "../../helper/functions";

import arrow from "../../assets/svg/arrow.svg";
import trash from "../../assets/svg/trash.svg";

// import { ProductContext } from "../contexts/ProductContextProvider";
import { cartContext } from "../../contexts/CartContextProvider";

const ProductDetail = () => {
  const { state, dispatch } = useContext(cartContext);
  const param = useParams();
  const id = param.id;
  const [proItem, setProItem] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      setProItem(await getApi(id));
    };
    fetchApi();
  }, [id]);

  //   const proItem= products[param.id - 1];

  return (
    <>
      {proItem ? (
        <div className={styles.container}>
          <img src={proItem.image} id="product-image" alt="" />
          <div className={styles.left}>
            <h1>{proItem.title}</h1>
            <span className={styles.price}>{proItem.price} $</span>
            <p>{shortenDes(proItem.description)}</p>
          </div>

          <div className={styles.btnGroups}>
            {isInCart(state, proItem.id) ? (
              <button
                className={styles.increase}
                onClick={() => dispatch({ type: "INCREASE", payload: proItem })}
              >
                <img src={arrow} alt="arrow" />
              </button>
            ) : (
              <button
                className={styles.addBtn}
                onClick={() => dispatch({ type: "ADD_ITEM", payload: proItem })}
              >
                اضافه کردن به سبد خرید
              </button>
            )}
            {quantityCount(state, proItem.id) > 0 && (
              <span className={styles.count}>
                {quantityCount(state, proItem.id)}
              </span>
            )}
            {quantityCount(state, proItem.id) === 1 && (
              <button
                className={styles.removeBtn}
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: proItem })
                }
              >
                <img src={trash} alt="" />
              </button>
            )}
            {quantityCount(state, proItem.id) > 1 && (
              <button
                className={styles.decrease}
                onClick={() => dispatch({ type: "DECREASE", payload: proItem })}
              >
                <img src={arrow} alt="" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <img src={loading} alt="" />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
