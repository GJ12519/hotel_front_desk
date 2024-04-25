import { styled } from "styled-components";

export const LeftWrapper = styled.div`
flex:1;
display: flex;
align-items: center;
color: ${props => props.theme.color.primaryColor};
margin-left: 50px;

.logo{
    cursor: pointer;
    margin-left: 24px;

    >img{
        width: 45px;
    }
    >span{
        height: 50px;
        line-height: 50px;
    }
}
`