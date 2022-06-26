import './InfoTooltip.css';
import useEscapePress from '../../hooks/useEscapePress.jsx';

export default function InfoTooltip({ onClose, status: { isOpen, successful, text } }) {
  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  useEscapePress(onClose, isOpen);

  return (
    <div
      className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`}
      onClick={onClose}
    >
      <div className="info-tooltip__container" onClick={handleClickOverlay}>
        <div
          className={`info-tooltip__status ${
            successful
              ? 'info-tooltip__status_success'
              : 'info-tooltip__status_fail'
          }`}
        ></div>
        <h2 className="info-tooltip__title">{text}</h2>
        <button
          type="button"
          className="info-tooltip__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
