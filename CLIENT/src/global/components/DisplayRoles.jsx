import * as React from 'react';
import { Box, IconButton, Collapse, List, ListItem } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useUser } from '../../context/UserContext';

const DisplayRoles = () => {
    const { currentUser } = useUser();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box
                p={2}
                color='white'
                display='flex'
                gap={2}
                alignItems='center'
                onClick={handleClick}
                sx={{ cursor: 'pointer' }}
            >
                <FaUserCircle size={25} />
                <Box display="flex" alignItems="center" gap={1}>
                    <span>{currentUser.Roles[0] || 'User'}</span>
                    <IconButton
                        size="small"
                        sx={{ color: 'white' }}
                    >
                        {open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </IconButton>
                </Box>
            </Box>
            <Box color='white' mt={-.7}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="nav">
                        {currentUser.Roles.length > 1 ? currentUser.Roles.map((role, index) => (
                            <ListItem key={index} >
                                {role}
                            </ListItem>
                        )) : <ListItem key={1} >
                            User
                        </ListItem>}
                    </List>
                </Collapse>
            </Box>
        </>
    );
};
export default DisplayRoles;