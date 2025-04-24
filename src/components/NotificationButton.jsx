// src/components/NotificationButton.jsx
import React from 'react';
import styled from 'styled-components';

const NotificationButton = ({ count = 1, onClick }) => {
  return (
    <StyledWrapper data-count={count}>
      <button onClick={onClick}>📩You Have a New Message!</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    position: relative;
    z-index: 1;
    border-radius: 8px;
    padding: 1em 2em;
    border: none;
    background: #d2e4c4;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }

  button::before {
    content: attr(data-count);
    position: absolute;
    top: -0.6em;
    right: -0.6em;
    height: 1.6em;
    width: 1.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    background-color: red;
    color: white;
    border-radius: 50%;
    z-index: 2;
    transition: all 0.2s;
  }

  button:hover::before {
    height: 2em;
    width: 2em;
    font-size: 1.1rem;
  }
`;

export default NotificationButton;
