import './Register.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

export default function Register() {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // handleRegister(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="register">
      <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
        <Link to="/" className="register__link">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__labels-container">
          <label className="register__label">
            <span className="register__label-text">Имя</span>
            <input
              name="name"
              className={`register__input ${errors.name && 'register__input_error'}`}
              onChange={handleChange}
              value={values.name || ''}
              type="text"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="register__error">{errors.name || ''}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">E-mail</span>
            <input
              name="email"
              className={`register__input ${errors.email && 'register__input_error'}`}
              onChange={handleChange}
              value={values.email || ''}
              type="email"
              required
            />
            <span className="register__error">{errors.email || ''}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              name="password"
              className={`register__input ${errors.password && 'register__input_error'}`}
              onChange={handleChange}
              value={values.password || ''}
              type="password"
              required
            />
            <span className="register__error">{errors.password || ''}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`register__button ${
            !isValid && 'register__button_disabled'
          }`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <span className="register__support">
          Уже зарегистрированы?&nbsp;
          <Link to="signin" className="register__link">
            Войти
          </Link>
        </span>
      </form>
    </main>
  )
}
