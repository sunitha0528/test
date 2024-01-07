// import React from 'react'
import { useParams } from 'react-router-dom';
import Recharge from './Recharge';
import Dth from './Dth';
import BillPayments from './BillPayments';


// type ComponentType = 'recharge'  //| 'B' | 'C';



const Bbps = () => {
  let componentToRender;
  const params:any  = useParams();
  console.log(params);

  switch (params.id) {
    case 'recharge':
      componentToRender = <Recharge />;
      break;
    case 'DTH':
      componentToRender = <Dth />;
      break;
      case 'BillPayments':
        componentToRender = <BillPayments />;
        break;
    default:
      componentToRender = <div>Default Component</div>;
  }
  return componentToRender;
  
}

export default Bbps