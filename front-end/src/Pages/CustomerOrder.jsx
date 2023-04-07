import React, { useContext } from 'react';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import CardOrders from '../Componentes/CardOrders';
import { requestData } from '../services/requests';

function CustomerOrder() {
  const { username, updatedOrders, setUpdatedOrders } = useContext(Context);

  const newRequest = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const sellerOrders = await requestData(`orders/${user.id}`);
    setUpdatedOrders(sellerOrders);
    return sellerOrders;
  };
  newRequest();

  return (
    <div>
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />
      <main>
        {
          updatedOrders.map(({ id, status, saleDate, totalPrice }) => (
            <CardOrders
              key={ id }
              id={ id }
              status={ status }
              date={ saleDate }
              price={ totalPrice }
            />
          ))
        }
      </main>
    </div>
  );
}

export default CustomerOrder;
