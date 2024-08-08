import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient'; 

const MenuItem = () => {
  const [menuItems, setMenuItems] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await apiClient.get('/sidebarMenu/menuItems');
        setMenuItems(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchMenuItems();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
    return <div>No menu items available.</div>;
  }
  
  const groupedMenuItems = menuItems.reduce((groups, item) => {
    const { menuGroupName, menuItemName, menuItemId } = item;
    if (!groups[menuGroupName]) {
      groups[menuGroupName] = [];
    }
    groups[menuGroupName].push({ menuItemName, menuItemId });
    return groups;
  }, {});

  return (
    <aside className="w-64 bg-[#132332] text-[#F5F5F5] p-4">
      <h2 className="text-xl font-bold mb-4">Assignment</h2>
      {Object.keys(groupedMenuItems).map((groupName) => (
        <div key={groupName}>
          <h3 className="font-semibold">{groupName || 'Unnamed Group'}</h3>
          <ul>
            {groupedMenuItems[groupName].map((item) => (
              <li key={item.menuItemId} className="pl-4">
                {item.menuItemName}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};
export default MenuItem;
