import React, { DetailedHTMLProps, HTMLAttributes, LegacyRef, useContext, useRef } from "react";
import { UserItemContext } from "../../context/UserItemContext";
import AvatarContainer from "../../components/AvatarContainer/AvatarContainer";
import './UserList.css';
import { User } from "../../types/types";

const UserList = () => {
  const userItemContext = useContext(UserItemContext);
  const dragImageRef = useRef<HTMLDivElement>();

  const avatarDragStart = (event: React.DragEvent<HTMLDivElement>, user:User,index:number) => {
    event.dataTransfer.setData("application/json", JSON.stringify(user));
    if (inputRefs[index]) {
      event.dataTransfer.setDragImage(inputRefs[index], 10, 10);
      event.dataTransfer.dropEffect = "link";

    }
    // event.dataTransfer.setDragImage(user.avatar. , 10, 10);
  }

  let inputRefs:any[] = [];
  const setRef = (reff:LegacyRef<HTMLDivElement> | undefined |  HTMLDivElement | null) => {
    inputRefs.push(reff)
  }

  return (
    <>
      {userItemContext.userList.length > 0 && (
        <div className="user-list">
          <ul className="scrollable-user-deck">
            {userItemContext.userList.map((ele, index) => (
              <div key={index} className="avatar-parent">
                <div draggable="true" onDragStart={(e) => avatarDragStart(e,ele,index)} className="enterAvatar" style={{width:'5em', marginInline:'1%'}}>
                    <AvatarContainer user={ele} />
                </div>
                <div style={{position:'relative'}}>
                  <div 
                  ref={setRef} 
                  style={{
                    position: 'absolute',
                    top: '-1000em', // Move it offscreen
                    right:'0',
                    width:'5em', 
                    marginInline:'1%',
                    backgroundColor:'transparent',
                    borderRadius:'100%'
                  }}
                  className="enterAvatar">
                      <AvatarContainer key={index} user={ele} />
                    </div>
                </div>
                
              
              </div>
                
                

            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserList;
