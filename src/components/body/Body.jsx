import React from 'react'
import { Container, Row, Col, Form  , Spinner} from 'react-bootstrap'
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
import Swal from 'sweetalert2'
import '../../i18n';
import { UserContext } from '../../UserContext';

const Body = () => {
    const { userToken } = React.useContext(UserContext)
    const [isLoading, setIsLoading] = React.useState(false)
    const [options, setOptions] = React.useState([])
    const [activeButton, setActiveButton] = React.useState(0)
    const [chosenUser, setChosenUser] = React.useState()
    const [cookies, setCookie] = useCookies(['user']);
    const lang = localStorage.getItem('lang')
    const [msg, setMsg] = React.useState('')
    const userRef = React.useRef();
    const [isSubmitting, setIsSubmitting] = React.useState(false)


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

                    {lang === 'en-US' ?
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
    }
    const handleSubmit = async () => {
        setIsSubmitting(true)
        const data = {
            'senderEmail': cookies.user_info.userEmail,
            'preMsgText': msg,
            'receiverEmailEmail': chosenUser.email,
            'preMsgId': activeButton
        }
        const request1 = await axios.post('http://10.1.110.202/api/Tistahel/AddNotes', JSON.stringify(data), {
            headers: {
                "accept": "text/plain",
                'Content-Type': 'application/json',
                'Authorization': 'QXZlbG8gQ29yZSBBUEkgZm9yIEVzb2x1dGlvbg==',
            }
        }).then(res => {
            Swal.fire({
                title: `${lang === 'en-US' ? 'Testahel Sent !' : 'لقد تم إرسال تستاهل !'}`,
                icon: 'success',
                confirmButtonText: `${lang === 'en-US' ? 'Awesome' : 'رائع'}`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                     window.location.reload()
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }
    // const { t } = useTranslation();
    // const { i18n } = useTranslation();
    // console.log(i18n.language)

    return (
        <Container className={`${isMobileOnly ? "mobile" : ""} body`}>
            {userToken.balanceCount === 0 && chosenUser ?
                <FadeIn>
                    <Alert className='m-3' variant='danger'>
                        {lang ? 'الرجاء التأكد بأن رصيد تستاهل يكفي' : ""}
                    </Alert>
                </FadeIn> : ""}
            <Container className="top-wrapper">

                <Row className={`${lang === 'en-US' ? 'flex-row-reverse' : ''}`}>
                    <Col className={`${lang === 'en-US' ? 'text-end' : 'text-start'}`} xs={4} md={6} lg={6}>
                        <img className='top-icon' src={Man} alt='' />
                    </Col>
                    <Col className={`${lang === 'en-US' ? 'text-start' : 'text-end'} text-section`} xs={8} md={6} lg={6}>
                        <p>
                            {lang === "en-US" ? `Welcome ${cookies.user_info.userFullName}` : `حياك الله ${cookies.user_info.userFullName}`}
                        </p>
                        <span>
                            {lang === 'en-US' ? 'There is nothing better than hearing expressions of thanks and appreciation for the employees' : 'لا يوجد أفضل من سماع عبارات شكر وتقدير للموظفين'}
                        </span>
                    </Col>
                </Row>
            </Container>
            <Form>
                <Container fluid className='middle-wrapper'>
                    <Row className={`align-items-center mobile-reverese ${lang === 'en-US' ? 'flex-row-reverse' : ''} `}>
                        <Col xs={12} md={3} lg={3}>
                            <button onClick={e => e.preventDefault()} className={`gift-button third-step ${lang === 'en-US' ? 'ltr' : 'rtl'}`}>
                                {lang === 'en-US' ? <>Remaining <span className='ms-2'>{userToken.balanceCount}</span> </>
                                    : <>المتبقي<span className='me-2'>{userToken.balanceCount}</span></>
                                }

                            </button>
                        </Col>
                        <Col xs={12} md={9} lg={9} style={{
                            direction: `${lang === 'en-US' ? 'ltr' : 'rtl'}`
                        }}
                            className='fourth-step'
                        >
                            <Select
                                ref={userRef}
                                className={`${lang === 'en-US' ? 'ltr' : 'rtl'} basic-single searchField"`}
                                classNamePrefix="select"
                                placeholder={`${lang === 'en-US' ? "look for a colleague/friend who deserves thanks" : "ابحث عن زميل/صديق يستاهل الشكر"}`}
                                isClearable
                                isLoading={isLoading}
                                isRtl={true}
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
                                                const option = { value: item.userFullName, label: `${item.userFullName} - ${item.userPosition}`, img: item.userImage, name: item.userFullName, email: item.userEmail }
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
                            <Col style={{ direction: `${lang === 'en-US' ? 'ltr' : 'rtl'}` }}>
                                <h1>{lang === 'en-US' ? 'Thank you for ..' : 'شكرا لأنك ..'}</h1>
                            </Col>
                        </Row>
                        <Row className='buttons-row mt-5 flex-row-reverse fifth-step'>
                            <Col>
                                <button className={`${activeButton === 1 ? "active" : ""} ${lang === 'en-US' ? "english" : ""} custom-button`} onClick={(e) => {
                                    e.preventDefault()
                                    if (activeButton === 1) {
                                        setActiveButton(0)
                                    } else {
                                        setActiveButton(1)
                                    }
                                }}>
                                    <img alt='' src={Icon1} />
                                    {lang === 'en-US' ? 'Cooperative' : 'متعاون'}
                                </button>
                            </Col>
                            <Col>
                                <button className={`${activeButton === 2 ? "active" : ""} ${lang === 'en-US' ? "english" : ""} custom-button`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (activeButton === 2) {
                                            setActiveButton(0)
                                        } else {
                                            setActiveButton(2)
                                        }
                                    }}
                                >
                                    <img alt='' src={Icon2} />
                                    {lang === 'en-US' ? 'Awesome' : 'رائع'}
                                </button>
                            </Col>
                            <Col>
                                <button className={`${activeButton === 3 ? "active" : ""} ${lang === 'en-US' ? "english" : ""} custom-button`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (activeButton === 3) {
                                            setActiveButton(0)
                                        } else {
                                            setActiveButton(3)
                                        }
                                    }}
                                >
                                    <img alt='' src={Icon3} />
                                    {lang === 'en-US' ? 'Positive' : 'إيجابي'}
                                </button>
                            </Col>
                            <Col>
                                <button className={`${activeButton === 4 ? "active" : ""} ${lang === 'en-US' ? "english" : ""}  custom-button`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (activeButton === 4) {
                                            setActiveButton(0)
                                        } else {
                                            setActiveButton(4)
                                        }
                                    }}
                                >
                                    <img alt='' src={Icon4} />
                                    {lang === 'en-US' ? 'Creative' : 'مبدع'}
                                </button>
                            </Col>
                        </Row>
                        <Row className='textarea-wrapper mt-5'>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3 sixth-step" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control
                                            style={{ direction: `${lang === 'en-US' ? 'ltr' : 'rtl'}` }} as="textarea" rows={8}
                                            placeholder={lang === 'en-US' ? 'Express Your Appreciation ..' : 'عبر اكثر عن شكرك ..'}
                                            onChange={(e) => {
                                                setMsg(e.target.value)
                                            }}
                                        />
                                    </Form.Group>
                                </Form>
                                <button
                                disabled={isSubmitting}
                                 onClick={(e) => {
                                    e.preventDefault()
                                    if (chosenUser) {
                                        if (msg && activeButton) {
                                            Swal.fire({
                                                title: `${lang === 'en-US' ? 'ِAre you sure ?' : 'هل انت متأكد ؟'}`,
                                                text: `${lang === 'en-US' ? `do you want to send testahel to ${chosenUser.name}` : `هل تريد إرسال تستاهل إلى ${chosenUser.name}`}`,
                                                icon: 'warning',
                                                confirmButtonText: `${lang === 'en-US' ? 'Yes sure !' : 'نعم متأكد !'}`,
                                                cancelButtonText:`${lang === 'en-US' ? 'No' : 'لا'}`,
                                                showCloseButton: true,
                                                showCancelButton: true,
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {
                                                    handleSubmit()
                                                }
                                            })

                                        } else {
                                            Swal.fire({
                                                title: `${lang === 'en-US' ? 'Error' : 'خطأ'}`,
                                                text: `${lang === 'en-US' ? 'Please fill out the testahel form' : 'الرجاء إكمال جميع البيانات لإرسال تستاهل'}`,
                                                icon: 'error',
                                                confirmButtonText: `${lang === 'en-US' ? 'Okay' : 'حسنا'}`,
                                            })
                                        }
                                    } else {
                                        userRef.current.focus()
                                        Swal.fire({
                                            title: `${lang === 'en-US' ? 'Error' : 'خطأ'}`,
                                            text: `${lang === 'en-US' ? 'Please choose a colleague/friend to send Testahel' : 'الرجاء اختيار زميل/صديق لإرسال تستاهل'}`,
                                            icon: 'error',
                                            confirmButtonText: `${lang === 'en-US' ? 'Okay' : 'حسنا'}`,
                                        })
                                    }
                                }} className='mt-3 seventh-step'>
                                {isSubmitting ?      <Spinner className='me-2 ms-2' size="sm"  animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner> : "" }
                                    {lang === 'en-US' ? 'Yestahel' :
                                        'يستاهل'
                                    }
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Form>
        </Container>
    )
}

export default Body
