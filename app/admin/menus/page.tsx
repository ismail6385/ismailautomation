"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Save, MoveUp, MoveDown } from 'lucide-react';

interface MenuItem {
    id: string;
    label: string;
    url: string;
    type: 'custom' | 'page' | 'category';
}

interface MenuSection {
    id: string;
    name: string;
    items: MenuItem[];
}

export default function MenusPage() {
    const [menus, setMenus] = useState<MenuSection[]>([
        { id: 'navbar', name: 'Main Navbar', items: [] },
        { id: 'footer_1', name: 'Footer Column 1', items: [] },
        { id: 'footer_2', name: 'Footer Column 2', items: [] },
    ]);

    const [activeMenu, setActiveMenu] = useState('navbar');
    const [newItem, setNewItem] = useState({ label: '', url: '' });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedMenus = localStorage.getItem('siteMenus');
        if (savedMenus) {
            setMenus(JSON.parse(savedMenus));
        } else {
            // Default initial state
            const defaults = [
                {
                    id: 'navbar',
                    name: 'Main Navbar',
                    items: [
                        { id: '1', label: 'Home', url: '/', type: 'page' },
                        { id: '2', label: 'Tools', url: '/tools', type: 'page' },
                        { id: '3', label: 'Blog', url: '/blog', type: 'page' },
                        { id: '4', label: 'Contact', url: '/contact', type: 'page' },
                    ]
                },
                {
                    id: 'footer_1',
                    name: 'Footer Column 1',
                    items: [
                        { id: 'f1', label: 'About Us', url: '/about', type: 'page' },
                        { id: 'f2', label: 'Contact', url: '/contact', type: 'page' },
                    ]
                },
                {
                    id: 'footer_2',
                    name: 'Footer Column 2',
                    items: [
                        { id: 'f3', label: 'Privacy Policy', url: '/privacy', type: 'page' },
                        { id: 'f4', label: 'Terms', url: '/terms', type: 'page' },
                    ]
                },
            ];
            setMenus(defaults as any);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('siteMenus', JSON.stringify(menus));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const addItem = () => {
        if (!newItem.label || !newItem.url) return;

        const updatedMenus = menus.map(menu => {
            if (menu.id === activeMenu) {
                return {
                    ...menu,
                    items: [...menu.items, { ...newItem, id: Date.now().toString(), type: 'custom' }]
                };
            }
            return menu;
        });

        setMenus(updatedMenus as any);
        setNewItem({ label: '', url: '' });
    };

    const deleteItem = (itemId: string) => {
        const updatedMenus = menus.map(menu => {
            if (menu.id === activeMenu) {
                return {
                    ...menu,
                    items: menu.items.filter(item => item.id !== itemId)
                };
            }
            return menu;
        });
        setMenus(updatedMenus);
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const updatedMenus = menus.map(menu => {
            if (menu.id === activeMenu) {
                const newItems = [...menu.items];
                if (direction === 'up' && index > 0) {
                    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
                } else if (direction === 'down' && index < newItems.length - 1) {
                    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                }
                return { ...menu, items: newItems };
            }
            return menu;
        });
        setMenus(updatedMenus);
    };

    const currentItems = menus.find(m => m.id === activeMenu)?.items || [];

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Menu Manager</h1>
                    <p className="text-gray-400">Manage your website navigation menus</p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Sidebar - Menu Selection */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="glass-effect rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Select Menu</h3>
                        <div className="space-y-2">
                            {menus.map(menu => (
                                <button
                                    key={menu.id}
                                    onClick={() => setActiveMenu(menu.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeMenu === menu.id
                                            ? 'bg-cyan-500 text-white font-semibold'
                                            : 'hover:bg-white/10 text-gray-400'
                                        }`}
                                >
                                    {menu.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Add Custom Link</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Label</label>
                                <input
                                    type="text"
                                    value={newItem.label}
                                    onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="e.g. My Link"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">URL</label>
                                <input
                                    type="text"
                                    value={newItem.url}
                                    onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                                    placeholder="e.g. /my-page"
                                />
                            </div>
                            <button
                                onClick={addItem}
                                className="w-full py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors font-semibold flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add to Menu
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main - Menu Items */}
                <div className="lg:col-span-2">
                    <div className="glass-effect rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Editing: <span className="text-cyan-400">{menus.find(m => m.id === activeMenu)?.name}</span>
                        </h2>

                        {currentItems.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/10 rounded-xl">
                                No items in this menu yet. Add some from the left!
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {currentItems.map((item, index) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-cyan-500/30 transition-all">
                                        <GripVertical className="w-5 h-5 text-gray-600 cursor-move" />

                                        <div className="flex-1">
                                            <p className="font-semibold text-white">{item.label}</p>
                                            <p className="text-xs text-cyan-400">{item.url}</p>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => moveItem(index, 'up')}
                                                disabled={index === 0}
                                                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 disabled:opacity-30"
                                            >
                                                <MoveUp className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => moveItem(index, 'down')}
                                                disabled={index === currentItems.length - 1}
                                                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 disabled:opacity-30"
                                            >
                                                <MoveDown className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteItem(item.id)}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
