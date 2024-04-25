import styled from "styled-components";
export const NewFrontWrapper = styled.div`
.box1{
        /* height: 500px; */
        /* padding: 60px 8%; */
        /* background: url("https://sitecore-cd.shangri-la.com/-/media/3311/website.png?h=500&iar=0&w=1500&hash=D7FCF908B1DDE19BB61A9232F21893C2&quot;") center center / cover no-repeat; */
        background-color: ${props => props.color};
        /* overflow: hidden; */

        .inner{
            /* height: 400px; */
            width: 1180px;
            /* border: 1px solid; */
            margin: 0 auto;
            padding: 40px 5%;

            .title{
                /* border: 1px solid red; */
                .title-f{
                    font-size: 28px;
                    color: #333;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 38px;
                    font-family: PlayfairDisplay, Georgia, Times New Roman, serif;
                }

                >div{
                    margin: 20px 0 0;
                    font-size: 14px;
                    color: #333;
                    text-align: center;
                    line-height: 20px;
                    max-height: 40px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }

            .main-card{
                display: flex;
                justify-content: space-between;
                flex-direction: ${props => props.main};
                /* flex-direction: row-reverse; */
                /* border: 1px solid; */
                margin-top: 30px;
  
                .section-text{
                width: 580px;
                /* margin-top: 30px;
                margin-left: 20px; */
                /* padding-bottom: 3%; */
                flex: 0 0 48%;
                /* width: 48%; */
                /* border: 1px solid; */

                    >img{
                     width: 100%;
                     /* height: auto; */
                     box-shadow: 0 3px 6px 0 rgba(0,0,0,.18);
                    }
                }
            
            .icon-item{
                width: 530px;
                /* border: 1px solid; */
                height: 351px;
                /* margin-left: 50px; */
                /* margin-top: 89px; */

                .title-t{
                    /* border: 1px solid red; */
                    /* margin: 20px 10px; */

                    >span{
                        font-weight: 400;
                        font-family: SimSun, Microsoft YaHei, serif;
                        padding-bottom: 0;
                        font-size: 20px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        /* border: 1px solid; */
                        height: 40px;
                        line-height: 40px;
                    }
                    >div{
                        margin: 20px 0 30px;
                        font-family: Montserrat, SimHei, Microsoft YaHei, sans-serif;
                    }
                }
                >a{
                    text-align: center;
                    width: 150px;
                    padding: 10px 0;
                    display: block;
                    border: 1px solid;
                }
            }
            }
        }
    }
`