import React, { useContext } from 'react'
import './UserItemMapping.css';
import { UserItemContext } from '../../context/UserItemContext';
import ItemCard from '../../components/ItemCard/ItemCard';
import { StepStatus } from '../../types/types';

type ItemUserParams = {
  steps:StepStatus,
  setSteps:(step:string) => void
}

const UserItemMapping = (props:ItemUserParams) => {
    const userItemContext = useContext(UserItemContext)
    

  function generateBill(event: React.MouseEvent<HTMLElement>): void {
    event.preventDefault();
    props.setSteps('final-split')
  }

  return (
    <>
      <div className='user-item-mapping'>
          {userItemContext.itemList.map((item,index) => (
              <ItemCard key={index} item={item}/>
          ))}
          


      </div>
      <div className="" style={{display:'flex', justifyContent:'center'}}>
      < button type='submit' className='btn clr-white white-stripes' onClick={generateBill}>Generate Split</button>
      </div>
    </>
    
  )
}

export default UserItemMapping