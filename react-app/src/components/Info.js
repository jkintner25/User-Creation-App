import styled from "styled-components";
import business from "../images/business.jpg"

const BusinessImg = styled.img`
position: relative;
height: 100vh;
width: auto;
margin: 0;
padding: 0;
`

function Info() {


    return (
        <>
            <BusinessImg src={business} alt='' />
        </>
    )
};

export default Info;
