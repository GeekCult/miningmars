import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 700;
    width: inherit;
    outline: 0;

    @media (max-width: 480px) {
        padding: 0 15px;
    }
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

export const StyledModal = styled.div`
    z-index: 100;
    width: auto;
    background: white;
    position: relative;
    margin: auto;
    border-radius: 8px;
    display: table;
    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const Header = styled.div`
  border-radius: 0px 0px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  background: #212121;
  padding: 10px;
`;

export const HeaderText = styled.div`
  color: #fff;
  align-self: center;
  color: lightgray;
`;

export const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  color: #fff;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  padding: 10px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
`;
