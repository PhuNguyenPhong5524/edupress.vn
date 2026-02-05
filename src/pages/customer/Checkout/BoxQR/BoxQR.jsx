

import React from 'react';
import { QRCode } from 'antd';
const BoxQR = () => (
  <QRCode
    errorLevel="H"
    value="https://edupress-vn.vercel.app/"
    icon="/images/logo.png"
  />
);
export default BoxQR;