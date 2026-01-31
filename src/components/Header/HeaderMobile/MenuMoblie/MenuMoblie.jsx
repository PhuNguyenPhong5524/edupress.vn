

import React, { useState } from 'react';
import { Avatar, Button, Divider, Drawer, Radio, Space } from 'antd';
import BarsIcon from '../../../icons/BarsIcon';
import CloseIcon from '../../../icons/CloseIcon';
import ChevronRightIcon from '../../../icons/ChevronRightIcon';
import MenuItem from './MenuItem';
import MenuUserMobile from './MenuUserMoblie';
import { Link } from 'react-router-dom';


const MenuMoblie = ({
  t,
  user,
  logout,
  isAuthenticated,
  getAvatarLetter,
  categories,
  loading
}) => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>

        <button 
            onClick={showDrawer}
            className="
             hover:text-[#FF782D] cursor-pointer
            "
        >
            {
                open ? 
                <BarsIcon size={24} className="text-[#FF782D]" />
                :
                <BarsIcon size={24} className="text-[#000000]" />
            }
        </button>
      </Space>
      <Drawer
        placement={'left'}
        closable={false}
        onClose={onCloseMenu}
        open={open}
        key="left"
        className='menu-moblie'
        size={300}
      >
        <div >
          <button 
            className="
              absolute top-2 right-0 will-change-transform translate-x-[40px] cursor-pointer transform transition-all duration-300 ease-in-out hover:text-[#ffffff] 
              bg-[#ffffff] hover:bg-[#FF782D] hover:scale-90 rounded-full p-[5px]
            " 
            onClick={onCloseMenu}
          >
            <CloseIcon size={22} />
          </button>
          {
            isAuthenticated ?
              <MenuUserMobile 
                t={t}
                user={user}
                logout={logout}
                isAuthenticated={isAuthenticated}
                getAvatarLetter={getAvatarLetter}
                onCloseMenu={onCloseMenu}
              />
            :(
              <div className="flex flex-col gap-1 py-[10px] px-[15px]">
                <Link 
                  to="/login"
                  className="
                     w-full transform group
                    transition-all duration-300 ease-in-out hover:bg-[#e0e0e0d8] cursor-pointer px-[10px] py-[5px] 
                  "
                >
                  Đăng nhập
                </Link>
                <Link 
                  to="/register"
                  className="
                     w-full transform group
                    transition-all duration-300 ease-in-out hover:bg-[#e0e0e0d8] cursor-pointer px-[10px] py-[5px] 
                  "
                >
                  Đăng ký
                </Link>
              </div>
            )
          }
          <div className="border-b-[1px] border-[#eaeaea]"></div>
          <MenuItem onClose={onCloseMenu} categories={categories} loading={loading}/>
        </div>
      </Drawer>
    </>
  );
};
export default MenuMoblie;