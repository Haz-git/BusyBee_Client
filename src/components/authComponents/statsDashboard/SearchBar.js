import React from 'react';
import styled from 'styled-components';

//Styles:
import { Search } from '@styled-icons/material-rounded/Search';

const WrapperContainer = styled.div`
    position: relative;
    display: flex;
    max-height: 4em;
    width: 100%;
    max-width: 100%;
    align-items: center;
    justify-content: center;
`;

const StyledSearchIcon = styled(Search)`
    position: absolute;
    left: 0.4em;
    color: rgb(255, 169, 0);
    height: 2em;
    width: 2em;
`;

const StyledInput = styled.input`
    border: 1px solid grey;
    border-radius: 0.4em;
    height: 3em;
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 2.4em;
    padding-right: 1em;
    outline: 0;
    background: #27303f;
    color: white;
    font-size: 1.1em;
    font-weight: 300;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 6px;

    &:focus {
        outline: none;
    }
`;

//Render:

const SearchBar = ({ value, changeFunction, placeholder }) => {
    return (
        <WrapperContainer>
            <StyledSearchIcon />
            <StyledInput
                placeholder={`${
                    value !== undefined ? value : '?'
                } ${placeholder}`}
                onChange={changeFunction}
            />
        </WrapperContainer>
    );
};

export default SearchBar;
