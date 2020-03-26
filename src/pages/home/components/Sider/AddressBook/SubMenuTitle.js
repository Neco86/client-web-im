import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

const SubMenuTitle = ({ name, number }) => {
  const [editVisible, setEditVisible] = useState(false);
  return (
    <div
      className="subMenuTitle"
      onMouseEnter={() => {
        setEditVisible(true);
      }}
      onMouseLeave={() => {
        setEditVisible(false);
      }}
    >
      {name}
      <div className="edit">
        {editVisible ? (
          <EllipsisOutlined
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
          />
        ) : (
          <div className="number">{number}</div>
        )}
      </div>
    </div>
  );
};
export default SubMenuTitle;
