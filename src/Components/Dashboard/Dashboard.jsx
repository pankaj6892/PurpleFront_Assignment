import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    try {
      const userAuth = localStorage.getItem('myweb_token');
      if (!userAuth) {
        window.location.href = '/';
      }
    } catch (err) {}
  }, []);

  const logout = () => {
    localStorage.removeItem('myweb_token');
    window.location.href = '/';
  };
  return (
    <div>
      <h1>Dashboard : Successfully Signed In</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
