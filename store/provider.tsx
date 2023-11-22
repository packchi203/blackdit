import { useReducer } from 'react'
import  {AppContext,reducer,initState}  from '@/store'

interface Props{
     children:JSX.Element |JSX.Element[]
}
export const AppProvider = ({children}:Props) =>{
     const [state, dispatch] =  useReducer<any>(reducer,initState)
     return(
          <AppContext.Provider value={[state,dispatch]}>
               {children}
          </AppContext.Provider>
     )
}