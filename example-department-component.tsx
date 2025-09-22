import React, { useState } from 'react';
import { useDepartments, CreateDepartmentRequest } from '@/hooks/use-departments';

// Example component showing how to use the department functionality
export function DepartmentManager() {
  const {
    departments,
    isLoading,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
    deleteError
  } = useDepartments();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<string | null>(null);

  // Form state for creating a new department
  const [newDepartment, setNewDepartment] = useState<CreateDepartmentRequest>({
    name: '',
    description: '',
    departmentCode: '',
    maxOfficers: 10,
    headOfDepartmentId: undefined
  });

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newDepartment.name || !newDepartment.departmentCode) {
      alert('Name and Department Code are required');
      return;
    }

    try {
      await createDepartment(newDepartment);
      setNewDepartment({
        name: '',
        description: '',
        departmentCode: '',
        maxOfficers: 10,
        headOfDepartmentId: undefined
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create department:', error);
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
      } catch (error) {
        console.error('Failed to delete department:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading departments...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Department Management</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showCreateForm ? 'Cancel' : 'Add Department'}
        </button>
      </div>

      {/* Create Department Form */}
      {showCreateForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Create New Department</h2>
          <form onSubmit={handleCreateDepartment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Department Code *</label>
              <input
                type="text"
                value={newDepartment.departmentCode}
                onChange={(e) => setNewDepartment({ ...newDepartment, departmentCode: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Max Officers</label>
              <input
                type="number"
                value={newDepartment.maxOfficers}
                onChange={(e) => setNewDepartment({ ...newDepartment, maxOfficers: parseInt(e.target.value) })}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Head of Department ID</label>
              <input
                type="text"
                value={newDepartment.headOfDepartmentId || ''}
                onChange={(e) => setNewDepartment({ ...newDepartment, headOfDepartmentId: e.target.value || undefined })}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isCreating}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isCreating ? 'Creating...' : 'Create Department'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
          
          {createError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              Error creating department: {createError.message}
            </div>
          )}
        </div>
      )}

      {/* Departments List */}
      <div className="space-y-4">
        {departments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No departments found. Create your first department above.
          </div>
        ) : (
          departments.map((department) => (
            <div key={department.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{department.name}</h3>
                  <p className="text-sm text-gray-600">Code: {department.departmentCode}</p>
                  {department.description && (
                    <p className="text-sm text-gray-700 mt-1">{department.description}</p>
                  )}
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Max Officers: {department.maxOfficers}</span>
                    <span>Current: {department.currentOfficerCount}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      department.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {department.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {department.headOfDepartment && (
                    <p className="text-sm text-gray-600 mt-1">
                      Head: {department.headOfDepartment.name} ({department.headOfDepartment.email})
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingDepartment(department.id)}
                    disabled={isUpdating}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    disabled={isDeleting}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Error Messages */}
      {updateError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error updating department: {updateError.message}
        </div>
      )}
      
      {deleteError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error deleting department: {deleteError.message}
        </div>
      )}
    </div>
  );
}

export default DepartmentManager;
