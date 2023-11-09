import styled from "styled-components"

import logo from "../assets/logo.png";

const Box = styled.div`
    width: 100%;
    display: flex;
    background-color: #f8f8f9;
`;
const Logo = styled.img`
    margin: auto;
    margin-top: 15px;
    width: 20vw;
`;

function Header(){
    return(
        <Box>
            <Logo src={logo} alt="" />
        </Box>
    );
}

export default Header;