import React, {FC, useState, useContext} from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const LoginForm : FC = observer(()=>{
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)
    return(
        <div className='w-full h-screen flex flex-col justify-center items-center bg-[#e2e8f0]'>
        <div className="flex flex-col justify-center items-center h-[250px] w-[400px] p-2 rounded-md shadow-md bg-[#ffffff]">
            <h1 className="mb-3">Авторизация</h1>
            <input 
                onChange={(event : React.ChangeEvent<HTMLInputElement>)=>setEmail(event.target.value)}
                value={email}
                type='text' 
                placeholder='Email'
                className='border-b-2 border-cyan-500 w-80 mb-3 p-1 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 focus:outline-none focus:border-b-blue-300'/>
            <input 
                onChange={(event : React.ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value)}
                value={password}
                type='password' 
                placeholder='Пароль'
                className='border-b-2 border-cyan-500 w-80 mb-3 p-1 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 focus:outline-none focus:border-b-blue-300'/>
                <div className="flex flex-row mt-5 w-80 justify-end items-center">
                    <button className="rounded bg-cyan-500 hover:bg-cyan-600 p-[7px] text-white mr-2 font-semibold" onClick={()=>store.login(email, password)}>Войти</button>
                    <button className="rounded bg-cyan-500 hover:bg-cyan-600 p-[7px] text-white font-semibold" onClick={()=>store.registration(email, password)}>Регистрация</button>
                </div>
            
        </div>
        </div>
    )
})

export default LoginForm