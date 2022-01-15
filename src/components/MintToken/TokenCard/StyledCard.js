import styled from "styled-components";
import img from "../../../assets/img/movingnight.gif";
import {
  borderRadius,
  colors,
  fontSize,
  fontWidth,
  responsiveWidths,
} from "../../../assets/style/variables";

export const Card = styled.section`
  width: 60%;
  /* max-width: 300px; */
  height: 520px;
  margin-left: 120px;
  background-color: ${colors.darkBlueCardBG};
  padding: 20px;
  border-radius: ${borderRadius.primary};

  .card__img {
    height: 46%;
    width: 100%;
    border: 2px solid ${colors.darkBlueLine};
    background-image: url(${img});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: ${borderRadius.primary};
    overflow: hidden;

    &:hover {
      .card__visible {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
        background-color: ${colors.cyanHover};
      }
    }
  }

  .card__visible {
    visibility: hidden;
    cursor: pointer;
    opacity: 0;
    transform: translateY(100px);
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .card__visible-icon {
    }
  }

  .card__text-cont {
    margin: 20px 0;
    h3 {
      font-weight: ${fontWidth.semiBold};
      color: ${colors.White};
      font-size: ${fontSize.large};
      margin-bottom: 15px;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        color: ${colors.cyan};
      }
    }
    p {
      font-size: ${fontSize.medium};
      font-weight: ${fontWidth.light};
      color: ${colors.softBlue};
    }
  }
  .card__info-box-left {
    color: ${colors.cyan};
    gap: 5px;
    font-size: ${fontSize.small};
  }
  .card__info-box-right {
    color: ${colors.softBlue};
    gap: 5px;
    font-size: ${fontSize.small};
    
  }

  .card__footer {
    border-top: 1px solid ${colors.darkBlueLine};
    padding: 20px 0;
    margin: 20px 0 0 0; 
    white-space: pre-wrap;      /* CSS3 */   
   white-space: -moz-pre-wrap; /* Firefox */    
   white-space: -pre-wrap;     /* Opera <7 */   
   white-space: -o-pre-wrap;   /* Opera 7 */    
   word-wrap: break-word;      /* IE */
    
    .avatar {
      width: 30px;
      height: 30px;
      border: 1px solid ${colors.White};
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    p {
      span {
        color: ${colors.White};
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          color: ${colors.cyan};
        }
      }
    }
    p.letters{
      word-wrap: break-word;
    }

    p.words {
      word-wrap: break-word;
    }
  }

  @media (max-width: ${responsiveWidths.mabile}) {
    height: 80vh;
    .card__text-cont{
      margin: 10px 0;
    }
    .card__footer{
      padding: 10px 0;
      margin: 5px 0 0 0;
    }
  }
`;

export const BoxShadow = styled.div`
  box-shadow: 0 18px 2px  ${(props)=>props.size || '15px'}  ${({color})=> color};
  border-radius: ${borderRadius.primary};
`;
