import Body from './components/body/Body';
import Navbar from './components/Navbar/Navbar';
import { TourProvider, useTour } from '@reactour/tour'
import { Modal, Container, Row, Col, Spinner } from 'react-bootstrap'
import React from 'react'
import OnboardIcon from './assets/onboard.svg'
import check from './assets/check.svg'
import Footer from './components/Footer/Footer';
import { UserContext } from './UserContext'
import FadeIn from 'react-fade-in'
import axios from 'axios'
import { useCookies } from 'react-cookie';

function MyVerticallyCenteredModal(props) {
  const { setIsOpen } = useTour()
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className='p-5 rounded-5'>
        <div className='text-end'>
          <button onClick={() => {
            props.onHide()
          }} style={{ background: 'transparent', border: 'none' }}>
            <img src={check} className='check' />
          </button>
        </div>
        <Container>
          <Row>
            <Col className='d-flex flex-column justify-content-space-around align-items-center'>
              <img src={OnboardIcon} />
              <h1 className='mt-5'>هلا فيك في تستاهل</h1>
              <p>خلينا ناخدك في جولة تعريفية</p>
              <button
                className='mt-3 modal-button'
                onClick={() => {
                  props.onHide()
                  setIsOpen(true)
                }}>الجولة التعريفية</button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
function Home() {
  const [modalShow, setModalShow] = React.useState(false);
  const [Loading, setLoading] = React.useState(true)
  const [cookies, setCookie] = useCookies(['user']);
  const steps = [
    {
      selector: '.first-step',
      content: 'هذا الملف التعريفي الخاص فيك',
    },
    {
      selector: '.second-step',
      content: 'من هنا بتشوف كم تستاهل جاك',
    },
    {
      selector: '.third-step',
      content: 'تقدر تعطي خمسة تستاهل ف الشهر,من هنا تعرف كم باقي لك',
    },
    {
      selector: '.fourth-step',
      content: 'ابحث عن موظف/ة يستاهل شكرك وتقديرك',
    },
    {
      selector: '.fifth-step',
      content: 'أختر احد عبارات الشكر الموجودة',
    },
    {
      selector: '.sixth-step',
      content: 'اكتب وعبر عن شكرك وتقديرك',
    },
    {
      selector: '.seventh-step',
      content: 'عطه تستاهل وأرسل شهادة شكر',
    },
    // ...
  ]
  const styles = {
    badge: base => ({ ...base, display: 'none' }),
  }

  const [userToken, setUserToken] = React.useState()
  const providerValue = React.useMemo(() => ({ userToken, setUserToken }), [userToken, setUserToken])
  
  React.useEffect(() => {
    const getCount = async () => {
      await axios.get(`http://10.1.110.202/api/Tistahel/GetCount?userName=${cookies.user_id}`, {
        headers: {
            'Authorization': 'QXZlbG8gQ29yZSBBUEkgZm9yIEVzb2x1dGlvbg=='
        }
    }).then(response => {
      setUserToken(response.data[0])
      setLoading(false)
      console.log(response.data)
    })
    }
    getCount()
  }, [])

  if (Loading) {
    return <div class="center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>

  }

  return (
    
    <FadeIn>
      <UserContext.Provider value={providerValue}>
        <TourProvider steps={steps}
          disableDotsNavigation
          styles={styles}
          nextButton={({
            Button,
            currentStep,
            stepsLength,
            setIsOpen,
            setCurrentStep,
          }) => {
            const last = currentStep === stepsLength - 1
            return (
              <button
                className='next-button'
                hideArrow={true}
                onClick={() => {
                  if (last) {
                    setIsOpen(false)
                  } else {
                    setCurrentStep(s => (s === steps.length - 1 ? 0 : s + 1))
                  }
                }}
              >
                {last ? 'إنهاء' : 'التالي'}
              </button>
            )
          }}
          prevButton={({ currentStep, stepsLength, setIsOpen, setCurrentStep }) => {
            const first = currentStep === 0
            const next = first ? steps.length - 1 : currentStep - 1
            return (
              <button
                className="last-button"
                onClick={() => {
                  if (first) {
                    setCurrentStep(s => steps.length - 1)
                  } else {
                    setCurrentStep(s => s - 1)
                  }
                }}
              >
                السابق
              </button>
            )
          }}
        >
          <div className='App'>
            <Navbar />
            <Body />
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <Footer />
          </div>
        </TourProvider>
      </UserContext.Provider>
    </FadeIn>
  );
}
export default Home;
