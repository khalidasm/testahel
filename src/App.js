import axios from 'axios';
import React from 'react';
import './App.css';
import RoutesRender from './Routes';
import { useCookies } from 'react-cookie';
import { Alert } from 'react-bootstrap'
import FadeIn from 'react-fade-in'


function App() {
  const [cookies, setCookie] = useCookies(['user']);
  const [userNotFound, setuserNotFound] = React.useState(false)
  const lang = localStorage.getItem('lang')
  React.useEffect(() => {
    const getUser = async () => {
      await axios.get('http://10.1.110.203:3001/get_user').then(res => {
        if (res) {
          axios.get(`http://10.1.110.202/api/Tistahel/GetCurrentUser?userName=${res.data}`, {
            headers: {
              'Authorization': 'QXZlbG8gQ29yZSBBUEkgZm9yIEVzb2x1dGlvbg=='
            }
          }).then(resp => {
            if (resp.data.length === 0) {
              setuserNotFound(true)
            } else {
              setCookie('user_info', resp.data[0], { path: '/' });
              setCookie('user_id', res.data, { path: '/' });
              setTimeout(() => {
                window.location.reload()
              }, 2000);
            }
          }).catch(err => 
            setuserNotFound(true))
        }
      }).catch(err => {
        console.log(err)
      })
    }
    if (!cookies.user_info) {
      getUser()
    }
    if (lang != "en-US" && lang != "ar") {
      localStorage.setItem("lang", "ar");
    }
  })
  return (
    <div class="App">
      {userNotFound ? 
        <FadeIn>
          <Alert className='m-3' variant='danger' dismissible  onClose={() => setuserNotFound(false)}>
          لم يتم التعرف على المستخدم - الرجاء التأكد من إستخدام النطاق الخاص بمجلس الضمان الصحي
                </Alert>
        </FadeIn>: ""}
      <RoutesRender />
    </div>
  );
}
export default App;
