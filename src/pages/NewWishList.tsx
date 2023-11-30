import { 
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import './NewWishList.css';

const NewWishList: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New wish list</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">New wish list</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form>
          <IonList>
            <IonItem lines='none'>
              <IonInput 
                label="Wish list name" 
                labelPlacement="floating"
                type='text'
                fill="solid"
                placeholder="Enter a wish list name"
                class="input"
              ></IonInput>
            </IonItem>
          </IonList>
          <IonButton expand="block" className='btn-form'>Create a wish list</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewWishList;
