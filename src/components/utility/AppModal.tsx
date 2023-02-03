import React, {ReactNode} from 'react';
import classNames from 'classnames';
import {Button, Modal} from 'react-daisyui';

import {XCircleIcon} from '@heroicons/react/24/solid';

type AppModalPropsT = {
  children?: ReactNode;
  isOpen: boolean;
  title?: string;
  description?: string;
  requireWallet?: boolean;
  allowClickOut?: boolean;
  showClose?: boolean;
  showTopClose?: boolean;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  actionsClassName?: string;
  scrollBody?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
};

export default function AppModal({
  children,
  isOpen,
  title,
  allowClickOut = true,
  showClose = true,
  showTopClose = true,
  className,
  bodyClassName,
  headerClassName,
  actionsClassName,
  scrollBody = false,
  setIsOpen,
  onClose,
}: AppModalPropsT) {
  const onClickBackdrop = () => {
    if (!allowClickOut) return;
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <Modal open={isOpen} onClickBackdrop={onClickBackdrop} className={classNames('relative', className)}>
      {showTopClose && (
        <XCircleIcon className="h-8 w-8 absolute top-5 right-5 z-10 cursor-pointer" onClick={() => closeModal()} />
      )}
      {title && <Modal.Header className={classNames('font-bold mb-4 text-2xl', headerClassName)}>{title}</Modal.Header>}
      <Modal.Body
        className={classNames('p-2', bodyClassName, {
          'max-h-96 overflow-y-scroll': scrollBody,
        })}
      >
        <>{children}</>
      </Modal.Body>
      {showClose && (
        <Modal.Actions className={actionsClassName}>
          <Button onClick={() => closeModal()}>Close</Button>
        </Modal.Actions>
      )}
    </Modal>
  );
}
