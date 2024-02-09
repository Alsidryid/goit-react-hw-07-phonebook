import style from './ContactsItem.module.css';
import { useRef } from 'react';

export default function ConstactsItem({ id, name, number, onDeleteContact }) {
  const btnRef = useRef();
  console.log(btnRef.current);
  return (
    <li className={style.item}>
      <p className={style.text}>
        {' '}
        name: {name}, number: {number}
      </p>
      <button
        ref={btnRef}
        className={style.btn}
        type="button"
        onClick={() => {
          btnRef.current.disabled = 'true';
          btnRef.current.classList.replace(style.btn, style.bt);
          onDeleteContact(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
