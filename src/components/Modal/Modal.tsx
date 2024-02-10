import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  visible: boolean;
  closeModal?: () => void;
  title?: string;
};

const Modal: React.FC<Props> = ({ visible, children, closeModal, title }) => {
  if (!visible) return <></>;
  // TODO: pass styling to css file
  return (
    <div className="justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 w-full md:inset-0 h-modal md:h-full">
      <div className="w-screen h-screen bg-black/75 flex justify-center items-center fixed top-0 left-0">
        <div className="bg-white rounded-lg md:w-1/2 pb-10">
          {title && (
            <div className="flex justify-center self-center align-middle mb-5 border-b pl-8 pr-8 pb-4">
              <h3 className="grow text-xl py-2 h-7">{title}</h3>
              {closeModal && (
                <button
                  type="submit"
                  className="bg-white-400 uppercase text-xl py-2 h-7"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  X
                </button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
