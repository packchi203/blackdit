import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { GetOtpForm, LoginForm } from '@/components/login/form_login'

type Props = {
  loginSuccess: any
}

export function FormIndex({ loginSuccess }: Props) {
  const [getOtpStatus, setOtpStatus] = useState(false)
  const [formHeight, setFormHeight] = useState(null)
  const [email, setEmail] = useState('')
  const formRef: any = useRef(null)
  useEffect(() => {
    setFormHeight(formRef.current?.firstChild.offsetHeight)
  }, [])
  function calcHeight(el: any) {
    const height = el.offsetHeight
    setFormHeight(height)
  }
  return (
    <>
      <div
        className='overflow-hidden w-full relative transition ease-in-out delay-500 duration-500'
        style={{ height: `${formHeight}` }}>
        <CSSTransition
          in={getOtpStatus == false}
          timeout={500}
          classNames='menu-primary'
          onEnter={calcHeight}
          unmountOnExit>
          <>
            <GetOtpForm
              otpStatus={(value: any) => setOtpStatus(value)}
              emailReceive={(value: any) => setEmail(value)}
            />
          </>
        </CSSTransition>
        <CSSTransition
          in={getOtpStatus == true}
          timeout={500}
          classNames='menu-secondary'
          onEnter={calcHeight}
          unmountOnExit>
          <>
            <LoginForm
              email={email}
              otpStatus={(value: any) => setOtpStatus(value)}
              loginStatus={(value: any) => loginSuccess(value)}
            />
          </>
        </CSSTransition>
      </div>
    </>
  )
}
