import React, {FC, useEffect, useContext, useState} from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App : FC = observer(() =>  {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(()=>{
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  },[])

  async function getUsers(){
    try{
        const response = await UserService.fetchUsers()
        setUsers(response.data)
    }
    catch(e){
      console.log(e)
    }
  }

  function exitUser(){
    setUsers([])
    store.logout()
  }

  if(store.isLoading){
    return(
      <div>
        Загрузка...
      </div>
    )
  }

  if(!store.isAuth && !store.isLoading){
    return(
      <LoginForm/>
    )
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="mb-5">{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь!'}</h1>
      <h1 className="mb-5">{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Подтвердите акаунт!!!'}</h1>
      <button className="rounded bg-cyan-500 hover:bg-cyan-600 p-2 text-white mr-2 font-semibold mb-5" onClick={exitUser}>Выйти</button>
      <div>
        <button className="rounded bg-cyan-500 hover:bg-cyan-600 p-2 text-white mr-2 font-semibold mb-5" onClick={getUsers}>Получить пользователей</button>
      </div>
      {
        users.map((user)=>{
          return(
            <div key={user.email}>{user.email}</div>
          )
        })
      }
    </div>
  )
})

export default App;
