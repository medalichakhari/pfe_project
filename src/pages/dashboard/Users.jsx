import React from 'react';
import SideBar from '../../components/sidebar/SideBar';

function Users() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div className="w-3/4 mt-5">
        User
      </div>
    </div>
  );
}

export default Users;
