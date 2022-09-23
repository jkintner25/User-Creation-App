import styled from "styled-components";
import businessImg from "../images/business.jpg"

const WallpaperImg = styled.img`
  position: relative;
  height: 100vh;
  width: auto;
  margin: 0;
  padding: 0;
`

const Wallpaper = () => (
  <WallpaperImg src={businessImg} alt='' />
);

export default Wallpaper;
