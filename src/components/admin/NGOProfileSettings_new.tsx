import React, { useState, useEffect } from 'react';
import { 
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CloudArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface NGOProfile {
  name: string;
  description: string;
  mission: string;
  vision: string;
  founded: string;
  registrationNumber: string;
  website: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
  documents: {
    logo: string;
    certificate: string;
    panCard: string;
    trustDeed: string;
  };
}

interface NGOProfileSettingsProps {
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const NGOProfileSettings: React.FC<NGOProfileSettingsProps> = ({ showNotification }) => {
  const [profile, setProfile] = useState<NGOProfile>({
    name: 'Animal Welfare Foundation',
    description: 'Dedicated to rescuing, rehabilitating, and providing care for stray and injured animals in our community.',
    mission: 'To create a world where every animal is treated with compassion and respect, providing shelter, medical care, and rehabilitation services.',
    vision: 'To build a compassionate society that values and protects all forms of animal life.',
    founded: '2015',
    registrationNumber: 'NGO/2015/AWF/001',
    website: 'https://animalwelfare.org',
    email: 'contact@animalwelfare.org',
    phone: '+91-9876543210',
    address: {
      street: '123 Animal Care Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001'
    },
    socialMedia: {
      facebook: 'https://facebook.com/animalwelfare',
      twitter: 'https://twitter.com/animalwelfare',
      instagram: 'https://instagram.com/animalwelfare',
      youtube: 'https://youtube.com/animalwelfare'
    },
    bankDetails: {
      accountName: 'Animal Welfare Foundation',
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
      bankName: 'HDFC Bank',
      branch: 'Mumbai Central'
    },
    documents: {
      logo: '/images/logo.png',
      certificate: '/documents/registration-cert.pdf',
      panCard: '/documents/pan-card.pdf',
      trustDeed: '/documents/trust-deed.pdf'
    }
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('[data-mobile-menu]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const tabs = [
    { 
      id: 'basic', 
      name: 'Basic', 
      fullName: 'Basic Information', 
      icon: BuildingOfficeIcon, 
      color: 'blue',
      description: 'Organization details and mission'
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      fullName: 'Contact Details', 
      icon: PhoneIcon, 
      color: 'green',
      description: 'Address and communication details'
    },
    { 
      id: 'social', 
      name: 'Social', 
      fullName: 'Social Media', 
      icon: GlobeAltIcon, 
      color: 'purple',
      description: 'Social media presence'
    },
    { 
      id: 'banking', 
      name: 'Banking', 
      fullName: 'Banking Details', 
      icon: BanknotesIcon, 
      color: 'yellow',
      description: 'Financial information for donations'
    },
    { 
      id: 'documents', 
      name: 'Documents', 
      fullName: 'Documents', 
      icon: DocumentTextIcon, 
      color: 'red',
      description: 'Legal documents and certificates'
    }
  ];

  const updateProfile = (section: keyof NGOProfile, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...(prev[section] as any), [field]: value }
        : value
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showNotification?.('NGO profile updated successfully', 'success');
      setIsDirty(false);
    } catch (error) {
      showNotification?.('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (documentType: keyof NGOProfile['documents'], file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateProfile('documents', documentType, e.target?.result as string);
      showNotification?.(`${documentType} uploaded successfully`, 'success');
    };
    reader.readAsDataURL(file);
  };

  // Helper components for better organization
  const FormField: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    rows?: number;
    required?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }> = ({ label, value, onChange, type = 'text', placeholder, rows, required, icon: Icon }) => (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-semibold text-gray-700">
        {Icon && <Icon className="h-4 w-4 mr-2 text-gray-500" />}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
        />
      )}
    </div>
  );

  const SectionCard: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
  }> = ({ title, children, icon: Icon, description }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900">
              {Icon && <Icon className="h-5 w-5 mr-3 text-gray-600" />}
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  const StatsCard: React.FC<{ 
    title: string; 
    value: string; 
    icon: string; 
    color?: string;
    subtitle?: string;
  }> = ({ title, value, icon, color = 'blue', subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg font-bold text-gray-900 truncate">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="text-2xl ml-4 flex-shrink-0">{icon}</div>
      </div>
    </div>
  );

  const DocumentUploadCard: React.FC<{
    title: string;
    documentKey: keyof NGOProfile['documents'];
    currentValue: string;
    accept: string;
  }> = ({ title, documentKey, currentValue, accept }) => (
    <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          {currentValue && (
            <div className="flex items-center mt-2 text-sm text-green-600">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              Document uploaded
            </div>
          )}
        </div>
        <CloudArrowUpIcon className="h-6 w-6 text-gray-400" />
      </div>
      
      {currentValue && (
        <div className="mb-4">
          <a
            href={currentValue}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
          >
            View current document
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
      
      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(documentKey, file);
          }
        }}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold mb-2">NGO Profile Settings</h1>
                <p className="text-blue-100 text-lg">Manage your organization's profile and information</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="flex items-center text-sm">
                    <ShieldCheckIcon className="h-4 w-4 mr-2" />
                    Verified NGO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Founded"
            value={profile.founded}
            icon="🏛️"
            subtitle="Years of service"
          />
          <StatsCard
            title="Registration"
            value={profile.registrationNumber.split('/')[2]}
            icon="📋"
            subtitle="NGO Registration"
          />
          <StatsCard
            title="Location"
            value={profile.address.city}
            icon="📍"
            subtitle={profile.address.state}
          />
          <StatsCard
            title="Status"
            value="Active"
            icon="✅"
            subtitle="Verified Organization"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden border-b border-gray-200" data-mobile-menu>
            <div className="p-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  {tabs.find(tab => tab.id === activeTab)?.icon && 
                    React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, { 
                      className: "h-5 w-5 text-gray-600" 
                    })
                  }
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {tabs.find(tab => tab.id === activeTab)?.fullName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {tabs.find(tab => tab.id === activeTab)?.description}
                    </div>
                  </div>
                </div>
                {isMobileMenuOpen ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {isMobileMenuOpen && (
                <div className="absolute top-full left-4 right-4 z-20 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-4 p-4 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                        activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{tab.fullName}</div>
                        <div className="text-sm text-gray-500">{tab.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden lg:block border-b border-gray-200 bg-gray-50">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-6 px-6 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <tab.icon className="h-6 w-6" />
                    <div className="font-semibold">{tab.name}</div>
                    <div className="text-xs text-gray-500">{tab.description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8 min-h-[600px]">
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-8">
                <SectionCard 
                  title="Organization Details" 
                  icon={BuildingOfficeIcon}
                  description="Basic information about your organization"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FormField
                      label="Organization Name"
                      value={profile.name}
                      onChange={(value) => updateProfile('name', '', value)}
                      required
                      icon={BuildingOfficeIcon}
                    />
                    <FormField
                      label="Founded Year"
                      value={profile.founded}
                      onChange={(value) => updateProfile('founded', '', value)}
                      required
                      icon={CalendarIcon}
                    />
                  </div>
                  <FormField
                    label="Registration Number"
                    value={profile.registrationNumber}
                    onChange={(value) => updateProfile('registrationNumber', '', value)}
                    required
                  />
                </SectionCard>

                <SectionCard 
                  title="Mission & Vision" 
                  icon={UserGroupIcon}
                  description="Your organization's purpose and goals"
                >
                  <div className="space-y-6">
                    <FormField
                      label="Description"
                      value={profile.description}
                      onChange={(value) => updateProfile('description', '', value)}
                      rows={3}
                      placeholder="Brief description of your organization"
                    />
                    <FormField
                      label="Mission Statement"
                      value={profile.mission}
                      onChange={(value) => updateProfile('mission', '', value)}
                      rows={4}
                      placeholder="What is your organization's mission?"
                    />
                    <FormField
                      label="Vision Statement"
                      value={profile.vision}
                      onChange={(value) => updateProfile('vision', '', value)}
                      rows={4}
                      placeholder="What is your organization's vision for the future?"
                    />
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Contact Details Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-8">
                <SectionCard 
                  title="Contact Information" 
                  icon={PhoneIcon}
                  description="How people can reach your organization"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FormField
                      label="Email Address"
                      value={profile.email}
                      onChange={(value) => updateProfile('email', '', value)}
                      type="email"
                      required
                      icon={EnvelopeIcon}
                    />
                    <FormField
                      label="Phone Number"
                      value={profile.phone}
                      onChange={(value) => updateProfile('phone', '', value)}
                      type="tel"
                      required
                      icon={PhoneIcon}
                    />
                  </div>
                  <FormField
                    label="Website URL"
                    value={profile.website}
                    onChange={(value) => updateProfile('website', '', value)}
                    type="url"
                    icon={GlobeAltIcon}
                  />
                </SectionCard>

                <SectionCard 
                  title="Physical Address" 
                  icon={MapPinIcon}
                  description="Your organization's location"
                >
                  <div className="space-y-6">
                    <FormField
                      label="Street Address"
                      value={profile.address.street}
                      onChange={(value) => updateProfile('address', 'street', value)}
                      required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        label="City"
                        value={profile.address.city}
                        onChange={(value) => updateProfile('address', 'city', value)}
                        required
                      />
                      <FormField
                        label="State"
                        value={profile.address.state}
                        onChange={(value) => updateProfile('address', 'state', value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        label="PIN Code"
                        value={profile.address.pincode}
                        onChange={(value) => updateProfile('address', 'pincode', value)}
                        required
                      />
                      <FormField
                        label="Country"
                        value={profile.address.country}
                        onChange={(value) => updateProfile('address', 'country', value)}
                        required
                      />
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-8">
                <SectionCard 
                  title="Social Media Presence" 
                  icon={GlobeAltIcon}
                  description="Connect your social media accounts"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FormField
                      label="📘 Facebook URL"
                      value={profile.socialMedia.facebook}
                      onChange={(value) => updateProfile('socialMedia', 'facebook', value)}
                      type="url"
                      placeholder="https://facebook.com/yourpage"
                    />
                    <FormField
                      label="🐦 Twitter URL"
                      value={profile.socialMedia.twitter}
                      onChange={(value) => updateProfile('socialMedia', 'twitter', value)}
                      type="url"
                      placeholder="https://twitter.com/yourhandle"
                    />
                    <FormField
                      label="📷 Instagram URL"
                      value={profile.socialMedia.instagram}
                      onChange={(value) => updateProfile('socialMedia', 'instagram', value)}
                      type="url"
                      placeholder="https://instagram.com/yourprofile"
                    />
                    <FormField
                      label="📺 YouTube URL"
                      value={profile.socialMedia.youtube}
                      onChange={(value) => updateProfile('socialMedia', 'youtube', value)}
                      type="url"
                      placeholder="https://youtube.com/yourchannel"
                    />
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Banking Details Tab */}
            {activeTab === 'banking' && (
              <div className="space-y-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                        Sensitive Information
                      </h3>
                      <p className="text-yellow-700">
                        Banking details are encrypted and used only for donation processing. 
                        This information is never shared with third parties.
                      </p>
                    </div>
                  </div>
                </div>

                <SectionCard 
                  title="Bank Account Details" 
                  icon={BanknotesIcon}
                  description="For receiving donations and payments"
                >
                  <div className="space-y-6">
                    <FormField
                      label="Account Holder Name"
                      value={profile.bankDetails.accountName}
                      onChange={(value) => updateProfile('bankDetails', 'accountName', value)}
                      required
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <FormField
                        label="Account Number"
                        value={profile.bankDetails.accountNumber}
                        onChange={(value) => updateProfile('bankDetails', 'accountNumber', value)}
                        required
                      />
                      <FormField
                        label="IFSC Code"
                        value={profile.bankDetails.ifscCode}
                        onChange={(value) => updateProfile('bankDetails', 'ifscCode', value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <FormField
                        label="Bank Name"
                        value={profile.bankDetails.bankName}
                        onChange={(value) => updateProfile('bankDetails', 'bankName', value)}
                        required
                      />
                      <FormField
                        label="Branch Name"
                        value={profile.bankDetails.branch}
                        onChange={(value) => updateProfile('bankDetails', 'branch', value)}
                        required
                      />
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-8">
                <SectionCard 
                  title="Legal Documents" 
                  icon={DocumentTextIcon}
                  description="Upload your organization's legal documents"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DocumentUploadCard
                      title="Organization Logo"
                      documentKey="logo"
                      currentValue={profile.documents.logo}
                      accept="image/*"
                    />
                    <DocumentUploadCard
                      title="Registration Certificate"
                      documentKey="certificate"
                      currentValue={profile.documents.certificate}
                      accept=".pdf,.doc,.docx"
                    />
                    <DocumentUploadCard
                      title="PAN Card"
                      documentKey="panCard"
                      currentValue={profile.documents.panCard}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <DocumentUploadCard
                      title="Trust Deed"
                      documentKey="trustDeed"
                      currentValue={profile.documents.trustDeed}
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </SectionCard>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="px-6 lg:px-8 py-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-500">
                {isDirty && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                    You have unsaved changes
                  </div>
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={loading || !isDirty}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Saving Changes...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOProfileSettings;
