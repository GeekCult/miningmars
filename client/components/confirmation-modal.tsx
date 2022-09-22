import React, { FunctionComponent } from 'react';
import { ConfirmationButtons, Message, StyledModal } from '../css/confirmation-modal.style';

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = (props) => {
  return (
    <React.Fragment>
        <StyledModal>
            <Message>{props.message}</Message>
            <ConfirmationButtons>
                <button onClick={props.onCancel} className="btn btn-second mgR0">No</button>
                <button onClick={props.onConfirm} className="btn btn-main">Yes</button>
            </ConfirmationButtons>
        </StyledModal>
    </React.Fragment>
  );
};