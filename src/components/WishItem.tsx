import { 
  IonCard,  
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle 
} from '@ionic/react';
import './WishItem.css';

interface ContainerProps {
  name: string;
  img: string;
  price: string;
}

const WishItem: React.FC<ContainerProps> = ({ name, img, price }) => {
  return (
    <IonCard button className='wish-item'>
      <img alt="Wish item image" src={img} />
      <IonCardHeader>
        <IonCardTitle>{price}</IonCardTitle>
        <IonCardSubtitle>{name}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default WishItem;
