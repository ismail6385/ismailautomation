"use client";

import { useState } from 'react';
import { Search, UserPlus, Mail, Shield, Ban, Check } from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'user';
    status: 'active' | 'banned';
    joinedDate: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'Admin User',
            email: 'admin@ismailautomation.com',
            role: 'admin',
            status: 'active',
            joinedDate: '2025-01-01',
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'editor' | 'user'>('all');

    const handleRoleChange = (userId: string, newRole: 'admin' | 'editor' | 'user') => {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    };

    const handleStatusToggle = (userId: string) => {
        setUsers(users.map(u =>
            u.id === userId
                ? { ...u, status: u.status === 'active' ? 'banned' : 'active' }
                : u
        ));
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-500/20 text-red-400';
            case 'editor': return 'bg-purple-500/20 text-purple-400';
            default: return 'bg-blue-500/20 text-blue-400';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Users Management</h1>
                    <p className="text-gray-400">Manage user accounts and permissions</p>
                </div>
                <button className="mt-4 sm:mt-0 px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total Users</p>
                    <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Active Users</p>
                    <p className="text-2xl font-bold text-green-400">
                        {users.filter(u => u.status === 'active').length}
                    </p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Admins</p>
                    <p className="text-2xl font-bold text-red-400">
                        {users.filter(u => u.role === 'admin').length}
                    </p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Editors</p>
                    <p className="text-2xl font-bold text-purple-400">
                        {users.filter(u => u.role === 'editor').length}
                    </p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="glass-effect rounded-2xl p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search users..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value as any)}
                        className="px-4 py-3 rounded-lg glass-effect text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="user">User</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="glass-effect rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-4 text-gray-400 font-semibold">User</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Role</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Joined</th>
                                <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">{user.name}</p>
                                                <p className="text-gray-400 text-sm flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleBadgeColor(user.role)} bg-transparent border-0 focus:outline-none cursor-pointer`}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="editor">Editor</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'active'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400">{user.joinedDate}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleStatusToggle(user.id)}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${user.status === 'active'
                                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                }`}
                                        >
                                            {user.status === 'active' ? (
                                                <>
                                                    <Ban className="w-4 h-4 inline mr-1" />
                                                    Ban
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="w-4 h-4 inline mr-1" />
                                                    Activate
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredUsers.length === 0 && (
                <div className="glass-effect rounded-2xl p-12 text-center mt-6">
                    <p className="text-gray-400">No users found.</p>
                </div>
            )}
        </div>
    );
}
