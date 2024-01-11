import 
  React, 
  { 
    useState, 
    useRef, 
    useEffect,
  } 
from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonButton,
  IonButtons,
  IonContent, 
  IonImg,
  IonHeader,
  IonModal,
  IonList,
  IonInput,
  IonItem, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonFooter,
  IonIcon,
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import './Start.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { Redirect } from 'react-router';

const Start: React.FC = () => {
  const page = useRef(null);
  const loginModal = useRef<HTMLIonModalElement>(null);
  const registrationModal = useRef<HTMLIonModalElement>(null);

  const [isLoginPassVisible, setIsLoginPassVisible] = useState<boolean>(false);
  const [isRegistrationPassVisible, setIsRegistrationPassVisible] = useState<boolean>(false);

  const history = useHistory();

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  //Login user data variables 
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  //Sign up user data variables
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserPassword, setNewUserPassword] = useState<string>('');
  const [newUserEmailErrorMessage, setNewUserEmailErrorMessage] = useState<string>('');
  const [newUserPasswordErrorMessage, setNewUserPasswordErrorMessage] = useState<string>('');


  const onboardingData = [
    {
      heading: "Get Ready to Share Your Desires!",
      desc: "Welcome to WishList, the place where your dreams become shared aspirations. This mobile app is crafted to make expressing your desired gifts and products a delightful experience. Let's embark on a journey of wishful thinking and thoughtful gifting!",
      img: "/assets/img/img-test.png",
    },
    {
      heading: "Easy as 1-2-3",
      desc: "Creating your wishlist is a breeze! Simply tap the "+" button, upload images and descriptions of your desired items, and organize your wishlist as you like. It's time to showcase what you've been dreaming of!",
      img: "/assets/img/img-test.png",
    },
    {
      heading: "Spread the Joy",
      desc: "Share your wishlist effortlessly with loved ones. They can view it anytime and choose the perfect gift for you. No more unwanted surprises—WishList ensures thoughtful and joyful gifting experiences. Start creating your wishlist today and turn your dreams into reality with WishList! 🌈✨",
      img: "/assets/img/img-test.png",
    },
  ];

  const onboardingSliders = onboardingData.map((data, index) => {
    return (
      <SwiperSlide key={`slide_${index}`}>
        <img src={data.img}/>
        <p className='onboarding-heading'>{data.heading}</p>
        <p className='onboarding-text'>{data.desc}</p>
      </SwiperSlide>
    )
  });

  //console.log(`User name: ${newUserName}`);
  //console.log(`User email: ${newUserEmail}`);
  console.log(`User pass: ${newUserPassword}`);

  async function newEmailValidation(errorMsg: string){
    if(errorMsg == 'Firebase: Error (auth/invalid-email).'){
      setNewUserEmailErrorMessage("Email is invalid. Please, try again!");
      console.log(newUserEmailErrorMessage);
    } else if(errorMsg == 'Firebase: Error (auth/email-already-exists).'){
      setNewUserEmailErrorMessage("Account with this email already exists. Try another one!");
      console.log(newUserEmailErrorMessage);
    }
  }


  async function registerNewUser(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword)
    .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        history.push('/');
    })
    .catch(error => {
        console.log(error);
        console.log(error.message);
        newEmailValidation(error.message);
    });
  }

  async function signInUser(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        history.push('/');
    })
    .catch(error => {
        console.log(error);
        console.log(error.message);
        newEmailValidation(error.message);
    });
  }

  function displayLoginPass(){
    setIsLoginPassVisible(!isLoginPassVisible);
  }

  function displayRegistrationPass(){
    setIsRegistrationPassVisible(!isRegistrationPassVisible);
  }
  
  useEffect(() => {
    setPresentingElement(page.current);
    
  }, []);

  function dismissLoginModal() {
    loginModal.current?.dismiss();
  }
  function dismissRegistrationModal() {
    registrationModal.current?.dismiss();
  }
  
  return (
    <IonPage ref={page}>
      <IonContent fullscreen className="ion-padding">
        <IonImg
          src="/assets/img/logo.svg"
          alt="MakeWish logo"
          className='logo'
        ></IonImg>
        <div className='slider-container'>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="swiper"
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {onboardingSliders}
          </Swiper>
        </div>
        {/* Login modal */}
        <IonModal ref={loginModal} trigger="open-login-modal" presentingElement={presentingElement!}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Login</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismissLoginModal()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonButton expand="block" fill="solid" color="medium">Login with Google</IonButton>
            <div className='login-divider'>
              <span className='line'></span>
              <span className='login-divider-text'>or</span>
              <span className='line'></span>
            </div>
            <form onSubmit={signInUser}>
              <IonList>
                <IonItem>
                  <IonInput 
                    label="E-mail" 
                    labelPlacement="floating"
                    type='email'
                    fill="solid" 
                    placeholder="Enter your e-mail"
                    class="input"
                    onIonChange={(e: any) => setUserEmail(e.target.value)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput 
                    label="Password" 
                    labelPlacement="floating" 
                    type={isLoginPassVisible ? 'text' : 'password'}
                    fill="solid" 
                    placeholder="Enter your password"
                    class="input"
                    onIonChange={(e: any) => setUserPassword(e.target.value)}
                  ></IonInput>
                  <div onClick={displayLoginPass} className='hide-pass-btn'>
                    {isLoginPassVisible ? <IonIcon aria-hidden="true" icon={eyeOff} size="large"/> : <IonIcon aria-hidden="true" icon={eye} size="large"/>}
                  </div>
                </IonItem>
              </IonList>
              <a href='#' className=''>Forget your password?</a>
              <IonButton type="submit" expand="block" className='btn-login'>Login</IonButton>
            </form>
            <a href='#' className=''>Don’t have an account yet? <span>Join us!</span></a>
          </IonContent>
        </IonModal>
        {/* Registration modal */}
        <IonModal ref={registrationModal} trigger="open-registration-modal" presentingElement={presentingElement!}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Create an account</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismissRegistrationModal()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonButton expand="block" fill="solid" color="medium">Create an account with Google</IonButton>
            <div className='login-divider'>
              <span className='line'></span>
              <span className='login-divider-text'>or</span>
              <span className='line'></span>
            </div>
            <form onSubmit={registerNewUser}>
              <IonList>
                <IonItem>
                  <IonInput 
                    label="E-mail"
                    type='text' 
                    labelPlacement="floating" 
                    fill="solid" 
                    placeholder="Enter your e-mail"
                    class="input"
                    errorText={newUserEmailErrorMessage}
                    value={newUserEmail}
                    onIonChange={(e: any) => setNewUserEmail(e.target.value)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput 
                    label="Password" 
                    labelPlacement="floating" 
                    type={isRegistrationPassVisible ? 'text' : 'password'}
                    fill="solid" 
                    placeholder="Enter your password"
                    class="input"
                    value={newUserPassword}
                    onIonChange={(e: any) => {
                      console.log(`Password in onIonChange: ${e.target.value}`);
                      setNewUserPassword(e.target.value);
                    }}
                  ></IonInput>
                  <div onClick={displayRegistrationPass} className='hide-pass-btn'>
                    {isRegistrationPassVisible ? <IonIcon aria-hidden="true" icon={eyeOff} size="large"/> : <IonIcon aria-hidden="true" icon={eye} size="large"/>}
                  </div>
                </IonItem>
              </IonList>
              <IonButton type="submit" expand="block" className='btn-login'>Create an account</IonButton>
            </form>
            <a href='#' className=''>Already have an account? <span>Login!</span></a>
          </IonContent>
        </IonModal>
      </IonContent>
        <div className='btn-footer-container ion-padding-horizontal'>
          <IonButton expand="block" id="open-login-modal">Login</IonButton>
          <IonButton expand="block" fill="clear" color="dark" id="open-registration-modal">Create an account</IonButton>
        </div>
    </IonPage>
  );
};

export default Start;
