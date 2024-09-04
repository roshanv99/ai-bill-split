import React, { useEffect, useRef, useState } from 'react'
import { ItemTypes, User } from '../../types/types'
import './AvatarContainer.css'
import { getImageFemale1 } from './female1';
import { getImageFemale2 } from './female2';
import { getImageMale1 } from './male1';
import { useDrag } from 'react-dnd';

export type AvatarContainerParams = {
  user:User,
  showNameFlag?:boolean
}

const AvatarContainer = ({user,showNameFlag=true}:AvatarContainerParams) => {
  const [avatar, setAvatar] = useState('');
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: ItemTypes.AVATAR,
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging()
  //   })
  // }))
  
  useEffect(()=>{
    (() => {
      // let doc = document.querySelector<HTMLElement>('.skinTone');
      // if(doc){
      //   doc.style.fill = user.avatar ?  user.avatar?.color : '#fff000';
      // }
      if(user.avatar?.id == 1) {
        setAvatar(getImageFemale1(user.avatar.color,user.avatar.background))
      } else if(user.avatar?.id == 2) {
        setAvatar(getImageFemale2(user.avatar.color,user.avatar.background))
      } else if(user.avatar?.id == 3) {
        console.log("AVATR: ", user.avatar)
        setAvatar(getImageMale1(user.avatar.color,user.avatar.background))
      }  
    })();
  },[user.avatar])

  return (
    <>
     <div className='avatar-container'>
        <div className="image-container">
        {/* <object data={user.avatar?.url} className='svg-object skinTone'> </object> */}
          <div className='dangerousHTML' dangerouslySetInnerHTML={{__html: avatar}}></div>
        </div>
        {showNameFlag && <span className='avatar-name'>{user.name}</span>}

    </div>
    </>
   
  )
}

export default AvatarContainer