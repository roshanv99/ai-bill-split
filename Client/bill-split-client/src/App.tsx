import React, { useEffect, useState } from 'react';
import AddUserForm from './features/add-user/addUserForm'
import './App.css';
import { StepStatus } from './types/types';
import UserList from './features/user-list/UserList';
import UserItemContextProvider from './context/UserItemContext';
import UserItemMapping from './features/user-item-mapping/UserItemMapping';
import Header from './components/Header/Header';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Bill from './features/show-bill/Bill';


function App() {


  //On load
  useEffect(()=>{
    (() => {
      
    })();
  },[])

  const [steps, setSteps] = useState<StepStatus>({
    'bill-upload' : 'done',
    'add-contributers':'active',
    'item-user-map' : 'not-started',
    'final-split' : 'not-started'
  });

  const changeSteps = (level:string) => {
    let flag:Boolean = false;
    let newSetps:StepStatus = {};
    ['bill-upload','add-contributers','item-user-map','final-split'].forEach(ele => {
      if(ele == level) {
        newSetps = {...newSetps, [level] :'active'}
        return;
      }
      if(!flag) {
        newSetps={...newSetps,[ele]:'done'}
        if(steps[ele] == 'active') {
          flag = true 
        }
      } else {
        newSetps={...newSetps,[ele]:'not-started'}
      }
    });
    setSteps(newSetps)
  }

  useEffect(() => {
    console.log("Steps: ",steps)
  },[steps])

  return (
    <div className="App">
      <UserItemContextProvider>
        <Header />
        <ProgressBar steps={steps} setSteps={changeSteps}/>
        {steps['add-contributers'] == 'active' && 
          <div className="slideDiv">
            <AddUserForm steps={steps} setSteps={changeSteps}/>
          </div>
        }
        {steps['item-user-map'] == 'active' && 
          <div className="slideDiv">
            <UserItemMapping steps={steps} setSteps={changeSteps}/>
          </div>
        }
        {steps['final-split'] == 'active' && 
          <div className="slideDiv">
            <Bill steps={steps} setSteps={changeSteps}/>
          </div>
        }
        
        {(steps['add-contributers'] == 'active' || steps['item-user-map'] == 'active') && 
          <div className="slideDiv">
            <UserList />
          </div>
        }
      </UserItemContextProvider>
    </div>
  );
}

export default App;
