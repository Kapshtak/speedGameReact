interface ModalProps {
  children: any,
  visible: boolean,
  changeVisibility: () => void
}

const Modal = ({ children, visible, changeVisibility }: ModalProps) => {
  if (visible) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-20 justify-center items-center ${
        !visible ? 'hidden' : 'flex'
      }`}
      onClick={changeVisibility}
    >
      <div
        className="p-[25px] bg-white rounded-xl max-w-[600px] max-h-[300px] flex flex-col justify-center align-middle"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
