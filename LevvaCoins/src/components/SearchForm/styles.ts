import styled from "styled-components";

export const SearchFormContainer = styled.form`
    display: flex;

    width: 100%;
    margin: 0 auto;
    max-width: 1120px;
    padding: 0 1.5rem;
    gap: 1rem;
     
    input{
        flex: 1;
        border-radius: 6px;
        border: 0;
        background: ${props => props.theme["gray-700"]};
        color: ${props => props.theme["yellow-500"]};
        padding: 1rem;
        &::placeholder{
            color: ${props => props.theme["gray-400"]};
        };
    }
    button{
        grid-column: 3/4;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: transparent;
        border: 1px solid ${props => props.theme["yellow-300"]};
        color: ${props => props.theme["yellow-300"]};
        font-weight: bold;
        transition: all 0.3s;
        &:hover{
            background: ${props => props.theme["yellow-500"]};
            border-color: ${props => props.theme["yellor-500"]};
            color: ${props => props.theme["gray-600"]};
            cursor: pointer;
            border-radius: 6px;
        };
    }
`;
