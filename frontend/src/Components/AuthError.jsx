import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const AuthError = () => {
    const { t } = useTranslation();  
    const err = useSelector((state) => state.auth.error);
    
    if (err === "") return;
    //code:"ERR_NETWORK"
    //code: 'ERR_BAD_REQUEST'
    return (
      <>
      <br />
      <div style = {{color: 'red'}}>
        {err === "ERR_BAD_REQUEST" ? t('auth_error') : t('toastify_err')}</div>
      </>
    )
  };

  export default AuthError;