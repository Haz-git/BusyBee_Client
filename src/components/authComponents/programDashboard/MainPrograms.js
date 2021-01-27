import React, { useState, useEffect } from 'react';

//Redux:
import { connect } from 'react-redux';
import {
    getUserProgramData,
    addNewProgram,
    editExistingProgram,
    deleteExistingProgram,
} from '../../../redux/userPrograms/userProgramActions';
import { v4 as uuid } from 'uuid';

//Components:
import SearchBar from '../statsDashboard/SearchBar';
import CreateProgramButton from './CreateProgramButton';
import CreateProgramModal from './CreateProgramModal';
import ProgramCard from './ProgramCard';

//Styles:
import styled from 'styled-components';
import { MainHeader } from '../dashboardComponents/UserGreeting';

const MainContainer = styled.div`
    display: block;
    text-align: center;
    padding: 0.5em 0.5em;
    /* overflow-y: scroll; */
`;

const SecondaryProgramHeader = styled(MainHeader)`
    font-size: 1em;
    font-weight: 400;
    white-space: nowrap;
    margin: 1em 0;
`;

const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    z-index: 100 !important;
    background: ${({ theme }) => theme.background};
    padding: 0.5em 0;
`;

const ProgramCardContainer = styled.div``;

//Render:
const MainPrograms = ({
    addNewProgram,
    editExistingProgram,
    deleteExistingProgram,
    getUserProgramData,
    programs,
}) => {
    useEffect(() => {
        getUserProgramData();
    }, []);

    //This state controls snackbars:
    const [openAddProgramSnackbar, setOpenAddProgramSnackbar] = useState(false);
    const [openEditProgramSnackbar, setOpenEditProgramSnackbar] = useState(
        false
    );
    const [openDeleteProgramSnackbar, setOpenDeleteProgramSnackbar] = useState(
        false
    );
    //This state controls the filtered array for programs:
    const [userSearchArray, setUserSearchArray] = useState(null);

    //This state controls program open/close:
    const [stateProgramAddModal, setStateProgramAddModal] = useState(false);

    //These states control the input text fields to create a new program:
    const [inputProgramName, setInputProgramName] = useState(undefined);
    const [inputProgramDesc, setInputProgramDesc] = useState(undefined);

    //Add Program modal functions:
    const openAddProgramModal = () => {
        setStateProgramAddModal(true);
    };

    const closeAddProgramModal = () => {
        setStateProgramAddModal(false);
    };

    //Add Program Input function controllers:

    const addTitleInput = (e) => {
        setInputProgramName(e.target.value);
    };

    const addDescInput = (e) => {
        setInputProgramDesc(e.target.value);
    };

    const submitUserInputs = () => {
        if (
            inputProgramName !== undefined &&
            inputProgramName !== null &&
            inputProgramName !== ''
        ) {
            addNewProgram(inputProgramName, inputProgramDesc);
            setStateProgramAddModal(false);
        } else {
            alert('Please enter a program name.');
        }
    };

    //Rendering Program Cards based on state:

    const renderProgramCards = () => {
        if (
            programs.programs !== undefined &&
            programs.programs !== null &&
            userSearchArray === null
        ) {
            return programs.programs.map((program) => (
                <ProgramCard
                    key={uuid()}
                    name={program.programName}
                    desc={program.programDesc}
                    programId={program.programId}
                    programExercises={program.programExercises}
                    dateCreated={program.dateCreated}
                    editAction={editExistingProgram}
                    deleteAction={deleteExistingProgram}
                />
            ));
        } else if (
            programs.programs !== undefined &&
            programs.programs !== null &&
            userSearchArray !== null
        ) {
            return userSearchArray.map((program) => (
                <ProgramCard
                    key={uuid()}
                    name={program.programName}
                    desc={program.programDesc}
                    programId={program.programId}
                    programExercises={program.programExercises}
                    dateCreated={program.dateCreated}
                    editAction={editExistingProgram}
                    deleteAction={deleteExistingProgram}
                />
            ));
        } else {
            return null;
        }
    };

    //Find total number of programs:

    const renderNumberOfPrograms = () => {
        if (programs.programs !== undefined && programs.programs !== null) {
            return programs.programs.length;
        } else {
            return null;
        }
    };

    //Handle programs search bar change:
    const handleSearchBarChange = (e) => {
        let filteredArray;
        //Filter stats.stats array:
        if (programs.programs !== undefined && programs.programs !== null) {
            filteredArray = programs.programs.filter((program) => {
                return program.programName
                    .trim()
                    .toLowerCase()
                    .includes(e.target.value.trim().toLowerCase());
            });
        }

        //Prevents React not re-rendering cards after a search:

        if (e.target.value === '') {
            setUserSearchArray(null);
        } else {
            setUserSearchArray(filteredArray);
        }
    };

    return (
        <>
            <CreateProgramModal
                headerLabel="Create a new program"
                arialLabel="Modal for adding a new program"
                ariaDesc="Modal for adding a program"
                openBoolean={stateProgramAddModal}
                closeFunction={closeAddProgramModal}
                titleFunction={addTitleInput}
                descFunction={addDescInput}
                submitHandler={submitUserInputs}
            />
            <MainContainer>
                <MainHeader>Program Manager</MainHeader>
                <SecondaryProgramHeader>
                    Design and run your lifting programs.
                </SecondaryProgramHeader>
                <SearchBarContainer>
                    <SearchBar
                        placeholder="Total Programs"
                        value={renderNumberOfPrograms()}
                        changeFunction={handleSearchBarChange}
                    />
                    <CreateProgramButton clickFunction={openAddProgramModal} />
                </SearchBarContainer>
                <ProgramCardContainer>
                    {renderProgramCards()}
                </ProgramCardContainer>
            </MainContainer>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        programs: state.programs,
    };
};

export default connect(mapStateToProps, {
    getUserProgramData,
    addNewProgram,
    editExistingProgram,
    deleteExistingProgram,
})(MainPrograms);
