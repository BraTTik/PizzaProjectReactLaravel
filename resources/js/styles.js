import styled, {keyframes} from 'styled-components';

const colorSet = {
    text: '#272822',
    main: '#FFAA40',
    second: '#FFDA73',
    border: '#A65C00',
    white: 'white',
    lightgray: '#F1F1F1',
}

const fonts = {
    main: 'Rubik',
    second: 'Roboto'
}

export const Header = styled.div`
    min-height: 5rem;
    width: 100%;
    background-color: ${colorSet.main};
    border-bottom: 1px solid ${colorSet.border};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`

export const HeaderContent = styled.div`
    display: flex;
    padding: 1rem .5rem;
    align-items: center;
    justify-content: space-between;
`


export const Title = styled.h1`
    font-weight: normal;
    font-size: 2.5rem;
    font-family: ${fonts.second}, sans-serif;
`
export const NavPanel = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
export const NavPanelItem = styled.div`
    margin-left: 1rem;
`

export const AppContainer = styled.div`
    width: 100%;
    padding-top: 5rem;
    color: ${colorSet.textColor};
    background-color: ${colorSet.lightgray};
`

export const CustomSelect = styled.div`
    position: relative;
    cursor: pointer;
    font-family: ${fonts.second}, sans-serif;
    select{
        border-radius: 10px;
        padding: .5rem 1rem;
        outline: none;
        text-transform: uppercase;
        /* border: 1px solid ${colorSet.border}; */
        border: none;
        box-shadow: 0px 0px 3px ${colorSet.border};
        background-color: ${colorSet.second};
    };
`

export const MainContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: auto;
`

export const PizzasWrapper = styled.div`
    width: 100%;
    background-color: ${colorSet.white};
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    @media (max-width: 970px) {
        justify-content: center;
  }
`

export const PizzaContainer = styled.div`
    max-width: 320px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
        img{
            width: 100%;
            max-height: 266px;
            object-fit: contain;
        }
`
export const PizzaContainerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    align-items: center;
`

export const PizzaContainerTitle = styled.h3`
    text-align: center;
    font-size: 1.5rem;
`

export const PizzaDescription = styled.p`
    font-size: .8rem;
    color: #7a7a7a;
    font-weight: thin;
`

export const Price = styled.div`
    font-size: 1.125rem;
    font-weight: bold;
`

export const CartItemContainer = styled.div`
    max-width: 100vw;
    min-height: 150px;
    max-height: 200px;
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    background-color: #fff;
`
export const CartItemContainerDescription = styled.div`
    display: flex;
    align-items: center;
    max-width: 70%;
    overflow-y: auto;
    img{
        height: 100%;
        margin-right: 1rem;
    }
    h3{
        font-size: 1.5rem;
        font-weight: bold;
    }
    p{
        max-height: 55px;
        overflow-y: hidden;
    }
`

export const MainButton = styled.button`
    border: none;
    background-color: ${colorSet.second};
    outline: none;
    color: ${colorSet.text};
    border-radius: 10px;
    padding: .5em 1em;
    text-transform: uppercase;
    transition: all .2s ease;
    cursor: pointer;
    font-family: ${fonts.second}, sans-serif;
    box-shadow: 0px 0px 3px ${colorSet.border};
    :hover{
        background-color: ${colorSet.main};
        color: ${colorSet.white};
    }
    :focus{
        background-color: ${colorSet.main};
        color: ${colorSet.white};
    }
    :active{
        background-color: ${colorSet.border}
    }
    :disabled{
        pointer-events: none;
        cursor: not-allowed;
        opacity: .7;
    }
`
export const EmptyCartContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    position: relative; 
    margin-top: -5rem;
`

export const EmptyCartInfo = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Total = styled.div`
    text-align: right;
    padding: 1rem;
    background-color: white;
    font-size: 1.125rem;
    font-weight: bold;
`

export const FormFieldContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    &>*{
        flex-basis: 200px;
        flex-grow: 1;
        flex-shrink: 1;
    }
 `

export const CheckoutContainer = styled.div`
    background-color: #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    @media(max-width: 700px){
        flex-direction: column-reverse;
    }
    &>*{
        flex-grow: 1;
    }
`

export const CheckoutListContainer = styled.div`
    padding: 1rem;
    font-size: 1.125rem;
    box-shadow: 0px 0px 5px ${colorSet.main + 99};
    border-radius: 5px;
    align-self: flex-start;
    margin-bottom: 1rem;
    h3{
        margin: 1rem 0rem;
    }
`

export const OrderContainer = styled.div`
    background-color: #fff;
    padding: 1rem;
    max-width: 500px;
    margin: auto;
    &>div{
        margin-bottom: 1rem;
    }
    li{
        margin-left: 1rem;
        padding: .5rem;
    }
`

export const LoginContainer = styled.div`
    background-color: #fff;
    padding: 5rem 0;
`

export const FormContainer = styled.div`
    max-width: 500px;
    box-shadow: 0px 0px 5px ${colorSet.border + '55'};
    border-radius: 5px;
    margin: auto;
    padding: 1rem;
`

export const LoaderContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
    width: 150px;
    animation: ${rotate} 3s ease infinite;
    position: absolute;
    top: 40%;
    left: 40%;
`

export const HistoryItemContainer = styled.div`
    box-shadow: 0px 3px 5px ${colorSet.border + 55};
    padding: 1rem;
`