import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from '../../assets/T-Logo.svg'
import Medal from '../../assets/medal.svg'
import Placeholder from '../../assets/profile-placeholder.svg'
import { Container, Row, Col } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { useCookies } from 'react-cookie';
import './Navbar.scss'
import { UserContext } from '../../UserContext';




export default function Navbar() {
    const {userToken} = React.useContext(UserContext)
    const [cookies, setCookie] = useCookies(['user'], ['lang']);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const lang = localStorage.getItem('lang')
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            className='mt-5'
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        <MenuItem onClick={() => {
            if(lang === 'ar'){
                localStorage.setItem('lang','en-US')
                window.location.reload()
            }else if(lang === 'en-US'){
                localStorage.setItem('lang','ar')
                window.location.reload()
            }
            handleMenuClose()
        }}>
        {lang === 'ar' ? 'تغيير اللغة' : "Change Language"}
        </MenuItem>
            <MenuItem onClick={handleMenuClose}>الملف التعريفي</MenuItem>
            <MenuItem onClick={handleMenuClose}>حسابي</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>اوسمة تستاهل</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{
                padding: '1rem', direction: `${lang ==='ar' ? 'rtl' : 'ltr'}`,
                background: '#002554'
            }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block' } }}
                    >
                        <img src={Logo} />
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }} style={{direction:`${lang === 'ar' ? 'rtl' : 'ltr'}`}}>
                        <IconButton
                            className='second-step'
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={userToken.receiveCount} color="error">
                                <img src={Medal} />
                            </Badge>
                        </IconButton>
                        <div class="first-step d-flex">
                            <Container className='mt-3'>
                                <Row>
                                    <Col className='profile-section'>
                                        <p style={{textAlign:`${lang === 'ar' ? 'right' : 'left'}`}}>{cookies.user_info.userFullName}</p>
                                        <span style={{textAlign:`${lang === 'ar' ? 'right' : 'left'}`}}>{cookies.user_info.userPosition}</span>
                                    </Col>
                                </Row>
                            </Container>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar
                                    alt=""
                                    src={cookies.user_info.userImage}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </IconButton>
                        </div>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <Avatar
                                alt=""
                                src={cookies.user_info.userImage}
                                sx={{ width: 56, height: 56 }}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
