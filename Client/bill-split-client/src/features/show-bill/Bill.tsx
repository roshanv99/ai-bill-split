import React, { useContext, useEffect, useState } from 'react'
import { StepStatus } from '../../types/types'
import calculateBill, { BillType } from './BillCalculation'
import { UserItemContext } from '../../context/UserItemContext'
import './Bill.css';


type BillParams = {
    steps:StepStatus,
    setSteps:(step:string) => void
  }

const Bill = (props:BillParams) => {
    const userItemContext = useContext(UserItemContext);
    const [finalBill, setFinalBill] = useState<Map<string,BillType>>();
    useEffect(() => {
        (() => {
            setFinalBill(calculateBill(userItemContext));
        })();
    },[userItemContext.itemList])

  return (
    <div className='bill-parent'>
        <table>
            <tbody>
                {finalBill && Array.from(finalBill.entries()).map((entry,index) => {
                    const [key, value] = entry;
                    {value.portion.map((ele,index2) => {
                        return (<></>)
                    });
                    }
                    return(<></>);
                    

                })}
        
            </tbody>
        </table>
    </div>
  )
}

export default Bill


// {finalBill && Array.from(finalBill.entries()).map((entry,index) => {
    
//     {value.portion.map((ele,index2) => (
//         <tr className='bill-tr'>
//             <td rowSpan={value.portion.length}>{key}</td>
            
//             <td>{value.amount}</td>
//         </tr>   
//     ))}
//     return(
        
//     );})