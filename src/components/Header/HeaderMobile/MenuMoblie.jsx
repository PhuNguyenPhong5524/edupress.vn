

import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import BarsIcon from '../../icons/BarsIcon';
const MenuMoblie = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
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
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}

      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default MenuMoblie;