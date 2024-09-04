import React, { FormEvent, useContext, useState } from 'react'
import { Avatar, Color, StepStatus, UserFormType } from '../../types/types';
import './addUserForm.css';
import TextInput from '../../components/TextInput/TextInput';
import { UserItemContext } from '../../context/UserItemContext';
import AvatarContainer from '../../components/AvatarContainer/AvatarContainer';

type AddUserParams = {
    steps:StepStatus,
    setSteps:(level:string) => void
  }

const AddUserForm = (props:AddUserParams) => {
    const [formData, setFormData] = useState<UserFormType>({
        name: '',
        gender : null,
        avatar : null
    });
    const userItemContext = useContext(UserItemContext)

    const avatarList:Avatar[] = [
        {
            id: 1,
            gender: 'female',
            color: '#ffff00',
            background: ''
        },
        {
            id: 3,
            gender: 'male',
            color: '#ffff00',
            background: ''
        },
        {
            id: 2,
            gender: 'female',
            color: '#ffff00',
            background: ''
        }
    ];

    const skinTones:Color[] = ['#ffff00' ,'#8d5524' , '#c68642' , '#e0ac69' , '#e0ac69' , '#f1c27d' , '#ffdbac']
    const bgColors:string[] = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33',
        '#8C33FF', '#33FF8C', '#FF3333', '#33FFF7', '#5733FF',
        '#FF33F7', '#33FF33', '#FFAA33', '#33AAFF', '#AA33FF',
        '#FF33AA', '#33FFAA', '#AAFF33', '#33AA33', '#FF3377'
    ];

    function changeFormData(value:string) {
        setFormData({...formData, name:value});
    }

    const reset = () => {
        setFormData({
            name: '',
            gender : null,
            avatar : null
        });
    }

    function submitForm(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log("Add user: ", formData);
        userItemContext.addUser({
            name: formData.name,
            gender: formData.avatar ? formData.avatar.gender : null ,
            avatar: {
                id: formData.avatar ? formData.avatar.id : 0,
                gender: formData.avatar ? formData.avatar.gender : null,
                color: formData.avatar ? formData.avatar.color : '#ffff00',
                background: formData.avatar ? formData.avatar.background : '#dedcdc',
            }
        });
        reset();
    }

    function selectAvatar(avatar: Avatar): void {
        if(formData.avatar == null) {
            let newAvatar:Avatar = {
                gender : avatar.gender ,
                color : '#ffff00',
                background: '#dedcdc',
                id:+avatar.id
            }
            setFormData({...formData,avatar:newAvatar})
        } else {
            setFormData({...formData,avatar: null })
        } 
    }

    function changeAvatarColor(ele: Color): void {
        setFormData({...formData,avatar:{
            gender : formData.gender ? formData.gender : null,
            color : ele,
            background: formData.avatar ? formData.avatar.background : "red",
            id: formData.avatar ? formData.avatar.id : 0
        }});
    }

    function changeBackgroundColor(ele: string): void {
        setFormData({...formData,avatar:{
            gender : formData.gender ? formData.gender : null,
            color : formData.avatar ? formData.avatar.color : "#ffff00",
            background: ele,
            id: formData.avatar ? formData.avatar.id : 0
        }});
    }

    function finish(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        props.setSteps('item-user-map');
    } 

    return (
        <form className='addUserForm' onSubmit={submitForm}>
            <h2 className='form-heading'>Add New User</h2>
            <div className="form-level input-field">
                <input type="text" value={formData.name} onChange={(e) => changeFormData(e.target.value)} required spellCheck="false" />
                <label htmlFor='name' >Enter Name</label> 
                {/* <TextInput text={formData.name} type={'text'} onChange={changeFormData}/> */}
            </div>
            <br />
            <hr />
            <div className={"createAvatar " + (formData.avatar != null ? 'editAvatar':'removeEditAvatar')}>
                {/* <label >Create Avatar</label> */}
                <div className='avatar-list'>
                    {avatarList.map((avatar,index) => (
                        <div onClick={() => selectAvatar(avatar)} 
                            className={(+avatar.id == formData.avatar?.id ? 'image-parent activeAvatar':'image-parent') + (formData.avatar != null && +avatar.id !== formData.avatar?.id ? ' inactiveAvatar':'') }
                            key={index}>
                            <AvatarContainer user={{
                                name: '',
                                gender: avatar.gender,
                                avatar: {
                                    gender : avatar.gender ,
                                    color : (formData.avatar && formData.avatar.id == avatar.id) ? formData.avatar?.color : '#ffff00',
                                    background:  (formData.avatar && formData.avatar.id == avatar.id) ? formData.avatar.background : '#dedcdc',
                                    id: +avatar.id              
                                }
                            }} />
                        </div>
                    ))}
                </div>
                {formData.avatar != null && <div className='avatar-customization'>
                    <div className="selectSkinTone">
                        <label>Select Skin Tone</label>
                        <div style={{marginBlock:'1%'}}>
                            {skinTones.map((ele) => (
                                <div className="colorToneCirle" style={{backgroundColor:ele}} onClick={() => {changeAvatarColor(ele)}}></div>
                            ))}
                        </div>
                    </div>
                    <div className="selectSkinTone">
                        <label>Select Background</label>
                        <div style={{marginBlock:'1%'}}>
                            {bgColors.map((ele) => (
                                <div className="colorToneCirle" style={{backgroundColor:ele}} onClick={() => {changeBackgroundColor(ele)}}></div>
                            ))}
                        </div>
                    </div>
                </div>}
            </div>
            <br/>
            <hr />
            <div className="" style={{display:'flex', justifyContent:'center'}}>
                <button type="reset" onClick={finish} className='btn clr-white white-stripes'>Finish</button>
                <button type='submit' className='btn clr-white white-stripes'>Add New Avatar</button>
            </div>
            
        </form>
    )
}

export default AddUserForm;