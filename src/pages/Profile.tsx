import { 
  IonButton,
  IonButtons,
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import { getAuth, signOut } from "firebase/auth";
import './Profile.css';

const Profile: React.FC = () => {
  const auth = getAuth();
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('Successfully signed out');
      // You can perform additional actions after sign-out if needed
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        
          <IonButton onClick={handleSignOut}>Sign Out</IonButton>
        
        
        
      </IonContent>
    </IonPage>
  );
};

export default Profile;
