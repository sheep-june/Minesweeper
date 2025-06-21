import commonModalStyles from './Modal.module.css';

export default function Modal({ setModalOpen, Content, ...props }) {
  const handleOverlayClick = () => {
    setModalOpen(false);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={commonModalStyles.modalOverlay}
      onMouseDown={handleOverlayClick}
    >
      <div {...props} onMouseDown={handleContentClick}>
        {Content}
      </div>
    </div>
  );
}
