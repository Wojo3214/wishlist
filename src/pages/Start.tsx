import 
  React, 
  { 
    useState, 
    useRef, 
    useEffect 
  } 
from 'react';
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
  IonFooter 
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import './Start.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Start: React.FC = () => {
  const page = useRef(null);
  const loginModal = useRef<HTMLIonModalElement>(null);
  const registrationModal = useRef<HTMLIonModalElement>(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

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
            <form>
              <IonList>
                <IonItem>
                  <IonInput 
                    label="E-mail" 
                    labelPlacement="floating"
                    type='email'
                    fill="solid" 
                    placeholder="Enter your e-mail"
                    class="input"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput 
                    label="Password" 
                    labelPlacement="floating" 
                    type='password'
                    fill="solid" 
                    placeholder="Enter your password"
                    class="input"
                  ></IonInput>
                </IonItem>
              </IonList>
              <a href='#' className=''>Forget your password?</a>
              <IonButton expand="block" className='btn-login'>Login</IonButton>
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
            <form>
              <IonList>
                <IonItem>
                  <IonInput 
                    label="Name" 
                    labelPlacement="floating" 
                    fill="solid" 
                    placeholder="Enter your your name"
                    class="input"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput 
                    label="E-mail"
                    type='email' 
                    labelPlacement="floating" 
                    fill="solid" 
                    placeholder="Enter your e-mail"
                    class="input"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput 
                    label="Password" 
                    labelPlacement="floating" 
                    type='password'
                    fill="solid" 
                    placeholder="Enter your password"
                    class="input"
                  ></IonInput>
                </IonItem>
              </IonList>
              <IonButton expand="block" className='btn-login'>Create an account</IonButton>
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
