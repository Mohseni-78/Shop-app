import React from "react";
import styles from "./ProCart.module.css";
import trash from "../../../assets/svg/trash.svg";
import { shorten, shortenDes } from "../../../helper/functions";
import arrow from "../../../assets/svg/arrow.svg";

const ProCart = ({ item, dispatch }) => {
  return (
    <div className={styles.item}>
      <div className={styles.infoDisplay}>
        <img src={item.image} alt="" />
        <div className={styles.info}>
          <h4>
            <span>{shorten(item.title)}</span>
          </h4>
          <p>{shortenDes(item.description)}</p>
        </div>
      </div>

      <div className={styles.countDisplay}>
        <div className={styles.count}>
          <button
            className={styles.increase}
            onClick={() => dispatch({ type: "INCREASE", payload: item })}
          >
            <img src={arrow} alt="" />
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          {item.quantity === 1 ? (
            <button
              className={styles.removeBtn}
              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item })}
            >
              <img src={trash} alt="" />
            </button>
          ) : (
            <button
              className={styles.decrease}
              onClick={() => dispatch({ type: "DECREASE", payload: item })}
            >
              <img src={arrow} alt="" />
            </button>
          )}
        </div>
        <span className={styles.price}>$ {item.price * item.quantity}</span>
      </div>
    </div>
  );
};

export default ProCart;
