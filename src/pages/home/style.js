import styled from 'styled-components';

export const MovieCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: #000;
    border-radius: 5px;
    padding: 15px;
    position: relative;
    transition: transform 0.3s ease;
    margin-bottom: 20px; // Adicione uma margem para melhor visualização

    &:hover {
        transform: scale(1.1);
        z-index: 10;
    }
`;