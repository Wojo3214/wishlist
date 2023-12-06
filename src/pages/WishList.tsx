import 
  React, 
  { 
    useState, 
    useRef, 
    useEffect 
  } 
from 'react';
import { 
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol, 
  IonContent,
  IonInput,
  IonItem,
  IonModal,
  IonLabel,
  IonList,
  IonPopover,
  IonIcon, 
  IonGrid, 
  IonHeader, 
  IonPage,
  IonSelect,
  IonSelectOption, 
  IonRow, 
  IonTitle, 
  IonTextarea,
  IonToolbar 
} from '@ionic/react';
import { 
  pencilOutline, 
  shareOutline, 
  settingsOutline, 
  trashOutline 
} from 'ionicons/icons';
import './WishList.css';
import WishItem from '../components/WishItem';

const WishList: React.FC = () => {
  const page = useRef(null);
  const createNewItemModal = useRef<HTMLIonModalElement>(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  const data = [
    {
      name: "Rolki",
      price: "300 DKK",
      img: "https://images.pexels.com/photos/2005992/pexels-photo-2005992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Rolki",
      price: "300 DKK",
      img: "https://images.pexels.com/photos/2005992/pexels-photo-2005992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Rolki",
      price: "300 DKK",
      img: "https://images.pexels.com/photos/2005992/pexels-photo-2005992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    }
  ];
  const listData = data.map((item, index) => (
    <IonCol key={index} size='12' sizeSm='6' sizeMd='4' sizeLg='3'>
      <WishItem 
        name={item.name} 
        price={item.price} 
        img={item.img}/>
    </IonCol>
  ));
  const newWishItemButton = (
    <IonButton size='default' id="open-new-item-modal">
      Add item
    </IonButton>
  );

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismissCreateNewItemModal() {
    createNewItemModal.current?.dismiss();
  }

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Wish List name</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" ios={shareOutline}></IonIcon>
            </IonButton>
            <IonButton id="settings-trigger">
              <IonIcon slot="icon-only" ios={settingsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonPopover trigger="settings-trigger" triggerAction="click">
          <IonContent>
            <IonList>
              <IonItem button lines="full" detail={false}>
                <IonIcon aria-hidden="true" icon={pencilOutline} slot="start"></IonIcon>
                <IonLabel>Edit list</IonLabel>
              </IonItem>
              <IonItem button lines="none" detail={false}>
                <IonIcon aria-hidden="true" icon={trashOutline} slot="start" color='danger'></IonIcon>
                <IonLabel color='danger'>Remove list</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Wish List name</IonTitle>
          </IonToolbar>
        </IonHeader>
        {newWishItemButton}
        <IonGrid>
          <IonRow className='ion-justify-content-center'>
            {listData}
          </IonRow>
        </IonGrid>
        {/* Create new item modal */}
        <IonModal ref={createNewItemModal} trigger="open-new-item-modal" presentingElement={presentingElement!}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Login</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismissCreateNewItemModal()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form>
              <IonList>
                <IonItem>
                  <IonInput 
                    label="Name" 
                    labelPlacement="floating"
                    type='text'
                    fill="solid" 
                    placeholder="Enter item's name"
                    class="input"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput 
                    label="Price" 
                    labelPlacement="floating"
                    type='number'
                    fill="solid" 
                    placeholder="Enter item's price"
                    class="input"
                  ></IonInput>
                </IonItem>
                <IonItem>
                <IonSelect label="Currency" interface="action-sheet" labelPlacement="floating">
                  <IonSelectOption value="DKK">Danish Korone</IonSelectOption>
                  <IonSelectOption value="PLN">Polish Zloty</IonSelectOption>
                  <IonSelectOption value="EUR">Euro</IonSelectOption>
                  <IonSelectOption value="USD">US Dollar</IonSelectOption>
                </IonSelect>
                </IonItem>
                <IonItem>
                  <IonTextarea
                    label="Extra notes" 
                    labelPlacement="floating" 
                    fill="solid" 
                    placeholder="Enter extra notes"
                    class="input"></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonInput 
                    label="Link to the product" 
                    labelPlacement="floating" 
                    type='url'
                    fill="solid" 
                    placeholder="Enter url"
                    class="input"
                  ></IonInput>
                </IonItem>
              </IonList>
              <IonButton expand="block" className='btn-login'>Add new item</IonButton>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default WishList;

