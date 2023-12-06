import { 
  IonCard,  
  IonCardHeader, 
  IonCardContent, 
  IonCardTitle 
} from '@ionic/react';
import './ListItem.css';

interface ContainerProps {
  name: string;
  itemsAmount: number;
}

const ListItem: React.FC<ContainerProps> = ({ name, itemsAmount }) => {
  return (
    <IonCard button className='list-item'>
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>Item: {itemsAmount}</IonCardContent>
    </IonCard>
  );
};

export default ListItem;
