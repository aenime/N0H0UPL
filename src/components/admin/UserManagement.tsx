import React, { useState, useEffect } from 'react';

// Simple SVG icons as React components
const UserPlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012 2v6l-2-1.5L12 14l-2-1.5L8 14V8a2 2 0 012-2h4z" />
  </svg>
);

const PencilIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const UserGroupIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const KeyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Types and Interfaces
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
  permissions: Permission[];
  avatar?: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'donations' | 'media' | 'analytics' | 'settings';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
}

interface UserManagementProps {
  showNotification?: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface UserFormData {
  name: string;
  email: string;
  role: string;
  status: string;
  permissions: string[];
}

interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  targetUser: string;
  timestamp: string;
  details: string;
}

const UserManagement: React.FC<UserManagementProps> = ({ showNotification }) => {
  // State Management
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions' | 'audit'>('users');

  // Modal States
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Form States
  const [userForm, setUserForm] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'viewer',
    status: 'active',
    permissions: []
  });

  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  // Search and Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Initialize data
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockPermissions: Permission[] = [
        { id: 'content_create', name: 'Create Content', description: 'Create new blog posts and pages', category: 'content' },
        { id: 'content_edit', name: 'Edit Content', description: 'Edit existing content', category: 'content' },
        { id: 'content_delete', name: 'Delete Content', description: 'Delete content permanently', category: 'content' },
        { id: 'donations_view', name: 'View Donations', description: 'View donation records', category: 'donations' },
        { id: 'donations_manage', name: 'Manage Donations', description: 'Edit and manage donations', category: 'donations' },
        { id: 'media_upload', name: 'Upload Media', description: 'Upload new media files', category: 'media' },
        { id: 'media_manage', name: 'Manage Media', description: 'Organize and delete media', category: 'media' },
        { id: 'analytics_view', name: 'View Analytics', description: 'Access analytics dashboard', category: 'analytics' },
        { id: 'settings_manage', name: 'Manage Settings', description: 'Change system settings', category: 'settings' },
        { id: 'users_manage', name: 'Manage Users', description: 'Create and manage user accounts', category: 'settings' }
      ];

      const mockRoles: Role[] = [
        {
          id: 'admin',
          name: 'Administrator',
          description: 'Full system access',
          permissions: mockPermissions,
          isSystemRole: true
        },
        {
          id: 'editor',
          name: 'Editor',
          description: 'Content management access',
          permissions: mockPermissions.filter(p => p.category === 'content' || p.category === 'media'),
          isSystemRole: true
        },
        {
          id: 'viewer',
          name: 'Viewer',
          description: 'Read-only access',
          permissions: mockPermissions.filter(p => p.name.includes('View')),
          isSystemRole: true
        }
      ];

      const mockUsers: User[] = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@karunaforall.org',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-20T10:30:00Z',
          createdAt: '2024-01-01T00:00:00Z',
          permissions: mockPermissions
        },
        {
          id: '2',
          name: 'Content Editor',
          email: 'editor@karunaforall.org',
          role: 'editor',
          status: 'active',
          lastLogin: '2024-01-19T15:45:00Z',
          createdAt: '2024-01-05T00:00:00Z',
          permissions: mockPermissions.filter(p => p.category === 'content' || p.category === 'media')
        },
        {
          id: '3',
          name: 'Data Viewer',
          email: 'viewer@karunaforall.org',
          role: 'viewer',
          status: 'active',
          lastLogin: '2024-01-18T09:15:00Z',
          createdAt: '2024-01-10T00:00:00Z',
          permissions: mockPermissions.filter(p => p.name.includes('View'))
        }
      ];

      const mockAuditLogs: AuditLog[] = [
        {
          id: '1',
          action: 'User Created',
          performedBy: 'Admin User',
          targetUser: 'Content Editor',
          timestamp: '2024-01-20T10:30:00Z',
          details: 'Created new editor account'
        },
        {
          id: '2',
          action: 'Role Modified',
          performedBy: 'Admin User',
          targetUser: 'Data Viewer',
          timestamp: '2024-01-19T14:20:00Z',
          details: 'Changed role from editor to viewer'
        }
      ];

      setPermissions(mockPermissions);
      setRoles(mockRoles);
      setUsers(mockUsers);
      setAuditLogs(mockAuditLogs);
    } catch (error) {
      console.error('Error loading user data:', error);
      showNotification?.('Failed to load user data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle user form submission
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userPermissions = permissions.filter(p => userForm.permissions.includes(p.id));
      
      if (editingUser) {
        // Update existing user
        const updatedUser: User = {
          ...editingUser,
          name: userForm.name,
          email: userForm.email,
          role: userForm.role as User['role'],
          status: userForm.status as User['status'],
          permissions: userPermissions
        };
        
        setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
        showNotification?.('User updated successfully', 'success');
      } else {
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          name: userForm.name,
          email: userForm.email,
          role: userForm.role as User['role'],
          status: userForm.status as User['status'],
          createdAt: new Date().toISOString(),
          permissions: userPermissions
        };
        
        setUsers([...users, newUser]);
        showNotification?.('User created successfully', 'success');
      }
      
      resetUserForm();
      setShowUserModal(false);
    } catch (error) {
      console.error('Error saving user:', error);
      showNotification?.('Failed to save user', 'error');
    }
  };

  const resetUserForm = () => {
    setUserForm({
      name: '',
      email: '',
      role: 'viewer',
      status: 'active',
      permissions: []
    });
    setEditingUser(null);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: user.permissions.map(p => p.id)
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setUsers(users.filter(u => u.id !== userId));
        showNotification?.('User deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting user:', error);
        showNotification?.('Failed to delete user', 'error');
      }
    }
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      editor: 'bg-blue-100 text-blue-800',
      moderator: 'bg-purple-100 text-purple-800',
      viewer: 'bg-gray-100 text-gray-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">User Management</h3>
            <p className="text-sm text-gray-500">Manage users, roles, and permissions</p>
          </div>
          <button
            onClick={() => setShowUserModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            <UserPlusIcon className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: 'users', name: 'Users', icon: UserGroupIcon },
            { id: 'roles', name: 'Roles', icon: ShieldCheckIcon },
            { id: 'permissions', name: 'Permissions', icon: KeyIcon },
            { id: 'audit', name: 'Audit Log', icon: ClockIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
              <div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                              <span className="text-orange-600 font-medium text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-medium text-gray-900">{role.name}</h4>
                    {!role.isSystemRole && (
                      <button
                        onClick={() => setEditingRole(role)}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission) => (
                        <span
                          key={permission.id}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                        >
                          {permission.name}
                        </span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          +{role.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6">
            {Object.entries(
              permissions.reduce((acc, permission) => {
                if (!acc[permission.category]) {
                  acc[permission.category] = [];
                }
                acc[permission.category].push(permission);
                return acc;
              }, {} as Record<string, Permission[]>)
            ).map(([category, perms]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-lg font-medium text-gray-900 capitalize">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {perms.map((permission) => (
                    <div key={permission.id} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900">{permission.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.action}</p>
                      <p className="text-sm text-gray-600">
                        {log.performedBy} → {log.targetUser}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{log.details}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={userForm.status}
                  onChange={(e) => setUserForm({...userForm, status: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserModal(false);
                    resetUserForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                >
                  {editingUser ? 'Update' : 'Create'} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;