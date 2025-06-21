'use client';
import React, { useEffect, useState } from 'react';
import RibbonMenu from './RibbonMenu';
import { getAxios } from '@/api/axiosInstance';
import { buildTree } from '@/api/tree';
import { storage } from '@/api/storage';

interface RibbonMenuGridProps {}

const RibbonMenuGrid: React.FC<RibbonMenuGridProps> = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getAxios(window.location.hostname).post('/tables/admin_menu/map', {
      fields: ["id", "name", "parent", "admin_controller", "ordering", "status", "shortcut"],
      condition: "status = 1",
      orderBy: "ordering asc"
    }, {
      headers: {
        'Authorization': `Bearer ${storage.get('token') || ''}`
      }
    }).then((resp: any) => {
      let items = resp.data;
      items = buildTree(items, 'parent');
      setData(items);
    }).catch((error: any) => {
      if (error.response?.status === 401 && error.response.data.error === 'Invalid token') {
        storage.clearTokenInfo();
        window.location.href = ('/login');
      }
    });
  }, []);

  return <RibbonMenu data={data} />;
};

export default RibbonMenuGrid;
