import styled from 'styled-components';

const VideoCardContainer = styled.a`
  --card-width: 298px;
  --card-height: 197px;
  border: 2px solid;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  color: white;
  flex: 0 0 var(--card-width);
  width: var(--card-width);
  height: var(--card-height);
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: flex-end;
  transition: all 0.5s;

  &:hover,
  &:focus {
    margin: 0 40px;
    transform: scale(1.2);
    pointer-events: k


    & > span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &:not(:first-child) {
    margin-left: 20px;
  }
  & > span {
    width: 100%;
    height: 40%;
    background-color: rgba(0,0,0,0.8);
    padding: 20px;
    font-weight: bold;
    font-size: 18px;
    display: none;
  }
`;

export default VideoCardContainer;
