import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Man from '../../assets/saudi man.svg'
import Select, { components } from 'react-select';
import Icon1 from '../../assets/coop.svg'
import Icon2 from '../../assets/great.svg'
import Icon3 from '../../assets/postive.svg'
import Icon4 from '../../assets/creative.svg'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { isMobileOnly } from 'react-device-detect';
import './Body.scss'
import { useCookies } from 'react-cookie';
import { Alert } from 'react-bootstrap'
import FadeIn from 'react-fade-in'

const Body = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [options, setOptions] = React.useState([])
    const [activeButton, setActiveButton] = React.useState(0)
    const [chosenUser, setChosenUser] = React.useState([])
    const [cookies, setCookie] = useCookies(['user']);
    const lang = localStorage.getItem('lang')
    const NoOptionsMessage = () => {
        return (
            <div className='d-flex justify-content-center align-items-center m-0 p-2'>
                <p className='p-0 m-0' style={{ fontFamily: 'custom-font-regular', color: 'grey' }}>
                    {lang === 'ar' ? 'لا يوجد نتائج' : 'No results'}
                </p>
            </div>
        );
    };
    const Option = (props) => {
        return (
            <div className='d-flex  align-items-center m-0 p-2'>
                <Avatar
                    alt=""
                    src={props.data.img}
                    sx={{ width: 56, height: 56 }}
                />
                <components.Option className='p-3' {...props} />
            </div>
        );
    };
    const LoadingMessage = () => {
        return (
            <div className='d-flex justify-content-center align-items-center m-0 p-2'>
                <p className='p-0 m-0' style={{ fontFamily: 'custom-font-regular', color: 'grey' }}>

                    {lang === 'en' ?
                        <>
                            {isLoading ? "Now Searching" : "No Results"}
                        </> :
                        <>
                            {isLoading ? "يتم الآن البحث" : "لا يوجد نتائج"}
                        </>

                    }

                </p>
            </div>
        );
    };
    const MultiValueLabel = (props) => {
        return (
            <div className='d-flex  align-items-center m-0 p-2'>
                <Avatar
                    className='ms-2'
                    alt=""
                    src={props.data.img}
                    sx={{ width: 30, height: 30 }}
                />
                <components.MultiValueLabel className='p-3'>
                    {props.data.name}
                </components.MultiValueLabel>
            </div>
        );
    }

    const handleChange = (selectedOption) => {
        setChosenUser(selectedOption)
        console.log(selectedOption)
    }
    return (
        <Container className={`${isMobileOnly ? "mobile" : ""} body`}>
            {chosenUser.length > cookies.user_counts.balanceCount ?
                <FadeIn>
                    <Alert className='m-3' variant='danger'>
                        {lang ? 'الرجاء التأكد بأن رصيد تستاهل يكفي' : ""}
                    </Alert>
                </FadeIn> : ""}
            <Container className="top-wrapper">
                <Row className={`${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                    <Col className={`${lang === 'en' ? 'text-end' : 'text-start'}`} xs={4} md={6} lg={6}>
                        <img className='top-icon' src={Man} />
                    </Col>
                    <Col className={`${lang === 'en' ? 'text-start' : 'text-end'} text-section`} xs={8} md={6} lg={6}>
                        <p>
                            {lang === "en" ? `Welcome ${cookies.user_info.userFullName}` : `حياك الله ${cookies.user_info.userFullName}`}
                        </p>
                        <span>
                            {lang === 'en' ? 'There is nothing better than hearing expressions of thanks and appreciation for the employees' : 'لا يوجد أفضل من سماع عبارات شكر وتقدير للموظفين'}
                        </span>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='middle-wrapper'>
                <Row className={`align-items-center mobile-reverese ${lang === 'en' ? 'flex-row-reverse' : ''} `}>
                    <Col xs={12} md={3} lg={3}>
                        <button className={`gift-button third-step ${lang === 'en' ? 'ltr' : 'rtl'}`}>
                            {lang === 'en' ? <>Remaining <span className='ms-2'>{cookies.user_counts.balanceCount}</span> </>
                                : <>المتبقي<span className='me-2'>{cookies.user_counts.balanceCount}</span></>
                            }

                        </button>
                    </Col>
                    <Col xs={12} md={9} lg={9} style={{
                        direction: `${lang === 'en' ? 'ltr' : 'rtl'}`
                    }}
                        className='fourth-step'
                    >
                        <Select
                            className={`${lang === 'en' ? 'ltr' : 'rtl'} basic-single searchField"`}
                            classNamePrefix="select"
                            placeholder={`${lang === 'en' ? "look for a colleague/friend who deserves thanks" : "ابحث عن زميل/صديق يستاهل الشكر"}`}
                            isClearable
                            isLoading={isLoading}
                            isRtl={true}
                            isMulti={true}
                            isSearchable={true}
                            components={{ NoOptionsMessage, LoadingMessage, Option, MultiValueLabel }}
                            styles={{
                                noOptionsMessage: (base) => ({ ...base }),
                                loadingMessage: (base) => ({ ...base }),
                                option: (base) => ({ ...base }),
                                multiValueLabel: (base) => ({ ...base })
                            }}
                            name="data"
                            options={options}
                            onChange={handleChange}
                            onInputChange={(e) => {
                                setOptions([])
                                setIsLoading(true)
                                if (e.length === 0) {
                                    setIsLoading(false)
                                }
                                if (e.length > 1) {
                                    axios.get("http://10.1.110.202/api/Tistahel/GetMemberDB?id=" + e, {
                                        headers: {
                                            'Authorization': 'QXZlbG8gQ29yZSBBUEkgZm9yIEVzb2x1dGlvbg=='
                                        }
                                    }).then(res => {
                                        const tempArr = []
                                        res.data.map((item, index) => {
                                            const option = { value: item.userFullName, label: `${item.userFullName} - ${item.userPosition}`, img: item.userImage, name: item.userFullName }
                                            if (options.includes(item)) {
                                            } else {
                                                tempArr.push(option)
                                            }
                                        })
                                        setOptions(tempArr)
                                        setIsLoading(false)
                                    }).catch(err => console.log(err))
                                }
                            }}
                        />
                    </Col>
                </Row>
                <Container className="middle-content">
                    <Row className='mt-5'>
                        <Col style={{ direction: `${lang === 'en' ? 'ltr' : 'rtl'}` }}>
                            <h1>{lang === 'en' ? 'Thank you for ..' : 'شكرا لأنك ..'}</h1>
                        </Col>
                    </Row>
                    <Row className='buttons-row mt-5 flex-row-reverse fifth-step'>
                        <Col>
                            <button className={`${activeButton === 1 ? "active" : ""} ${lang === 'en' ? "english" : ""} custom-button`} onClick={() => {
                                if (activeButton === 1) {
                                    setActiveButton(0)
                                } else {
                                    setActiveButton(1)
                                }
                            }}>
                                <img alt='' src={Icon1} />
                                {lang === 'en' ? 'Cooperative' : 'متعاون'}
                            </button>
                        </Col>
                        <Col>
                            <button className={`${activeButton === 2 ? "active" : ""} ${lang === 'en' ? "english" : ""} custom-button`}
                                onClick={() => {
                                    if (activeButton === 2) {
                                        setActiveButton(0)
                                    } else {
                                        setActiveButton(2)
                                    }
                                }}
                            >
                                <img alt='' src={Icon2} />
                                {lang === 'en' ? 'Awesome' : 'رائع'}
                            </button>
                        </Col>
                        <Col>
                            <button className={`${activeButton === 3 ? "active" : ""} ${lang === 'en' ? "english" : ""} custom-button`}
                                onClick={() => {
                                    if (activeButton === 3) {
                                        setActiveButton(0)
                                    } else {
                                        setActiveButton(3)
                                    }
                                }}
                            >
                                <img alt='' src={Icon3} />
                                {lang === 'en' ? 'Positive' : 'إيجابي'}
                            </button>
                        </Col>
                        <Col>
                            <button className={`${activeButton === 4 ? "active" : ""} ${lang === 'en' ? "english" : ""}  custom-button`}
                                onClick={() => {
                                    if (activeButton === 4) {
                                        setActiveButton(0)
                                    } else {
                                        setActiveButton(4)
                                    }
                                }}
                            >
                                <img alt='' src={Icon4} />
                                {lang === 'en' ? 'Creative' : 'مبدع'}
                            </button>
                        </Col>
                    </Row>
                    <Row className='textarea-wrapper mt-5'>
                        <Col>
                            <Form>
                                <Form.Group className="mb-3 sixth-step" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control style={{ direction: `${lang === 'en' ? 'ltr' : 'rtl'}` }} as="textarea" rows={8} placeholder={lang === 'en' ? 'Express Your Appreciation ..' : 'عبر اكثر عن شكرك ..'} />
                                </Form.Group>
                            </Form>
                            <button className='mt-3 seventh-step'>
                                {lang === 'en' ? 'Yestahel' :
                                    'يستاهل'
                                }
                            </button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Container>
    )
}

export default Body
