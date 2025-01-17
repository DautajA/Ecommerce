import React,{useState, useEffect}from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
          const res = await axios.get('http://localhost:8080/api/v1/auth/user-auth');
          
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        };
      if (auth?.token) {
        authCheck();
      } else {
        setOk(false); // Nëse nuk ka token, vendosim ok = false
      }
    }, [auth?.token]);
  
    return ok ? <Outlet/> : <Spinner />;
  }
