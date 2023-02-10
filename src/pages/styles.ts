import styled, { keyframes } from "styled-components";

interface NotificationProps {
  notification?: boolean;
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(10deg)
  }
`

const spiner = keyframes`
  to {
    transform: rotate(1turn);
  }
`

export const Container = styled.div<NotificationProps>`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
width: 100vw;
padding: 1rem;
transition: 0.5s ease-in-out box-shadow;
box-shadow: ${props => props.notification === true ? '0px 0px 50px 4px inset #0ead60' : '0px'};
background-color: ${props => props.theme.colors.primary};
color: ${props => props.theme.colors.textPrimary};


`

export const Content = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #DDDDDD;
  gap: 1rem;

  header {
    width: 100%;
    display: flex;
  }

  input {
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem;
    border: 1px solid #DDD;
    font-size: 14px;
    color: #585858;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:disabled {
      background-color: #DDDDDD50;
      cursor: not-allowed;
    }
  }

  .button-notification {
    width: auto;
    padding: 0 0.8rem;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 0;
    height: 2.5rem;
    background-color: #6247aa;

    svg {
      color: #FFF
    };

    &:disabled {
      background-color: #6247aa70;
      cursor: not-allowed;
    }
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    .container-todo {
      width: 100%;
      border: 1px solid #DDD;
      border-radius: 6px;
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
      gap: 0.8rem;
      align-items: center;

      .avatar {
        color: #6247aa;
        animation: 1s ${rotate} ease-in-out alternate infinite;
      }

      .todo-items {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        p {
          font-size: 14px;
          font-weight: 500;
          color: #585858;
        }

        span {
          font-size: 12px;
          color: #A5A5A5;
        }
      }

      .trash {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #DDDDDD00;
        border: 0;

        &:hover {
          color: red;
        }
      }
    }
  }
`

export const Divider = styled.div`
  height: 30px;
  width: 1px;
  background-color: #D2D2D2;
`

export const Loading = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  width: 50px;
  height: 50px;
  margin: 1rem;
  border-radius: 50%;
  border: 6px solid #e5e5e5;
  border-top-color: #6247aa;

  animation: 1s ${spiner} infinite;
`