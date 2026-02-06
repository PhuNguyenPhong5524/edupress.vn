

import React from 'react';
import { QRCode } from 'antd';
const BoxQR = ({checkoutCart}) => (
  <QRCode
    errorLevel="H"
    value={`https://edupress-vn.vercel.app/scan?token=${checkoutCart.token}`}
    icon="/images/logo.png"
  />
);
export default BoxQR;