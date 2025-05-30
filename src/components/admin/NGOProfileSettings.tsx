import React, { useState, useRef, useEffect } from 'react';
import { 
  CloudArrowUpIcon as Upload, 
  CheckCircleIcon as Save, 
  ChevronDownIcon as ChevronDown, 
  ChevronUpIcon as ChevronUp, 
  DocumentTextIcon as FileText, 
  XMarkIcon as X 
} from '@heroicons/react/24/outline';

interface NGOProfileData {
  ngoName: string;
  description: string;
  mission: string;
  vision: string;
  registrationNumber: string;
  dateOfEstablishment: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  bankAccountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  panNumber: string;
  logo: File | null;
  documents: File[];
}

interface DocumentFile {
  id: string;
  name: string;
  file: File;
  type: string;
}

interface NGOProfileSettingsProps {
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const NGOProfileSettings: React.FC<NGOProfileSettingsProps> = ({ showNotification }) => {
  const [formData, setFormData] = useState<NGOProfileData>({
    ngoName: '',
    description: '',
    mission: '',
    vision: '',
    registrationNumber: '',
    dateOfEstablishment: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    bankAccountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    panNumber: '',
    logo: null,
    documents: []
  });

  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    contactInfo: false,
    bankingInfo: false,
    documents: false
  });

  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const logoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (field: keyof NGOProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Logo file size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setFormData(prev => ({ ...prev, logo: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      const newDocument: DocumentFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        file: file,
        type: file.type
      };

      setDocuments(prev => [...prev, newDocument]);
    });

    // Reset input
    if (documentInputRef.current) {
      documentInputRef.current.value = '';
    }
  };

  const removeDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      // Validate required fields
      const requiredFields = ['ngoName', 'description', 'registrationNumber', 'email', 'phone'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof NGOProfileData]);
      
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsSaving(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to save the data
      console.log('Saving NGO profile data:', formData);
      console.log('Documents:', documents);
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSectionIcon = (section: string, isExpanded: boolean) => {
    return isExpanded ? (
      <ChevronUp className="w-5 h-5 text-gray-500" />
    ) : (
      <ChevronDown className="w-5 h-5 text-gray-500" />
    );
  };

  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const textareaClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical";

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">NGO Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your organization's profile information and documents</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information Section */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('basicInfo')}
              className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-t-lg"
            >
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              {getSectionIcon('basicInfo', expandedSections.basicInfo)}
            </button>
            
            {expandedSections.basicInfo && (
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NGO Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ngoName}
                      onChange={(e) => handleInputChange('ngoName', e.target.value)}
                      className={inputClasses}
                      placeholder="Enter NGO name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      className={inputClasses}
                      placeholder="Enter registration number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={textareaClasses}
                    rows={4}
                    placeholder="Describe your NGO's purpose and activities"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
                    <textarea
                      value={formData.mission}
                      onChange={(e) => handleInputChange('mission', e.target.value)}
                      className={textareaClasses}
                      rows={3}
                      placeholder="Your organization's mission"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                    <textarea
                      value={formData.vision}
                      onChange={(e) => handleInputChange('vision', e.target.value)}
                      className={textareaClasses}
                      rows={3}
                      placeholder="Your organization's vision"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Establishment</label>
                    <input
                      type="date"
                      value={formData.dateOfEstablishment}
                      onChange={(e) => handleInputChange('dateOfEstablishment', e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className={inputClasses}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Logo</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    {logoPreview && (
                      <div className="flex-shrink-0">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleLogoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Logo
                      </button>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('contactInfo')}
              className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-t-lg"
            >
              <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              {getSectionIcon('contactInfo', expandedSections.contactInfo)}
            </button>
            
            {expandedSections.contactInfo && (
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={inputClasses}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={inputClasses}
                      placeholder="contact@ngo.org"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={textareaClasses}
                    rows={3}
                    placeholder="Complete address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={inputClasses}
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={inputClasses}
                      placeholder="State"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className={inputClasses}
                      placeholder="123456"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Banking Information Section */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('bankingInfo')}
              className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-t-lg"
            >
              <h2 className="text-lg font-semibold text-gray-900">Banking Information</h2>
              {getSectionIcon('bankingInfo', expandedSections.bankingInfo)}
            </button>
            
            {expandedSections.bankingInfo && (
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                    <input
                      type="text"
                      value={formData.accountHolderName}
                      onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                      className={inputClasses}
                      placeholder="Account holder name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number</label>
                    <input
                      type="text"
                      value={formData.bankAccountNumber}
                      onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                      className={inputClasses}
                      placeholder="Account number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                    <input
                      type="text"
                      value={formData.ifscCode}
                      onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                      className={inputClasses}
                      placeholder="IFSC code"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value)}
                      className={inputClasses}
                      placeholder="PAN number"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('documents')}
              className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-t-lg"
            >
              <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
              {getSectionIcon('documents', expandedSections.documents)}
            </button>
            
            {expandedSections.documents && (
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                    <input
                      type="file"
                      ref={documentInputRef}
                      onChange={handleDocumentUpload}
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      <button
                        type="button"
                        onClick={() => documentInputRef.current?.click()}
                        className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                      >
                        Click to upload
                      </button>
                      {' '}or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, DOCX, JPG, PNG up to 10MB each
                    </p>
                  </div>
                </div>

                {/* Uploaded Documents List */}
                {documents.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Uploaded Documents</h3>
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center space-x-3 flex-grow min-w-0">
                            <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            <div className="min-w-0 flex-grow">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {doc.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(doc.file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeDocument(doc.id)}
                            className="ml-3 p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition duration-150 ease-in-out flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
            {saveStatus !== 'idle' && (
              <div className={`text-sm font-medium ${
                saveStatus === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {saveStatus === 'success' ? 'Profile saved successfully!' : 'Error saving profile. Please try again.'}
              </div>
            )}
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                isSaving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOProfileSettings;