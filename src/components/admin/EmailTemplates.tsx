import React, { useState } from 'react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'donation_thank_you' | 'monthly_newsletter' | 'event_invitation' | 'volunteer_welcome' | 'custom';
  active: boolean;
  lastModified: string;
}

interface EmailTemplatesProps {
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const EmailTemplates: React.FC<EmailTemplatesProps> = ({ showNotification }) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Donation Thank You',
      subject: 'Thank you for your generous donation to {{ngo_name}}',
      content: `Dear {{donor_name}},

Thank you for your generous donation of ₹{{amount}} to {{ngo_name}}. Your support helps us continue our mission of caring for animals in need.

Your donation will be used for: {{purpose}}

Transaction ID: {{transaction_id}}
Date: {{date}}

We are grateful for your kindness and support.

Best regards,
{{ngo_name}} Team`,
      type: 'donation_thank_you',
      active: true,
      lastModified: '2025-01-20'
    },
    {
      id: '2',
      name: 'Monthly Newsletter',
      subject: '{{ngo_name}} Monthly Update - {{month}} {{year}}',
      content: `Dear {{donor_name}},

Here's what we've accomplished this month with your support:

🐕 Animals rescued: {{animals_rescued}}
🏥 Medical treatments provided: {{treatments}}
🏠 Animals adopted: {{adoptions}}

Recent Success Stories:
{{success_stories}}

Upcoming Events:
{{upcoming_events}}

Thank you for being part of our mission!

Best regards,
{{ngo_name}} Team`,
      type: 'monthly_newsletter',
      active: true,
      lastModified: '2025-01-15'
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'custom' as EmailTemplate['type']
  });

  const templateTypes = [
    { value: 'donation_thank_you', label: 'Donation Thank You' },
    { value: 'monthly_newsletter', label: 'Monthly Newsletter' },
    { value: 'event_invitation', label: 'Event Invitation' },
    { value: 'volunteer_welcome', label: 'Volunteer Welcome' },
    { value: 'custom', label: 'Custom Template' }
  ];

  const handleCreateTemplate = () => {
    setEditForm({ name: '', subject: '', content: '', type: 'custom' });
    setSelectedTemplate(null);
    setIsEditing(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditForm({
      name: template.name,
      subject: template.subject,
      content: template.content,
      type: template.type
    });
    setSelectedTemplate(template);
    setIsEditing(true);
  };

  const handleSaveTemplate = () => {
    if (!editForm.name || !editForm.subject || !editForm.content) {
      showNotification?.('Please fill all required fields', 'error');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    if (selectedTemplate) {
      // Update existing template
      setTemplates(prev =>
        prev.map(template =>
          template.id === selectedTemplate.id
            ? {
                ...template,
                name: editForm.name,
                subject: editForm.subject,
                content: editForm.content,
                type: editForm.type,
                lastModified: today
              }
            : template
        )
      );
      showNotification?.('Template updated successfully', 'success');
    } else {
      // Create new template
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        name: editForm.name,
        subject: editForm.subject,
        content: editForm.content,
        type: editForm.type,
        active: true,
        lastModified: today
      };
      setTemplates(prev => [...prev, newTemplate]);
      showNotification?.('Template created successfully', 'success');
    }

    setIsEditing(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(prev => prev.filter(template => template.id !== id));
      showNotification?.('Template deleted successfully', 'success');
    }
  };

  const toggleTemplateStatus = (id: string) => {
    setTemplates(prev =>
      prev.map(template =>
        template.id === id ? { ...template, active: !template.active } : template
      )
    );
    showNotification?.('Template status updated', 'success');
  };

  const availableVariables = [
    '{{donor_name}}', '{{ngo_name}}', '{{amount}}', '{{purpose}}', 
    '{{transaction_id}}', '{{date}}', '{{month}}', '{{year}}',
    '{{animals_rescued}}', '{{treatments}}', '{{adoptions}}',
    '{{success_stories}}', '{{upcoming_events}}'
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Templates</h2>
        <p className="text-gray-600">Create and manage email templates for automated communications.</p>
      </div>

      {!isEditing ? (
        <>
          {/* Header with Create Button */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Templates</h3>
            <button
              onClick={handleCreateTemplate}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Create New Template
            </button>
          </div>

          {/* Templates List */}
          <div className="grid gap-4">
            {templates.map((template) => (
              <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-500">
                      Type: {templateTypes.find(t => t.value === template.type)?.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last modified: {template.lastModified}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      template.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {template.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Subject:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{template.subject}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Content Preview:</p>
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
                    {template.content.substring(0, 200)}...
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTemplate(template)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleTemplateStatus(template.id)}
                    className={`text-sm font-medium ${
                      template.active
                        ? 'text-red-600 hover:text-red-900'
                        : 'text-green-600 hover:text-green-900'
                    }`}
                  >
                    {template.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Template Editor */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedTemplate ? 'Edit Template' : 'Create New Template'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter template name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Type
                  </label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value as EmailTemplate['type'] }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {templateTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject *
                  </label>
                  <input
                    type="text"
                    value={editForm.subject}
                    onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter email subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Content *
                  </label>
                  <textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={12}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter email content"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleSaveTemplate}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {selectedTemplate ? 'Update Template' : 'Create Template'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Available Variables</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Click on any variable to copy it to your clipboard:
                  </p>
                  <div className="space-y-1">
                    {availableVariables.map((variable) => (
                      <button
                        key={variable}
                        onClick={() => {
                          if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(variable)
                              .then(() => {
                                showNotification?.(`Copied ${variable} to clipboard`, 'success');
                              })
                              .catch(() => {
                                showNotification?.('Copy to clipboard failed - browser may not support this feature', 'error');
                              });
                          } else {
                            showNotification?.('Copy to clipboard not supported in this browser', 'error');
                          }
                        }}
                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded"
                      >
                        {variable}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailTemplates;
