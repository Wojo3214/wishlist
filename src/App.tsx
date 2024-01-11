import 
  React, 
  { 
    useState, 
    useEffect 
  } 
from 'react';
import { 
  Redirect, 
  Route 
} from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ellipse, square, triangle } from 'ionicons/icons';
import WishLists from './pages/WishLists';
import WishList from './pages/WishList';
import NewWishList from './pages/NewWishList';
import Profile from './pages/Profile';
import Start from './pages/Start';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

//Routes avaialable for not logged in users
function PublicRoutes(){
  return (
    <IonRouterOutlet>
      <Route path="/start">
        <Start />
      </Route>
    </IonRouterOutlet>
  );
}

//Routes avaialable for logged in users
function PrivateRoutes(){
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/wishlists">
          <WishLists />
        </Route>
        <Route exact path="/wishlist">
          <WishList />
        </Route>
        <Route exact path="/newWishList">
          <NewWishList />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Redirect to="/wishlists" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="wishlists" href="/wishlists">
          <IonIcon aria-hidden="true" icon={triangle} />
          <IonLabel>Wish Lists</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/newWishList">
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>New Wish List</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>My Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

const App: React.FC = () => {
  //const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('isAuthenticated')  || 'null') || false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log(user);
          // User is authenticated
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
      } else {
          // User is signed out
          setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");
      }
  });
  }, [auth]);

  // const useLocalStorage = (storageKey: string, fallbackState: any) => {
  //   const [value, setValue] = React.useState(
  //     JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  //   );
  
  //   useEffect(() => {
  //     localStorage.setItem(storageKey, JSON.stringify(value));
  //   }, [value, storageKey]);
  
  //   return [value, setValue];
  // };

  return(
    <IonApp>
      <IonReactRouter>
        {isAuthenticated ? <PrivateRoutes/> : <PublicRoutes/>}
        <Route>{isAuthenticated ? <Redirect to="/" /> : <Redirect to="/start" />}</Route>
      </IonReactRouter>
    </IonApp>
  )
  
};

export default App;
